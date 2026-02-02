import React, { useEffect, useRef, useState } from "react";
import type { JSX } from "react";

/**
 * ModalsPopoversDropdowns.tsx
 *
 * Demonstrates accessible patterns for:
 * - Modal (overlay, ESC to close, focus trap, restore focus)
 * - Tooltip (hover + focus accessible)
 * - Popover (toggable panel anchored to a button)
 * - Dropdown menu (keyboard navigation: Arrow keys + Enter + ESC)
 *
 * Drop into src/components and render <ModalsPopoversDropdowns />.
 *
 * Notes:
 * - These implementations are intentionally lightweight (no external deps).
 * - For production consider using tested libraries (Headless UI, Radix) for complex edge cases.
 */

/* -------------------------- Utility helpers -------------------------- */

function useOnClickOutside<T extends HTMLElement | null>(ref: React.RefObject<T>, handler: () => void) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!(ref.current as HTMLElement).contains(e.target as Node)) handler();
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [ref, handler]);
}

function focusFirstDescendant(container: HTMLElement | null) {
  if (!container) return;
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length) focusable[0].focus();
}

/* ------------------------------- Modal ------------------------------- */

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && modalRef.current) {
        // basic focus trap
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }

    if (open) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      document.addEventListener("keydown", onKey);
      // disable background scroll
      document.body.style.overflow = "hidden";
      // focus the modal or first focusable element inside
      setTimeout(() => focusFirstDescendant(modalRef.current), 0);
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // restore focus
      if (lastFocusedRef.current) lastFocusedRef.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={modalRef}
        className="relative z-50 w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black/5 overflow-hidden"
      >
        <div className="px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 id="modal-title" className="text-lg font-semibold">
                {title ?? "Modal title"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                This modal demonstrates focus trapping and accessible behavior.
              </p>
            </div>

            <button
              onClick={onClose}
              className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">{children}</div>

          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // example action
                alert("Primary action");
                onClose();
              }}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Do action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Tooltip ------------------------------ */

function Tooltip({
  label,
  children,
  side = "top",
}: {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}) {
  // simple CSS-based tooltip visible on hover/focus
  const base = "group relative inline-flex items-center";
  const tipBase =
    "pointer-events-none absolute z-10 rounded-md px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-200 dark:text-gray-900 opacity-0 scale-95 transform transition-all duration-150";
  const positions: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };
  return (
    <span className={base}>
      <span className="focusable">{children}</span>
      <span
        role="tooltip"
        className={`${tipBase} ${positions[side]} group-hover:opacity-100 group-hover:scale-100 group-focus:opacity-100 group-focus:scale-100`}
      >
        {label}
      </span>
    </span>
  );
}

/* ------------------------------ Popover ------------------------------ */

function Popover({
  buttonLabel,
  children,
}: {
  buttonLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useOnClickOutside(panelRef, () => setOpen(false));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        {buttonLabel}
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black/5 z-20 p-3"
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Dropdown ----------------------------- */

function Dropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const itemsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useOnClickOutside(menuRef, () => setOpen(false));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      const focusable = itemsRef.current.filter(Boolean) as HTMLButtonElement[];
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const idx = focusable.indexOf(document.activeElement as HTMLButtonElement);
        const next = focusable[(idx + 1) % focusable.length];
        next?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const idx = focusable.indexOf(document.activeElement as HTMLButtonElement);
        const prev = focusable[(idx - 1 + focusable.length) % focusable.length];
        prev?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        focusable[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        focusable[focusable.length - 1]?.focus();
      }
    }

    if (open) {
      document.addEventListener("keydown", onKey);
      // focus first menu item
      setTimeout(() => itemsRef.current[0]?.focus(), 0);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        Menu
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black/5 z-20 py-1"
        >
          {["Profile", "Settings", "Sign out"].map((label, i) => (
            <button
              key={label}
              ref={(el) => { itemsRef.current[i] = el; }}
              role="menuitem"
              onClick={() => {
                alert(`${label} clicked`);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------- Demo page --------------------------- */

export default function ModalsPopoversDropdowns(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Modals, Tooltips, Popovers & Dropdowns</h2>

          <div className="flex items-center gap-3">
            <Dropdown />
            <Popover buttonLabel="More">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700">New project</button>
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Import</button>
                <div className="border-t border-gray-100 dark:border-gray-700 my-2" />
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Templates</button>
              </div>
            </Popover>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Open modal
            </button>
          </div>
        </div>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="font-medium mb-4">Tooltip examples</h3>

          <div className="flex items-center gap-6">
            <Tooltip label="This is a helpful hint">
              <button className="group inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none">
                Hover or focus me
              </button>
            </Tooltip>

            <Tooltip label="Keyboard accessible" side="right">
              <a href="#" className="group inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-100 text-indigo-700">
                Link with tooltip
              </a>
            </Tooltip>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="font-medium mb-4">Popover & Dropdown behavior</h3>

          <div className="flex items-center gap-6">
            <Popover buttonLabel="Actions">
              <div className="text-sm">
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Export</button>
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Duplicate</button>
                <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Archive</button>
              </div>
            </Popover>

            <Dropdown />
          </div>
        </section>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tip: consider well-tested primitives (Headless UI / Radix) when you need robust focus management & a11y.
        </div>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example modal">
        <p>
          Modals should trap focus, close on Escape, and restore focus to the previously focused element when closed.
          This example uses a simple trap implementation. For complex cases use a library.
        </p>
      </Modal>
    </div>
  );
}