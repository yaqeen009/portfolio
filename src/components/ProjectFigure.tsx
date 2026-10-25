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
    <svg
      viewBox="0 0 360 240"
      className="h-full w-full"
      role="img"
      aria-label="Diagram: a quote moves through risk capture, rating, underwriting referral and policy issuance, with referral able to return to rating."
    >
      <g strokeWidth="1">
        {steps.map((step, i) => (
          <g key={step.text}>
            <rect x={step.x} y={96} width="72" height="40" className={box} />
            <text x={step.x + 12} y={120} className={label}>
              {step.text}
            </text>
            {i < steps.length - 1 && (
              <path
                d={`M${step.x + 72} 116 H${step.x + 88}`}
                className={faint}
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        ))}
        <path
          d="M224 136 V178 H136 V140"
          className={accent}
          strokeDasharray="4 4"
        />
        <text x="150" y="196" className={`${label} opacity-70`}>
          REFERRAL REVISION
        </text>
        <path d="M12 96 V64 H312 V96" className={faint} strokeDasharray="3 6" />
        <text x="12" y="56" className={`${label} opacity-70`}>
          SHARED QUOTE STATE
        </text>
      </g>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 z" fill="currentColor" />
        </marker>
      </defs>
    </svg>
  );
}

function VrCampus() {
  // Simple axonometric blocks: two department volumes linked by a path.
  const iso = (x: number, y: number) =>
    [180 + (x - y) * 0.86, 150 + (x + y) * 0.5] as const;
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
    <svg
      viewBox="0 0 360 240"
      className="h-full w-full"
      role="img"
      aria-label="Diagram: two building volumes, the Physics and Chemistry departments, modelled in Blender and linked by a walkable path inside a Unity scene."
    >
      <g strokeWidth="1" className={box}>
        <polygon points={physics.top} />
        <polygon points={physics.left} className="opacity-60" />
        <polygon points={chemistry.top} />
        <polygon points={chemistry.right} className="opacity-60" />
        <path
          d="M150 190 C190 200 214 186 236 176"
          className={accent}
          strokeDasharray="5 4"
        />
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
  const properties = [
    { key: '"name"', value: '"JsonBuddy"', y: 94 },
    { key: '"version"', value: '"1.0.0"', y: 126 },
    { key: '"features"', value: "[ ... ]", y: 158 },
  ];

  return (
    <svg
      viewBox="0 0 360 240"
      className="h-full w-full"
      role="img"
      aria-label="JSON Buddy illustration showing formatted JSON, nested properties, and successful validation."
    >
      <g strokeWidth="1">
        {/* Editor window */}
        <rect
          x="24"
          y="24"
          width="312"
          height="192"
          rx="7"
          className={box}
        />

        {/* Window controls */}
        <circle cx="40" cy="39" r="3" className={faint} />
        <circle cx="51" cy="39" r="3" className={faint} />
        <circle cx="62" cy="39" r="3" className={faint} />

        <text x="82" y="43" className={label}>
          DATA.JSON
        </text>

        {/* Divider */}
        <path d="M24 54 H336" className={faint} />

        {/* JSON tree indentation */}
        <path
          d="M48 72 V174 M62 104 V174"
          className={faint}
          strokeDasharray="3 4"
        />

        {/* Opening brace */}
        <text x="38" y="76" className={label}>
          {"{"}
        </text>

        {/* JSON properties */}
        {properties.map((property) => (
          <g key={property.key}>
            <text x="62" y={property.y} className={label}>
              {property.key}
            </text>
            <text x="158" y={property.y} className={label}>
              :
            </text>
            <text x="172" y={property.y} className={label}>
              {property.value}
            </text>
          </g>
        ))}

        {/* Closing brace */}
        <text x="38" y="190" className={label}>
          {"}"}
        </text>

        {/* Validation status */}
        <rect
          x="224"
          y="174"
          width="98"
          height="25"
          rx="4"
          className={accent}
        />
        <path
          d="M235 186 L239 190 L246 182"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
        />
        <text x="252" y="190" className={label}>
          VALID JSON
        </text>
      </g>
    </svg>
  );
}



