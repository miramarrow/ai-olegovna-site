import type { AbstractMarkKey } from "@/components/AbstractServiceMark";
import { cn } from "@/lib/utils";

interface ServiceAbstractVisualProps {
  mark: AbstractMarkKey;
  className?: string;
}

const gridLines = {
  x: [28, 56, 84, 112, 140, 168, 196, 224, 252, 280, 308, 336],
  y: [24, 48, 72, 96, 120, 144, 168, 192],
};

const visualPaths: Record<AbstractMarkKey, string[]> = {
  axis: [
    "M66 154 L190 68 L286 132",
    "M92 76 L126 150 L236 94 L302 168",
    "M58 176 H144",
  ],
  fold: [
    "M72 58 H206 L164 116 H298",
    "M88 172 H292",
    "M126 58 V174",
    "M206 58 L264 116",
  ],
  mesh: [
    "M64 86 C116 34 228 34 294 90",
    "M66 146 C126 196 232 196 296 140",
    "M104 56 C130 112 130 142 108 176",
    "M252 54 C228 106 226 146 254 180",
  ],
  ripple: [
    "M60 132 C108 72 198 52 300 86",
    "M70 170 C132 118 216 106 314 140",
    "M96 62 L218 176",
    "M164 76 C190 96 220 102 266 100",
  ],
  stack: [
    "M64 68 H246",
    "M88 104 H304",
    "M62 140 H246",
    "M104 176 H306",
    "M178 48 V184",
  ],
  trace: [
    "M70 172 L126 62 L184 172 L244 62 L302 172",
    "M58 118 H312",
    "M126 62 C154 102 162 132 184 172",
  ],
  window: [
    "M70 62 H222 V166 H70 Z",
    "M130 42 H294 V146",
    "M70 118 H222",
    "M130 88 H294",
  ],
  zero: [
    "M92 134 C104 62 166 40 246 60",
    "M268 92 C258 166 194 190 106 164",
    "M116 72 L266 168",
    "M88 172 C132 192 224 190 278 136",
  ],
};

const visualDots: Record<AbstractMarkKey, Array<{ cx: number; cy: number; r: number }>> = {
  axis: [
    { cx: 190, cy: 68, r: 5 },
    { cx: 286, cy: 132, r: 3 },
  ],
  fold: [
    { cx: 164, cy: 116, r: 4 },
    { cx: 298, cy: 116, r: 3 },
  ],
  mesh: [
    { cx: 64, cy: 86, r: 3 },
    { cx: 294, cy: 90, r: 3 },
    { cx: 180, cy: 166, r: 4 },
  ],
  ripple: [
    { cx: 96, cy: 62, r: 4 },
    { cx: 300, cy: 86, r: 3 },
  ],
  stack: [
    { cx: 246, cy: 68, r: 3 },
    { cx: 304, cy: 104, r: 4 },
    { cx: 306, cy: 176, r: 3 },
  ],
  trace: [
    { cx: 126, cy: 62, r: 4 },
    { cx: 184, cy: 172, r: 4 },
    { cx: 244, cy: 62, r: 4 },
  ],
  window: [
    { cx: 222, cy: 166, r: 4 },
    { cx: 294, cy: 146, r: 3 },
  ],
  zero: [
    { cx: 246, cy: 60, r: 4 },
    { cx: 106, cy: 164, r: 4 },
  ],
};

const ServiceAbstractVisual = ({ mark, className }: ServiceAbstractVisualProps) => {
  return (
    <div className={cn("relative h-56 overflow-hidden bg-white", className)} aria-hidden="true">
      <svg viewBox="0 0 360 220" fill="none" className="absolute inset-0 h-full w-full">
        <rect x="18" y="18" width="324" height="184" rx="6" className="stroke-primary/10" />
        {gridLines.x.map((x) => (
          <path key={`x-${x}`} d={`M${x} 18 V202`} className="stroke-primary/10" strokeWidth="1" />
        ))}
        {gridLines.y.map((y) => (
          <path key={`y-${y}`} d={`M18 ${y} H342`} className="stroke-primary/10" strokeWidth="1" />
        ))}
        <path d="M54 188 H154" className="stroke-primary/20" strokeWidth="3" strokeLinecap="round" />
        <path d="M170 188 H306" className="stroke-primary/20" strokeWidth="3" strokeLinecap="round" />
        <path d="M72 58 L314 166" className="stroke-foreground/10" strokeWidth="1" strokeLinecap="round" />
        <circle cx="212" cy="116" r="66" className="stroke-primary/20" strokeWidth="1.5" />
        <circle cx="212" cy="116" r="34" className="stroke-primary/10" strokeWidth="1" />
        {visualPaths[mark].map((path) => (
          <path
            key={path}
            d={path}
            className="stroke-primary/45"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {visualDots[mark].map((dot) => (
          <circle key={`${dot.cx}-${dot.cy}`} {...dot} className="fill-primary/65" />
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
};

export default ServiceAbstractVisual;
