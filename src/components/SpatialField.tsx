import { useEffect, useRef } from "react";

/**
 * A spatial point field: a small three-dimensional graph of nodes and edges,
 * projected to the canvas with a perspective camera.
 *
 * Why this instead of a WebGL scene: the hero needs depth and movement, not a
 * modelling engine. A dependency-free projection keeps the initial bundle
 * small, degrades to a single static frame, and can be paused when off-screen
 * or hidden. It is decorative, so it is hidden from assistive technology and
 * the hero copy works with or without it.
 */

interface Node3 {
  x: number;
  y: number;
  z: number;
  accent: boolean;
  weight: number;
}

/** Deterministic PRNG so the field is identical on every load. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function readToken(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function hexToRgb(hex: string, fallback: [number, number, number]): [number, number, number] {
  const match = /^#?([\da-f]{6})$/i.exec(hex.trim());
  if (!match) return fallback;
  const value = parseInt(match[1], 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export default function SpatialField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const paper = hexToRgb(readToken("--color-paper", "#eceeeb"), [236, 238, 235]);
    const accent = hexToRgb(readToken("--color-accent", "#6fe0be"), [111, 224, 190]);

    const rand = mulberry32(0x5a3f17);
    const mobile = window.matchMedia?.("(max-width: 767px)").matches ?? false;
    const count = mobile ? 34 : 82;

    // Build the field. Roughly two thirds of the nodes sit on a coarse lattice
    // so the cloud reads as a measured coordinate space rather than noise.
    const nodes: Node3[] = [];
    for (let i = 0; i < count; i += 1) {
      const onLattice = rand() > 0.34;
      const step = 0.42;
      const snap = (value: number) => (onLattice ? Math.round(value / step) * step : value);
      nodes.push({
        x: snap((rand() * 2 - 1) * 1.15),
        y: snap((rand() * 2 - 1) * 1.05),
        z: snap((rand() * 2 - 1) * 1.15),
        accent: false,
        weight: 0.4 + rand() * 0.6,
      });
    }

    // Three accent nodes: the ones closest to the camera plane, so they read as
    // the current selection rather than random highlights.
    [...nodes]
      .sort((a, b) => b.z - a.z)
      .slice(0, 3)
      .forEach((node) => {
        node.accent = true;
      });

    // Connect each node to its two nearest neighbours.
    const edges: Array<[number, number]> = [];
    const seen = new Set<string>();
    nodes.forEach((node, i) => {
      const distances = nodes
        .map((other, j) => ({ j, d: (other.x - node.x) ** 2 + (other.y - node.y) ** 2 + (other.z - node.z) ** 2 }))
        .filter((entry) => entry.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      for (const { j, d } of distances) {
        if (d > 0.42) continue;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push([i, j]);
      }
    });

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    let rotation = 0.6;
    let visible = true;
    let running = true;
    let frame = 0;
    let last = 0;

    const project = (node: Node3) => {
      const cosY = Math.cos(rotation);
      const sinY = Math.sin(rotation);
      const rx = node.x * cosY - node.z * sinY;
      const rz = node.x * sinY + node.z * cosY;

      const pitch = -0.22 + tilt.y;
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      const ry = node.y * cosX - rz * sinX;
      const rz2 = node.y * sinX + rz * cosX;

      const distance = 3.4;
      const scale = 1 / Math.max(0.35, distance + rz2);
      return {
        x: width / 2 + (rx + tilt.x) * scale * Math.min(width, height) * 0.78,
        y: height / 2 + ry * scale * Math.min(width, height) * 0.78,
        depth: scale,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const projected = nodes.map(project);

      const nearest = projected.reduce((min, p) => Math.min(min, p.depth), Infinity);
      const farthest = projected.reduce((max, p) => Math.max(max, p.depth), 0);
      const span = Math.max(0.0001, farthest - nearest);

      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const from = projected[a];
        const to = projected[b];
        const depth = 1 - ((from.depth + to.depth) / 2 - nearest) / span;
        ctx.strokeStyle = `rgba(${paper[0]}, ${paper[1]}, ${paper[2]}, ${(0.03 + depth * 0.1).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      nodes.forEach((node, i) => {
        const point = projected[i];
        const depth = 1 - (point.depth - nearest) / span;
        const radius = (node.accent ? 2.1 : 0.9) + depth * 1.7 * node.weight;

        if (node.accent) {
          ctx.strokeStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${(0.25 + depth * 0.5).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius + 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${(0.6 + depth * 0.4).toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(${paper[0]}, ${paper[1]}, ${paper[2]}, ${(0.1 + depth * 0.45).toFixed(3)})`;
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = (time: number) => {
      if (!running) return;
      const delta = last ? Math.min(48, time - last) : 16;
      last = time;

      pointer.x ||= 0;
      tilt.x += (pointer.x - tilt.x) * 0.045;
      tilt.y += (pointer.y - tilt.y) * 0.045;

      if (!reduced) rotation += delta * 0.00006;

      draw();
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.5;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.32;
    };

    resize();

    if (reduced) {
      draw();
    } else {
      frame = window.requestAnimationFrame(tick);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        running = visible && !document.hidden && !reduced;
        if (running && !frame) {
          last = 0;
          frame = window.requestAnimationFrame(tick);
        }
        if (!running && frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0 },
    );
    intersection.observe(canvas);

    const onVisibility = () => {
      running = visible && !document.hidden && !reduced;
      if (running && !frame) {
        last = 0;
        frame = window.requestAnimationFrame(tick);
      }
      if (!running && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
      intersection.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