function SpendScope() {
  const categories = [
    { name: "Housing", width: 120 },
    { name: "Food", width: 82 },
    { name: "Transport", width: 58 },
    { name: "Other", width: 38 },
  ];

  const bars = [42, 68, 50, 88, 62, 104, 78];

  return (
    <svg
      viewBox="0 0 360 240"
      className="h-full w-full"
      role="img"
      aria-label="Financial analytics illustration showing spending categories, a weekly spending chart, and summarized financial insights."
    >
      <g strokeWidth="1">
        {/* Main dashboard panel */}
        <rect
          x="20"
          y="24"
          width="320"
          height="192"
          rx="7"
          className={box}
        />

        {/* Spending summary */}
        <text x="36" y="46" className={label}>
          SPENDING OVERVIEW
        </text>

        <rect
          x="36"
          y="58"
          width="132"
          height="44"
          rx="4"
          className={box}
        />
        <text x="46" y="74" className={label}>
          TOTAL SPENDING
        </text>
        <path
          d="M46 88 H104"
          className={accent}
          strokeWidth="3"
          strokeLinecap="round"
        />

        <rect
          x="178"
          y="58"
          width="146"
          height="44"
          rx="4"
          className={box}
        />
        <text x="188" y="74" className={label}>
          CASH FLOW
        </text>
        <path
          d="M188 89 L201 83 L214 87 L227 77 L240 81 L253 72 L268 76"
          className={accent}
          fill="none"
          strokeWidth="1.5"
        />

        {/* Category breakdown */}
        <text x="36" y="122" className={label}>
          CATEGORIES
        </text>

        {categories.map((category, i) => (
          <g key={category.name}>
            <text
              x="36"
              y={140 + i * 17}
              className={label}
            >
              {category.name}
            </text>
            <rect
              x="112"
              y={132 + i * 17}
              width="76"
              height="5"
              rx="2"
              className={faint}
            />
            <rect
              x="112"
              y={132 + i * 17}
              width={Math.min(category.width / 2, 76)}
              height="5"
              rx="2"
              className={accent}
            />
          </g>
        ))}

        {/* Weekly spending bars */}
        <text x="210" y="122" className={label}>
          WEEKLY TREND
        </text>

        <path
          d="M210 190 H324 M210 145 V190"
          className={faint}
          fill="none"
        />

        {bars.map((height, i) => (
          <rect
            key={i}
            x={218 + i * 15}
            y={190 - height * 0.42}
            width="8"
            height={height * 0.42}
            rx="2"
            className={i === 5 ? accent : box}
          />
        ))}

        {/* Bottom insight indicator */}
        <circle cx="42" cy="202" r="3" className={accent} />
        <text x="52" y="206" className={label}>
          FINANCIAL INSIGHTS
        </text>
      </g>
    </svg>
  );
}


function DataSpace() {
  const stages = ["IMPORT", "PROCESS", "EXPLORE", "INSIGHT"];

  return (
    <svg
      viewBox="0 0 360 240"
      className="h-full w-full"
      role="img"
      aria-label="Data exploration workflow: import a dataset, process it, explore linked visualizations, and discover insights."
    >
      <g strokeWidth="1">
        {/* Workflow stages */}
        {stages.map((stage, i) => {
          const x = 10 + i * 88;

          return (
            <g key={stage}>
              <rect
                x={x}
                y="100"
                width="72"
                height="38"
                rx="5"
                className={i === 3 ? accent : box}
              />
              <text x={x + 36} y="123" textAnchor="middle" className={label}>
                {stage}
              </text>

              {i < stages.length - 1 && (
                <path d={`M${x + 72} 119 H${x + 84}`} className={faint} />
              )}
            </g>
          );
        })}

        {/* Shared visualization layer */}
        <path
          d="M98 100 V68 H274 V100"
          className={faint}
          strokeDasharray="3 5"
          fill="none"
        />

        <text x="98" y="56" className={label}>
          SHARED DATA MODEL
        </text>

        {/* Connected visualization types */}
        <path
          d="M186 138 V164 M66 164 H300 M66 164 V181 M186 164 V181 M300 164 V181"
          className={faint}
          fill="none"
        />

        <rect x="30" y="181" width="72" height="28" rx="4" className={box} />
        <rect x="150" y="181" width="72" height="28" rx="4" className={box} />
        <rect x="264" y="181" width="72" height="28" rx="4" className={box} />

        <text x="66" y="199" textAnchor="middle" className={label}>
          3D VIEWS
        </text>
        <text x="186" y="199" textAnchor="middle" className={label}>
          2D CHARTS
        </text>
        <text x="300" y="199" textAnchor="middle" className={label}>
          PATTERNS
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
    "spend-scope": SpendScope,
    "data-space": DataSpace,
  };

  const Figure = figures[id];
  if (!Figure) return null;

  return (
    <div className={`text-text-muted ${className}`}>
      <Figure />
    </div>
  );
}
