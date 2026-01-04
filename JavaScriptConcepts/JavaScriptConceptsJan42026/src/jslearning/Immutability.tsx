import type { JSX } from "react";
import { useMemo, useRef, useState } from "react";

/**
 * Immutability Patterns — Interactive Playground
 * - Demonstrates common immutable update patterns for arrays & objects:
 *   - shallow cloning (spread / slice / concat / Object.assign)
 *   - immutable updates of array items (map / index replace)
 *   - nested updates (shallow + nested spread)
 *   - structural sharing (reuse unchanged references)
 *   - reducer pattern for state updates
 *   - pitfalls: Object.freeze, JSON deep clone caveats
 *
 * Small interactive examples students can run to see patterns and effects.
 */

type Todo = { id: number; text: string; done: boolean; meta?: { tags: string[] } };

export default function Immutability(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn immutability", done: false, meta: { tags: ["js"] } },
    { id: 2, text: "Practice map/filter/reduce", done: false, meta: { tags: ["array"] } },
    { id: 3, text: "Understand structural sharing", done: false, meta: { tags: ["perf"] } },
  ]);
  const [nextText, setNextText] = useState<string>("New task");
  const history = useRef<Todo[][]>([]); // simple time-travel snapshot store

  // derived values
  const counts = useMemo(
    () => ({ total: todos.length, done: todos.filter((t) => t.done).length }),
    [todos]
  );

  // 1) Add todo immutably (concat / spread)
  function addTodo() {
    const next: Todo = { id: Date.now(), text: nextText || `Task ${Date.now()}`, done: false, meta: { tags: [] } };
    history.current.push(todos); // store previous ref (structural sharing demonstration)
    setTodos((prev) => [...prev, next]); // new array reference, reuses existing todo objects
    setNextText("");
  }

  // 2) Toggle done immutably by mapping (replace only changed item)
  function toggleDone(id: number) {
    history.current.push(todos);
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  // 3) Replace by index immutably (copy + set index)
  function markFirstDone() {
    if (!todos.length) return;
    history.current.push(todos);
    setTodos((prev) => {
      const copy = prev.slice(); // shallow copy
      copy[0] = { ...copy[0], done: true };
      return copy;
    });
  }

  // 4) Update nested data immutably (nested spread)
  function addTagToTodo(id: number, tag: string) {
    history.current.push(todos);
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, meta: { ...(t.meta ?? { tags: [] }), tags: [...((t.meta && t.meta.tags) || []), tag] } }
          : t
      )
    );
  }

  // 5) Remove todo immutably (filter)
  function removeTodo(id: number) {
    history.current.push(todos);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  // 6) Replace an item immutably using reducer (useful for complex updates)
  function updateTodoViaReducer(id: number, updater: (t: Todo) => Todo) {
    history.current.push(todos);
    setTodos((prev) =>
      prev.reduce<Todo[]>((acc, t) => {
        acc.push(t.id === id ? updater(t) : t);
        return acc;
      }, [])
    );
  }

  // 7) Demonstrate structural sharing vs deep clone
  function demoDeepCloneCaveat() {
    // naive deep clone via JSON — loses functions/undefined and can be slow for large data
    const cloned = JSON.parse(JSON.stringify(todos)) as Todo[];
    // mutate cloned to show original unaffected
    if (cloned[0]) cloned[0].text = "CLONED & MUTATED";
    history.current.push(todos);
    setTodos(cloned);
  }

  // 8) Show Object.freeze behavior (shallow freeze)
  function freezeFirst() {
    if (!todos[0]) return;
    const frozen = Object.freeze({ ...todos[0] });
    // freezing does not prevent replacing the object reference in state,
    // but attempting to mutate fields will throw in strict mode.
    history.current.push(todos);
    setTodos((prev) => [frozen, ...prev.slice(1)]);
  }

  // 9) Time-travel: restore last snapshot
  function undo() {
    const prev = history.current.pop();
    if (prev) setTodos(prev);
  }

  // 10) Clear history
  function clearHistory() {
    history.current = [];
  }

  // small helper to show whether structural sharing happened for first item
  const structuralNote = useMemo(() => {
    const prev = history.current[history.current.length - 1];
    if (!prev) return "no snapshot";
    return prev[0] === todos[0] ? "first item reference reused (structural sharing)" : "first item replaced";
  }, [todos]);

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Immutability Patterns — Interactive Playground</h2>
        <p className="text-slate-600">Practice safe immutable updates and learn common idioms used in React apps.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overview */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Overview</h3>
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div><strong>total:</strong> {counts.total} • <strong>done:</strong> {counts.done}</div>
            <div className="mt-2"><strong>structural note:</strong> {structuralNote}</div>
          </div>

          <div className="mt-3 flex gap-2">
            <input className="px-2 py-1 border rounded flex-1" value={nextText} onChange={(e) => setNextText(e.target.value)} placeholder="todo text" />
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={addTodo}>Add</button>
            <button className="px-3 py-1 bg-rose-600 text-white rounded" onClick={() => { if (todos[0]) removeTodo(todos[0].id); }}>Remove first</button>
          </div>
        </div>

        {/* List & actions */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Todos</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {todos.map((t) => (
              <div key={t.id} className="p-2 border rounded flex items-center justify-between">
                <div>
                  <div className="font-medium">{t.text}</div>
                  <div className="text-xs text-slate-500">id: {t.id} • done: {String(t.done)}</div>
                  <div className="text-xs text-slate-400">tags: {(t.meta?.tags || []).join(", ")}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-amber-600 text-white rounded text-xs" onClick={() => toggleDone(t.id)}>{t.done ? "Undo" : "Done"}</button>
                  <button className="px-2 py-1 bg-green-600 text-white rounded text-xs" onClick={() => addTagToTodo(t.id, "x")}>+tag</button>
                  <button className="px-2 py-1 bg-slate-300 text-slate-900 rounded text-xs" onClick={() => updateTodoViaReducer(t.id, (old) => ({ ...old, text: old.text + " ✨" }))}>Annotate</button>
                </div>
              </div>
            ))}
            {todos.length === 0 && <div className="text-slate-500">no todos</div>}
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={markFirstDone}>Mark first done (index update)</button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={demoDeepCloneCaveat}>Replace via JSON clone</button>
            <button className="px-3 py-1 bg-pink-600 text-white rounded" onClick={freezeFirst}>Freeze first</button>
          </div>
        </div>

        {/* History & notes */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow md:col-span-2">
          <h3 className="font-semibold">History & Notes</h3>
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="mb-3"><strong>history length:</strong> {history.current.length}</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={undo}>Undo</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={clearHistory}>Clear history</button>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Tips</h4>
              <ul className="mt-2 text-xs">
                <li>Use shallow copies (spread / slice) and only replace objects that changed — preserves references for unchanged parts.</li>
                <li>Avoid deep cloning for large structures; prefer targeted nested updates to minimize copies.</li>
                <li>JSON clone loses functions/undefined and can be slow; use carefully for simple serializable data only.</li>
                <li>Use reducer pattern for complex update logic to centralize immutable transformations.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}