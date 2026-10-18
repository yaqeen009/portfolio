/**
 * Technical figures.
 *
 * These are diagrams drawn for the site, not screenshots of the applications.
 * Where a project has no publishable imagery, a diagram of how it works is
 * more honest than a stock photo or a mocked-up UI, and it is captioned as
 * such so nothing is misrepresented as a running product.
 *
 * Each figure has a viewBox of 360×240 and draws with `currentColor`, so it
 * inherits the surrounding text colour and repaints correctly on hover.
 */

import type { ReactElement } from "react";

interface FigureProps {
  id: string;
  className?: string;
}

const box = "fill-none stroke-current";
const accent = "stroke-[var(--color-accent)]";
const faint = "stroke-current opacity-40";
const label = "fill-current font-mono text-[9px] tracking-[0.08em]";

function Bondit() {
  const steps = [
    { x: 12, text: "RISK" },
    { x: 100, text: "RATE" },
    { x: 188, text: "REFER" },
    { x: 276, text: "POLICY" },
  ];
  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" role="img" aria-label="Diagram: a quote moves through risk capture, rating, underwriting referral and policy issuance, with referral able to return to rating.">
      <g strokeWidth="1">
        {steps.map((step, i) => (
          <g key={step.text}>
            <rect x={step.x} y={96} width="72" height="40" className={box} />
            <text x={step.x + 12} y={120} className={label}>
              {step.text}
            </text>
            {i < steps.length - 1 && (
              <path d={`M${step.x + 72} 116 H${step.x + 88}`} className={faint} markerEnd="url(#arrow)" />
            )}
          </g>
        ))}
        <path d="M224 136 V178 H136 V140" className={accent} strokeDasharray="4 4" />
        <text x="150" y="196" className={`${label} opacity-70`}>
          REFERRAL REVISION
        </text>
        <path d="M12 96 V64 H312 V96" className={faint} strokeDasharray="3 6" />
        <text x="12" y="56" className={`${label} opacity-70`}>
          SHARED QUOTE STATE
        </text>
      </g>
      <defs>
        <marker id="arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="currentColor" />
        </marker>
      </defs>
    </svg>
  );
}

function VrCampus() {
  // Simple axonometric blocks: two department volumes linked by a path.
  const iso = (x: number, y: number) => [180 + (x - y) * 0.86, 150 + (x + y) * 0.5] as const;
  const prism = (x: number, y: number, w: number, d: number, h: number) => {
    const [ax, ay] = iso(x, y);
    const [bx, by] = iso(x + w, y);
    const [cx, cy] = iso(x + w, y + d);
    const [dx, dy] = iso(x, y + d);
    const top = `${ax},${ay - h} ${bx},${by - h} ${cx},${cy - h} ${dx},${dy - h}`;
    const left = `${dx},${dy - h} ${cx},${cy - h} ${cx},${cy} ${dx},${dy}`;
    const right = `${cx},${cy - h} ${bx},${by - h} ${bx},${by} ${cx},${cy}`;
    return { top, left, right };
  };

  const physics = prism(-30, -60, 74, 52, 34);
  const chemistry = prism(26, 4, 62, 46, 26);

  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" role="img" aria-label="Diagram: two building volumes, the Physics and Chemistry departments, modelled in Blender and linked by a walkable path inside a Unity scene.">
      <g strokeWidth="1" className={box}>
        <polygon points={physics.top} />
        <polygon points={physics.left} className="opacity-60" />
        <polygon points={chemistry.top} />
        <polygon points={chemistry.right} className="opacity-60" />
        <path d="M150 190 C190 200 214 186 236 176" className={accent} strokeDasharray="5 4" />
        <circle cx="236" cy="176" r="3.5" className={`${accent} fill-none`} />
        <circle cx="150" cy="190" r="3.5" className={`${accent} fill-none`} />
        <text x="14" y="224" className={label}>
          BLENDER → UNITY → HEADSET
        </text>
        <path d="M12 20 H96 M12 20 V44" className={faint} />
        <text x="104" y="24" className={`${label} opacity-70`}>
          SCALE 1:200
        </text>
      </g>
    </svg>
  );
}

