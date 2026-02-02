import React, { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { JSX } from "react";

/**
 * ButtonsVariants.tsx
 *
 * Demonstrates Tailwind-styled buttons, states, and variants in React + TypeScript.
 * Includes:
 * - Primary, secondary, outline, ghost, destructive, and link variants
 * - Size variants: sm, md, lg
 * - Disabled and loading states (with spinner)
 * - Icon button and pill / block styles
 * - Toggle button and segmented control examples
 *
 * Notes:
 * - Install helpers if you want: `npm i clsx tailwind-merge`
 * - Drop into src/components and render <ButtonsVariants />.
 */

/* -------------------- Button component -------------------- */

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  pill?: boolean;
  block?: boolean;
}

/* Spinner used for loading state */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={clsx("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  pill = false,
  block = false,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const sizes: Record<Size, string> = {
    sm: "text-sm px-3 py-1.5 rounded",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-5 py-3 rounded-md",
  };

  const variants: Record<Variant, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400",
    secondary: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 focus-visible:ring-gray-300",
    outline: "bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900 focus-visible:ring-indigo-400",
    ghost: "bg-transparent text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
    link: "bg-transparent text-indigo-600 underline-offset-4 hover:underline px-0 py-0",
  };

  const pillClass = pill ? "rounded-full" : "";
  const blockClass = block ? "w-full" : "inline-flex";

  const merged = twMerge(
    base,
    sizes[size],
    variants[variant],
    pillClass,
    blockClass,
    disabled || loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-sm",
    className || ""
  );

  return (
    <button
      className={merged}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner className="h-4 w-4 text-current" /> : null}
      <span className={loading ? "sr-only" : undefined}>{children}</span>
    </button>
  );
}

/* -------------------- IconButton -------------------- */

export function IconButton({
  label,
  onClick,
  className,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={clsx(
        "inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      disabled={disabled}
    >
      {/* example icon: simple bell */}
      <svg className="h-5 w-5 text-gray-700 dark:text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z" />
      </svg>
    </button>
  );
}

/* -------------------- ToggleButton (stateful) -------------------- */

function ToggleButton() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn((s) => !s)}
      aria-pressed={on}
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
        on ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      )}
    >
      <span className={clsx("h-4 w-8 rounded-full p-0.5 inline-flex items-center", on ? "bg-indigo-500" : "bg-gray-300")}>
        <span className={clsx("h-3 w-3 rounded-full bg-white transform transition", on ? "translate-x-4" : "translate-x-0")} />
      </span>
      <span className="text-sm">{on ? "On" : "Off"}</span>
    </button>
  );
}

/* -------------------- Segmented control -------------------- */

function SegmentedControl() {
  const [value, setValue] = useState<"daily" | "weekly" | "monthly">("weekly");
  const options: { key: "daily" | "weekly" | "monthly"; label: string }[] = [
    // note: typing here is simple; we only use the keys
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
  ];

  return (
    <div className="inline-flex rounded-md bg-gray-100 dark:bg-gray-800 p-1">
      {options.map((o) => {
        const isActive = value === o.key;
        return (
          <button
            key={o.label}
            onClick={() => setValue(o.key)}
            className={clsx(
              "px-3 py-1 rounded-md text-sm focus:outline-none",
              isActive ? "bg-white dark:bg-gray-900 shadow-sm text-indigo-600" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
            aria-pressed={isActive}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------- Showcase page -------------------- */

export default function ButtonsVariants(): JSX.Element {
  const [loadingPrimary, setLoadingPrimary] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Buttons — states & variants</h2>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => alert("Primary clicked!")}>Primary</Button>

              <Button variant="secondary">Secondary</Button>

              <Button variant="outline">Outline</Button>

              <Button variant="ghost">Ghost</Button>

              <Button variant="destructive">Delete</Button>

              <Button variant="link" onClick={() => alert("Link style clicked")} >Learn more</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" variant="primary">Small</Button>
              <Button size="md" variant="primary">Medium</Button>
              <Button size="lg" variant="primary">Large</Button>
              <Button size="md" variant="primary" pill>Badge</Button>
              <Button size="md" variant="primary" block className="max-w-xs">Block (max-w-xs)</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <IconButton label="Notifications" onClick={() => alert("Icon clicked")} />
              <IconButton label="Disabled" disabled />
              <ToggleButton />
              <SegmentedControl />
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                loading={loadingPrimary}
                onClick={() => {
                  setLoadingPrimary(true);
                  setTimeout(() => setLoadingPrimary(false), 1500);
                }}
              >
                {loadingPrimary ? "Saving..." : "Save"}
              </Button>

              <Button variant="outline" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="font-medium mb-3">Grouped buttons and accessibility</h3>

          <div className="inline-flex rounded-md shadow-sm" role="group" aria-label="Grouped actions">
            <Button className="rounded-r-none" variant="outline">Left</Button>
            <Button className="rounded-none" variant="secondary">Middle</Button>
            <Button className="rounded-l-none" variant="primary">Right</Button>
          </div>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Use proper aria attributes, keyboard focus styles (focus-visible), and don't rely on color alone for meaning.
          </p>
        </section>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tip: use tailwind-merge (twMerge) when programmatically combining classes to avoid conflicting utilities like "p-2 p-4".
        </div>
      </div>
    </div>
  );
}