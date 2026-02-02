import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { JSX } from "react";

/**
 * StateDrivenClasses.tsx
 *
 * Demonstrates safe patterns for driving Tailwind classes from component state/props:
 * - Variant mapping lookup (preferred)
 * - Using clsx for conditional classes
 * - Using twMerge to resolve conflicting Tailwind utilities
 * - Why string-concatenation like `bg-${color}-500` is unsafe with JIT and how to avoid it
 * - Example of runtime theming with CSS variables + Tailwind token (bg-[var(--bg)])
 *
 * Drop into src/components and render <StateDrivenClasses />.
 *
 * Note: If you generate class names at runtime you may need to safelist them in tailwind.config:
 * safelist: [
 *   'bg-red-500','bg-green-500','bg-yellow-500',
 *   { pattern: /^text-(?:sm|base|lg|xl)$/ }
 * ]
 */

type BtnVariant = "primary" | "danger" | "ghost";

/* ---------------- Variant mapping (recommended) ----------------
   Keep every Tailwind class literal in source so the JIT can see it.
------------------------------------------------------------------*/
const buttonVariantClass: Record<BtnVariant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
  ghost: "bg-transparent text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
};

function VariantButton({
  variant = "primary",
  className,
  children,
  ...rest
}: {
  variant?: BtnVariant;
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // Compose with clsx and clean up conflicts with twMerge
  const classes = twMerge(
    clsx(
      "inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      buttonVariantClass[variant]
    ),
    className
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

/* ---------------- Status badge via mapping --------------------
   Map status to class list. Avoid building class names from strings
   that the JIT cannot detect (see "unsafePattern" below).
------------------------------------------------------------------*/
type Status = "success" | "warning" | "error" | "pending";

const statusClasses: Record<
  Status,
  { container: string; dot: string; text: string }
> = {
  success: {
    container: "bg-green-50 dark:bg-green-900/20",
    dot: "bg-green-500",
    text: "text-green-800 dark:text-green-200",
  },
  warning: {
    container: "bg-yellow-50 dark:bg-yellow-900/20",
    dot: "bg-yellow-400",
    text: "text-yellow-800 dark:text-yellow-200",
  },
  error: {
    container: "bg-red-50 dark:bg-red-900/20",
    dot: "bg-red-500",
    text: "text-red-800 dark:text-red-200",
  },
  pending: {
    container: "bg-gray-50 dark:bg-gray-900/20",
    dot: "bg-gray-400",
    text: "text-gray-700 dark:text-gray-300",
  },
};

function StatusBadge({ status }: { status: Status }) {
  const s = statusClasses[status];
  return (
    <span
      className={clsx("inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm", s.container)}
      role="status"
      aria-label={`Status: ${status}`}
    >
      <span className={clsx("h-2 w-2 rounded-full", s.dot)} aria-hidden />
      <span className={s.text}>{status}</span>
    </span>
  );
}

/* ---------------- Unsafe pattern (avoid this) --------------------
   This will produce class names at runtime like 'bg-red-500' which the
   Tailwind JIT cannot see unless those exact strings appear in source
   or you safelist them in tailwind.config.
   Avoid: const cls = `bg-${color}-500`
------------------------------------------------------------------*/
function UnsafePatternExample({ color }: { color: string }) {
  // Unsafe: the JIT may strip classes like bg-green-500 if not present literally
  const unsafeClass = `bg-${color}-500 text-white`;
  return (
    <div className={clsx("p-3 rounded-md text-sm", unsafeClass)}>
      Unsafe: built at runtime  "{unsafeClass}"
    </div>
  );
}

/* ---------------- Safe alternative for dynamic colors -----------
   1) Use a mapping of allowed colors to Tailwind classes (preferred)
   2) Or use CSS variables + Tailwind arbitrary value (bg-[var(--bg)]) and set the variable at runtime
------------------------------------------------------------------*/
const colorMap: Record<string, string> = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-indigo-600",
  yellow: "bg-yellow-400",
};

function SafeColorBox({ colorKey }: { colorKey: keyof typeof colorMap | string }) {
  // If colorKey is one of the keys in colorMap, use the mapped class
  const mapped = colorMap[colorKey] ?? "bg-gray-300";
  return <div className={clsx(mapped, "text-white px-3 py-2 rounded-md text-sm")}>Safe mapped color: {colorKey}</div>;
}

/* ---------------- CSS variable + Tailwind token example -----------
   Use Tailwind to reference a CSS variable using an arbitrary value:
   e.g. className="bg-[var(--card)]"
   Then set --card inline or via a theme class (dark/light). This keeps the Tailwind literal
   in source so JIT sees "bg-[var(--card)]".
------------------------------------------------------------------*/
function CssVarBox({ color }: { color: string }) {
  // set CSS variable at runtime (safe because the Tailwind class is literal)
  const style: React.CSSProperties = { ["--card" as any]: color };
  return (
    <div style={style} className="bg-(--card) text-white px-3 py-2 rounded-md text-sm">
      CSS variable background (color value: {color})
    </div>
  );
}

/* ---------------- Example showing twMerge resolving conflicts ----
   If the consumer passes "p-2 p-6" or different padding classes, twMerge
   keeps the last utility of the same group (e.g., p-6).
------------------------------------------------------------------*/
function MergeExample({ userClass }: { userClass?: string }) {
  const base = "p-2 rounded-md bg-indigo-600 text-white";
  const merged = twMerge(base, userClass ?? "");
  return <div className={merged}>twMerge result: "{merged}"</div>;
}

/* ----------------- Showcase page combining the examples ---------- */

export default function StateDrivenClasses(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
          <h2 className="text-lg font-semibold">State-driven classes — safe patterns</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Variant buttons (mapping)</div>
              <div className="flex flex-wrap gap-2">
                <VariantButton variant="primary">Primary</VariantButton>
                <VariantButton variant="danger">Danger</VariantButton>
                <VariantButton variant="ghost">Ghost</VariantButton>
                {/* Example of merging user classes that conflict (p-2 vs default p-4) */}
                <VariantButton variant="primary" className="p-2">
                  Merged (p-2)
                </VariantButton>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Status badges (mapping)</div>
              <div className="flex gap-2 items-center">
                <StatusBadge status="success" />
                <StatusBadge status="warning" />
                <StatusBadge status="error" />
                <StatusBadge status="pending" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
          <h3 className="font-medium">Dynamic color patterns — safe vs unsafe</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">Unsafe: runtime string concat</div>
              <UnsafePatternExample color="red" />
              <div className="text-xs text-gray-400 mt-1">If "bg-red-500" does not appear in source, JIT may remove it.</div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Safe: mapping</div>
              <SafeColorBox colorKey="green" />
              <SafeColorBox colorKey="blue" />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1">Safe: CSS variable + Tailwind arbitrary class</div>
              <CssVarBox color="#7c3aed" />
              <div className="text-xs text-gray-400 mt-1">Uses literal class "bg-[var(--card)]" so JIT sees it.</div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-3">
          <h3 className="font-medium">twMerge example (resolving conflicts)</h3>
          <div className="space-y-2">
            <MergeExample userClass="p-6" />
            <MergeExample userClass="p-2 bg-red-500" />
            <div className="text-xs text-gray-400">
              Note: twMerge keeps the last utility in the same group (e.g., p-6 wins over p-2).
            </div>
          </div>
        </section>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Summary: Prefer mapping objects or CSS variables for dynamic styling, use clsx for conditional classes,
          and use twMerge when merging class strings that may conflict. If you must generate classes at runtime,
          add them to the safelist in tailwind.config so they are included in production builds.
        </div>
      </div>
    </div>
  );
}