function JsonBuddy() {
  const nodes = [
    { x: 180, y: 40, w: 46 },
    { x: 104, y: 108, w: 52 },
    { x: 256, y: 108, w: 52 },
    { x: 60, y: 176, w: 56 },
    { x: 148, y: 176, w: 56 },
    { x: 236, y: 176, w: 56 },
  ];
  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" role="img" aria-label="Diagram: a parsed JSON document displayed as a collapsible node tree, with invalid branches rejected before rendering.">
      <g strokeWidth="1">
        <path d="M180 60 V84 M180 84 H130 V108 M180 84 H282 V108" className={faint} />
        <path d="M130 144 V160 H88 V176 M130 160 H176 V176" className={faint} />
        <path d="M282 144 V160 H264 V176" className={faint} />
        <path d="M282 144 V160 H300 V176" className={faint} strokeDasharray="4 4" />
        {nodes.map((node, i) => (
          <rect
            key={i}
            x={node.x}
            y={node.y}
            width={node.w}
            height="26"
            className={box}
            strokeDasharray={i === 5 ? "4 4" : undefined}
          />
        ))}
        <line x1="180" y1="66" x2="180" y2="66" className={accent} />
        <text x="60" y="206" className={label}>
          VALID
        </text>
        <text x="236" y="206" className={`${label} opacity-50`}>
          REJECTED
        </text>
      </g>
    </svg>
  );
}

function AgriLink() {
  const cols = 6;
  const rows = 4;
  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" role="img" aria-label="Diagram: a field divided into survey plots, with records attached to individual plots and stored in a Supabase table.">
      <g strokeWidth="1" className="fill-current">
        <rect x="40" y="46" width="240" height="152" className={box} />
        {Array.from({ length: cols - 1 }).map((_, i) => (
          <line key={`c${i}`} x1={40 + ((i + 1) * 240) / cols} y1="46" x2={40 + ((i + 1) * 240) / cols} y2="198" className={faint} />
        ))}
        {Array.from({ length: rows - 1 }).map((_, i) => (
          <line key={`r${i}`} x1="40" y1={46 + ((i + 1) * 152) / rows} x2="280" y2={46 + ((i + 1) * 152) / rows} className={faint} />
        ))}
        <rect x={40 + 240 / cols} y={46} width={240 / cols} height={152 / rows} className="opacity-20" />
        <rect x={40 + (240 / cols) * 3} y={46 + 152 / rows} width={240 / cols} height={152 / rows} className="opacity-20" />
        <circle cx={40 + (240 / cols) * 4.5} cy={46 + 152 / rows * 3.5} r="4" className={`${accent} fill-none`} />
        <path d="M300 120 H320" className={faint} />
        <rect x="320" y="86" width="28" height="68" className={box} />
        <text x="326" y="112" className={label} transform="rotate(90 326 112)">
          SUPABASE
        </text>
        <text x="40" y="224" className={label}>
          PLOT-LEVEL RECORDS
        </text>
      </g>
    </svg>
  );
}

function MiniLang() {
  const stages = ["SOURCE", "TOKENS", "AST", "IR", "LLVM"];
  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" role="img" aria-label="Diagram: source text passes through lexing, parsing and a typed intermediate representation before LLVM emits machine code.">
      <g strokeWidth="1">
        {stages.map((stage, i) => (
          <g key={stage}>
            <rect x={14 + i * 68} y="104" width="54" height="34" className={i === 4 ? accent : box} />
            <text x={20 + i * 68} y="124" className={label}>
              {stage}
            </text>
            {i < stages.length - 1 && <path d={`M${68 + i * 68} 121 H${82 + i * 68}`} className={faint} />}
          </g>
        ))}
        <path d="M14 104 V72 H328 V104" className={faint} strokeDasharray="3 6" />
        <text x="14" y="62" className={label}>
          TYPED HANDOFF
        </text>
        <path d="M41 138 V176 M109 138 V176 M245 138 V176" className={faint} strokeDasharray="3 5" />
        <text x="14" y="196" className={label}>
          ERRORS REPORTED WITH POSITION
        </text>
      </g>
    </svg>
  );
}

export default function ProjectFigure({ id, className = "" }: FigureProps) {
  const figures: Record<string, () => ReactElement> = {
    bondit: Bondit,
    "vr-campus": VrCampus,
    "json-buddy": JsonBuddy,
    agrilink: AgriLink,
    minilang: MiniLang,
  };

  const Figure = figures[id];
  if (!Figure) return null;

  return (
    <div className={`text-text-muted ${className}`}>
      <Figure />
    </div>
  );
}
