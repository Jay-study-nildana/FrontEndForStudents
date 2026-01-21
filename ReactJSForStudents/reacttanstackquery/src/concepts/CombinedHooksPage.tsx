// ...existing code...
import { useEffect, useRef, useReducer, useState } from "react";
import type { JSX } from "react";

type Todo = { id: string; text: string; done: boolean };
type State = {
  todos: Todo[];
  prevTodos?: Todo[]; // for simple undo
  status: "idle" | "loading" | "saving" | "error" | "loaded";
  lastSavedAt?: number;
};
type Action =
  | { type: "set"; todos: Todo[] }
  | { type: "add"; todo: Todo }
  | { type: "toggle"; id: string }
  | { type: "remove"; id: string }
  | { type: "markSaving" }
  | { type: "markSaved"; at: number }
  | { type: "setError" }
  | { type: "undo" };

const STORAGE_KEY = "rh_todos_v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set":
      return { ...state, todos: action.todos, status: "loaded" };
    case "add":
      return {
        ...state,
        prevTodos: state.todos,
        todos: [action.todo, ...state.todos],
      };
    case "toggle":
      return {
        ...state,
        prevTodos: state.todos,
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };
    case "remove":
      return {
        ...state,
        prevTodos: state.todos,
        todos: state.todos.filter((t) => t.id !== action.id),
      };
    case "markSaving":
      return { ...state, status: "saving" };
    case "markSaved":
      return { ...state, status: "idle", lastSavedAt: action.at };
    case "setError":
      return { ...state, status: "error" };
    case "undo":
      if (!state.prevTodos) return state;
      return { ...state, todos: state.prevTodos, prevTodos: undefined };
    default:
      return state;
  }
}

export default function CombinedHooksPage(): JSX.Element {
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1); // extra control to combine reducer + local state
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    status: "loading",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const saveTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(false);
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: Todo[] = raw ? JSON.parse(raw) : [];
      // simulate network latency
      const id = window.setTimeout(() => {
        dispatch({ type: "set", todos: parsed });
        mountedRef.current = true;
      }, 300);
      return () => clearTimeout(id);
    } catch (e) {
      dispatch({ type: "setError" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autosave (debounced) whenever todos change
  useEffect(() => {
    if (!mountedRef.current) return; // skip saving during initial load
    // mark saving then debounce actual write
    dispatch({ type: "markSaving" });
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
        dispatch({ type: "markSaved", at: Date.now() });
      } catch (e) {
        dispatch({ type: "setError" });
      }
      saveTimerRef.current = null;
    }, 600);
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.todos]);

  // keyboard shortcut: Ctrl+K to focus input
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    const todo: Todo = {
      id: Math.random().toString(36).slice(2, 9),
      text,
      done: false,
    };
    dispatch({ type: "add", todo });
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Combined Hooks Playground</h2>

      <div className="mb-4 flex flex-col md:flex-row gap-3 items-start">
        <div className="flex-1">
          <label className="block text-sm mb-1">New task (Ctrl+K to focus)</label>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo();
              }}
              className="border rounded px-3 py-2 flex-1"
              placeholder="e.g. Read hooks docs"
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>

        <div className="w-40">
          <label className="block text-sm mb-1">Step (local state)</label>
          <input
            type="number"
            value={step}
            min={1}
            onChange={(e) => setStep(Number(e.target.value) || 1)}
            className="border rounded px-2 py-2 w-full"
          />
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => dispatch({ type: "undo" })}
          className="px-3 py-1 bg-yellow-300 rounded"
          title="Undo last edit"
        >
          Undo
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "add",
              todo: { id: Math.random().toString(36), text: `Quick +${step}`, done: false },
            })
          }
          className="px-3 py-1 bg-slate-200 rounded"
        >
          Quick +{step}
        </button>

        <div className="ml-auto text-sm text-slate-500">
          Render: {renderCountRef.current} • Status: {state.status}
          {state.lastSavedAt ? (
            <> • Saved: {new Date(state.lastSavedAt).toLocaleTimeString()}</>
          ) : null}
        </div>
      </div>

      <ul className="space-y-2">
        {state.todos.length === 0 ? (
          <li className="text-sm text-slate-500">No tasks yet — add one above.</li>
        ) : (
          state.todos.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between gap-3 bg-white/80 dark:bg-slate-800 p-3 rounded shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => dispatch({ type: "toggle", id: t.id })}
                />
                <span className={t.done ? "line-through text-slate-400" : ""}>
                  {t.text}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // quick simulate an edit: toggle done 'step' times (demonstrates reducer + local step)
                    for (let i = 0; i < step; i++) {
                      dispatch({ type: "toggle", id: t.id });
                    }
                  }}
                  className="px-2 py-1 bg-slate-100 rounded"
                >
                  Toggle x{step}
                </button>
                <button
                  onClick={() => dispatch({ type: "remove", id: t.id })}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <aside className="mt-6 text-sm text-slate-500">
        Placeholder notes:
        <ul className="list-disc ml-5 mt-2">
          <li>useEffect: initial load + autosave (debounced) with cleanup.</li>
          <li>useRef: focus control, timer id, render counter and mounted guard.</li>
          <li>useReducer: manage todos with history (simple undo via prevTodos).</li>
        </ul>
      </aside>
    </main>
  );
}