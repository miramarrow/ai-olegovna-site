import { cn } from "@/lib/utils";

export type AbstractMarkKey =
  | "axis"
  | "fold"
  | "mesh"
  | "ripple"
  | "stack"
  | "trace"
  | "window"
  | "zero";

interface AbstractServiceMarkProps {
  mark: AbstractMarkKey;
  className?: string;
}

const variants: Record<
  AbstractMarkKey,
  {
    paths: string[];
    circles: Array<{ cx: number; cy: number; r: number }>;
  }
> = {
  axis: {
    paths: ["M9 30 L34 14", "M15 12 L39 36", "M8 38 H28"],
    circles: [{ cx: 34, cy: 14, r: 2.5 }],
  },
  fold: {
    paths: ["M11 12 H35 L25 24 H39", "M13 36 H37", "M20 12 V36"],
    circles: [{ cx: 25, cy: 24, r: 2 }],
  },
  mesh: {
    paths: ["M10 18 C18 10 29 10 38 18", "M10 30 C19 39 30 39 38 30", "M24 9 V39"],
    circles: [
      { cx: 12, cy: 24, r: 1.8 },
      { cx: 36, cy: 24, r: 1.8 },
    ],
  },
  ripple: {
    paths: ["M11 29 C17 18 27 15 37 20", "M12 38 C20 29 29 26 39 31", "M17 12 L31 37"],
    circles: [{ cx: 17, cy: 12, r: 2.2 }],
  },
  stack: {
    paths: ["M10 16 H34", "M14 24 H38", "M10 32 H34", "M22 10 V38"],
    circles: [{ cx: 38, cy: 24, r: 2 }],
  },
  trace: {
    paths: ["M12 35 L21 13 L28 35 L37 13", "M9 24 H39"],
    circles: [
      { cx: 21, cy: 13, r: 1.9 },
      { cx: 28, cy: 35, r: 1.9 },
    ],
  },
  window: {
    paths: ["M11 14 H31 V34 H11 Z", "M18 9 H38 V29", "M11 25 H31"],
    circles: [{ cx: 38, cy: 29, r: 2 }],
  },
  zero: {
    paths: ["M13 27 C14 17 22 10 33 13", "M35 21 C34 31 26 38 15 35", "M17 17 L33 33"],
    circles: [{ cx: 24, cy: 24, r: 2.1 }],
  },
};

const AbstractServiceMark = ({ mark, className }: AbstractServiceMarkProps) => {
  const variant = variants[mark];

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-8 w-8 text-primary", className)}
      aria-hidden="true"
      focusable="false"
    >
      {variant.paths.map((path) => (
        <path key={path} d={path} className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {variant.circles.map((circle) => (
        <circle key={`${circle.cx}-${circle.cy}`} {...circle} className="fill-current opacity-70" />
      ))}
    </svg>
  );
};

export default AbstractServiceMark;
