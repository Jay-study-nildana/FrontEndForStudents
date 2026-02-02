import { useEffect, useState } from "react";
import type { JSX } from "react";

/**
 * AnimationsMotion.tsx
 *
 * Demonstrates Tailwind CSS animations, transitions, and respecting reduced-motion preferences.
 *
 * Examples included:
 * - CSS transitions: hover scale, transform, opacity, duration, easing
 * - Toggle-driven enter/exit transitions (fade + slide, pop-in modal)
 * - Built-in animations: animate-spin, animate-pulse, animate-bounce
 * - A toast that slides/fades in and out
 * - Motion-safe / motion-reduce patterns (uses Tailwind's motion-* utilities)
 *
 * Drop into src/components and render <AnimationsMotion />.
 */

export default function AnimationsMotion(): JSX.Element {
  const [showPanel, setShowPanel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pulseActive, setPulseActive] = useState(true);
  const [spinnerActive, setSpinnerActive] = useState(true);

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 2800);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">Animations, Transitions & Motion (Tailwind)</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Examples of transitions, animations, and how to respect reduced-motion preferences.
          </p>
        </header>

        {/* Controls */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex flex-wrap gap-3 items-center">
          <button
            onClick={() => setShowPanel((s) => !s)}
            className="px-3 py-2 rounded-md bg-indigo-600 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Toggle Panel (fade + slide)
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm bg-white dark:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Open Pop-in Modal
          </button>

          <button
            onClick={() => setShowToast(true)}
            className="px-3 py-2 rounded-md bg-green-600 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          >
            Show Toast (slide)
          </button>

          <button
            onClick={() => setPulseActive((s) => !s)}
            className="px-3 py-2 rounded-md bg-yellow-500 text-white"
          >
            Toggle Pulse
          </button>

          <button
            onClick={() => setSpinnerActive((s) => !s)}
            className="px-3 py-2 rounded-md bg-pink-600 text-white"
          >
            Toggle Spinner
          </button>
        </section>

        {/* Hover transitions */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h2 className="font-medium mb-3">Hover transitions (scale, shadow, transform)</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 transform transition-transform duration-300 ease-out hover:scale-105 hover:shadow-lg">
              <div className="text-sm font-semibold">Scale on hover</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">Uses transform + transition classes.</div>
            </div>

            <div className="p-6 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 transition-colors duration-250 hover:bg-emerald-100 dark:hover:bg-emerald-900/10">
              <div className="text-sm font-semibold">Color transition</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">Background color smoothly changes.</div>
            </div>

            <div className="p-6 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="mb-3 text-sm font-semibold">3D-ish tilt (transform)</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded bg-pink-100 dark:bg-pink-900/30 transition-transform transform hover:-translate-y-1 hover:rotate-1">Item A</div>
                <div className="p-3 rounded bg-pink-200 dark:bg-pink-900/20 transition-transform transform hover:translate-y-1 hover:-rotate-1">Item B</div>
              </div>
            </div>
          </div>
        </section>

        {/* Toggle-driven panel: fade + slide */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h2 className="font-medium mb-3">Toggle panel (enter / exit via class changes)</h2>

          <div className="relative">
            {/* Container with fixed height so exit animation can be seen cleanly */}
            <div className="h-36 flex items-center justify-center">
              {/* Panel: use transform + opacity transition; change classes based on state */}
              <div
                className={`max-w-md w-full bg-indigo-600 text-white rounded-lg p-4 shadow-lg transform transition-all duration-400 ease-out
                  ${showPanel ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95 pointer-events-none"}
                  motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100`}
                aria-hidden={!showPanel}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="font-semibold">Animated panel</div>
                    <div className="text-xs">Fades and slides using transition + transform utilities.</div>
                  </div>

                  <button
                    onClick={() => setShowPanel(false)}
                    className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded bg-white/20"
                    aria-label="Close panel"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Toast (slide up + fade) */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h2 className="font-medium mb-3">Toast (slide + fade)</h2>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Click Show Toast to display a small notification that slides up and fades.</p>

          <div className="relative h-24">
            <div className="absolute inset-0 flex items-end justify-end p-4 pointer-events-none">
              <div
                className={`pointer-events-auto w-80 rounded-md bg-gray-900 text-white px-4 py-3 shadow-lg transform transition-all duration-300 ease-out
                  ${showToast ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                role="status"
                aria-live="polite"
              >
                <div className="text-sm">Saved — your changes were applied.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Built-in animations + motion-safe/reduce examples */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h2 className="font-medium mb-3">Built-in animations & motion preferences</h2>

          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">animate-spin</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className={`h-12 w-12 rounded-full bg-pink-500 flex items-center justify-center text-white ${pulseActive ? "animate-pulse" : ""} motion-reduce:animate-none`}>
                <span className="text-sm font-semibold">Pulse</span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">animate-pulse (toggleable)</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className={`h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-white ${spinnerActive ? "animate-bounce" : ""} motion-reduce:animate-none`}>
                <span className="text-sm font-semibold">Bounce</span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">animate-bounce (toggleable)</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-mono text-gray-800 dark:text-gray-100">
                <div className={`inline-block ${spinnerActive ? "animate-spin" : ""} motion-reduce:animate-none`} style={{ width: 18, height: 18 }}>
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">spinner (svg + animate-spin)</div>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Users can express motion preferences; respect them with <code className="font-mono">motion-reduce:</code> utilities.
          </p>
        </section>

        {/* Modal pop-in example */}
        {showModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40" onClick={() => setShowModal(false)} />

            <div
              className="relative z-50 w-full max-w-lg mx-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Pop-in modal"
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 transform transition-all duration-300 ease-out
                  scale-95 opacity-0
                  motion-reduce:transition-none motion-reduce:transform-none"
                // When mounted, trigger a micro-task to add "entered" classes so transition plays.
                // We use inline style toggling via state-less animation: setTimeout below to add classes.
              >
                <PopInContent onClose={() => setShowModal(false)} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simple inline script to add "entered" class to the modal after mount so pop-in animates.
          We implement a small effect that finds the dialog and toggles classes. */}
      <ModalEnterEffect active={showModal} />
    </div>
  );
}

/* ---------- Small components used above ---------- */

function PopInContent({ onClose }: { onClose: () => void }) {
  // We add the "entered" class after mount via effect (see ModalEnterEffect) — here we just render content.
  return (
    <div className="popin-root">
      <h3 className="text-lg font-semibold">Pop-in Modal</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        This modal uses scale + opacity transitions for a quick pop-in effect. It also respects motion-reduce.
      </p>

      <div className="mt-4 flex gap-2 justify-end">
        <button onClick={onClose} className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700">
          Close
        </button>
        <button onClick={() => { alert("Performing action"); onClose(); }} className="px-3 py-2 rounded-md bg-indigo-600 text-white">
          Confirm
        </button>
      </div>
    </div>
  );
}

/* ModalEnterEffect: after modal mounts, find the popin-root container and add "entered" classes onto its parent
   to trigger transition from scale-95/opacity-0 to scale-100/opacity-100. This is a small demo technique. */
function ModalEnterEffect({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;

    // microtask so DOM is painted
    const t = setTimeout(() => {
      const node = document.querySelector(".popin-root")?.parentElement;
      if (node) {
        node.classList.remove("scale-95", "opacity-0");
        node.classList.add("scale-100", "opacity-100");
      }
    }, 20);

    return () => clearTimeout(t);
  }, [active]);

  return null;
}