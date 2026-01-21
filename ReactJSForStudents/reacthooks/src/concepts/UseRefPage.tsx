import { useRef, useState, useEffect } from "react";
import type { JSX } from "react";

export default function UseRefPage(): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rendersRef = useRef(0);
  const prevValueRef = useRef<string>("");

  const [value, setValue] = useState("");

  useEffect(() => {
    rendersRef.current += 1;
    prevValueRef.current = value;
  });

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-2">useRef demo</h2>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        className="border px-2 py-1 rounded w-full md:w-1/2 mb-4"
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => inputRef.current?.focus()}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Focus
        </button>
        <button
          onClick={() => { setValue(""); inputRef.current?.focus(); }}
          className="px-3 py-1 bg-slate-200 rounded"
        >
          Clear & Focus
        </button>
      </div>

      <p className="mb-1">Current value: <strong>{value}</strong></p>
      <p className="mb-1">Previous value (ref): <strong>{prevValueRef.current}</strong></p>
      <p className="mb-1">Render count (ref): <strong>{rendersRef.current}</strong></p>
      <p className="text-sm text-slate-500">Placeholder: use the buttons and type to see refs in action.</p>
    </main>
  );
}