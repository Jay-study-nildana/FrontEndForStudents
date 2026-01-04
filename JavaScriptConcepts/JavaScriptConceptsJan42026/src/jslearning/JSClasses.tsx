import type { JSX } from "react";
import { useMemo, useState } from "react";

/**
 * JavaScript Classes — Interactive Playground
 * - Demonstrates ES/TS class features: constructors, inheritance, static methods,
 *   getters/setters, instance methods, toJSON, instanceof, mutation vs immutable updates.
 * - Plenty of inline comments explain each example for students.
 */

class Person {
  // public fields
  name: string;
  age: number;
  active: boolean;

  constructor(name: string, age = 20) {
    this.name = name;
    this.age = age;
    this.active = true;
  }

  // instance method
  greet() {
    return `Hello, ${this.name}!`;
  }

  // getter
  get info() {
    return `${this.name} — ${this.age} yrs`;
  }

  // setter
  set rename(newName: string) {
    this.name = newName;
  }

  // toggle active flag
  toggleActive() {
    this.active = !this.active;
    return this.active;
  }

  // toJSON customizes JSON.stringify output
  toJSON() {
    return { name: this.name, age: this.age, active: this.active, type: "Person" };
  }
}

class Student extends Person {
  progress: number;

  constructor(name: string, age = 20, progress = 0) {
    super(name, age);
    this.progress = progress;
  }

  // advance method mutates internal state
  advance(percent = 10) {
    this.progress = Math.min(100, this.progress + percent);
    return this.progress;
  }

  // static factory to create Student from a Person instance
  static fromPerson(p: Person, progress = 0) {
    return new Student(p.name, p.age, progress);
  }

  // getter for status
  get status() {
    return `${this.name}: ${this.progress}%`;
  }

  toJSON() {
    // extend Person's toJSON and add progress
    const base = super.toJSON();
    return { ...base, progress: this.progress, type: "Student" };
  }
}

export default function Classes(): JSX.Element {
  // Manage a class instance in state (we'll show mutation vs replace)
  const [instance, setInstance] = useState<Person | Student>(() => new Person("Alex", 21));
  const [, forceRerender] = useState(0); // used when mutating instance in-place

  // Snapshot for display (immutable derived value to avoid stale UI when mutating)
  const snapshot = useMemo(() => {
    // prefer using toJSON if available
    // JSON.stringify/read roundtrip shows serializable view
    try {
      return JSON.parse(JSON.stringify(instance));
    } catch {
      return { name: (instance as any).name ?? "?", info: (instance as any).info ?? "?" };
    }
  }, [instance]);

  // Helpers for UI actions

  function createPerson() {
    setInstance(new Person("Sam", 30));
  }

  function createStudent() {
    setInstance(new Student("Taylor", 22, 15));
  }

  function promoteToStudent() {
    // replace with a new Student instance created from current Person
    setInstance((cur) => (cur instanceof Student ? cur : Student.fromPerson(cur as Person, 10)));
  }

  function advanceProgressByMutate() {
    // mutating the instance directly — React won't re-render unless we trigger it
    if (instance instanceof Student) {
      instance.advance(10); // mutates internal state
      forceRerender((s) => s + 1); // force UI update
    } else {
      // if not a Student, replace with a Student and show progress
      setInstance((cur) => Student.fromPerson(cur as Person, 10));
    }
  }

  function advanceProgressByReplace() {
    // immutable pattern: create a new instance and replace state
    if (instance instanceof Student) {
      const next = new Student(instance.name, instance.age, Math.min(100, instance.progress + 10));
      next.active = instance.active;
      setInstance(next);
    } else {
      setInstance((cur) => Student.fromPerson(cur as Person, 10));
    }
  }

  function renameInstance(newName: string) {
    // demonstrate setter
    if (instance) {
      (instance as any).rename = newName;
      forceRerender((s) => s + 1);
    }
  }

  function toggleActive() {
    instance.toggleActive();
    forceRerender((s) => s + 1);
  }

  function logPrototypeMethods() {
    // show methods available on the prototype chain
    // this helps students inspect inheritance/prototype behavior
    // eslint-disable-next-line no-console
    console.log("prototype chain methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(instance)));
    // eslint-disable-next-line no-console
    console.log("instance:", instance);
    alert("Prototype methods logged to console");
  }

  function reset() {
    setInstance(new Person("Alex", 21));
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">JavaScript Classes — Interactive Playground</h2>
        <p className="text-slate-600">
          Explore classes, inheritance, static methods, getters/setters, mutation vs replacement.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Instance overview */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Instance Snapshot</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Serializable view of the current instance (uses toJSON).</p>

          <div className="mt-3">
            <pre className="bg-slate-50 dark:bg-slate-700 p-3 rounded text-xs">{JSON.stringify(snapshot, null, 2)}</pre>
          </div>

          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700" onClick={createPerson}>
              New Person
            </button>
            <button type="button" className="px-3 py-1 bg-amber-600 text-white border border-amber-600 rounded hover:bg-amber-700" onClick={createStudent}>
              New Student
            </button>
            <button type="button" className="px-3 py-1 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700" onClick={promoteToStudent}>
              Promote to Student
            </button>
          </div>
        </div>

        {/* Class behaviors */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Behaviors & Methods</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Try mutating the instance in-place vs replacing it immutably.</p>

          <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>Greet:</strong> {(instance as any).greet ? (instance as any).greet() : "—"}
            </div>
            <div>
              <strong>Info/getter:</strong> {(instance as any).info ?? "—"}
            </div>
            <div>
              <strong>Type check:</strong> {instance instanceof Student ? "Student" : "Person"}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700" onClick={advanceProgressByMutate}>
              Advance (mutate)
            </button>
            <button type="button" className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700" onClick={advanceProgressByReplace}>
              Advance (replace)
            </button>
            <button type="button" className="px-3 py-1 bg-slate-300 text-slate-900 border border-slate-400 rounded hover:bg-slate-400" onClick={() => renameInstance("Pat")}>
              Rename to Pat
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-amber-600 text-white border border-amber-600 rounded hover:bg-amber-700" onClick={toggleActive}>
              Toggle active
            </button>
            <button type="button" className="px-3 py-1 bg-slate-300 text-slate-900 border border-slate-400 rounded hover:bg-slate-400" onClick={logPrototypeMethods}>
              Inspect prototype
            </button>
            <button type="button" className="px-3 py-1 bg-rose-600 text-white border border-rose-600 rounded hover:bg-rose-700" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        {/* Teaching notes */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow md:col-span-2">
          <h3 className="font-semibold">Notes & Tips</h3>
          <ul className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Prefer composition over inheritance for most application logic.</li>
            <li>Mutating class instances works, but React reactivity prefers replacing state with new values.</li>
            <li>Use toJSON to control serialization when sending instances to JSON.stringify.</li>
            <li>Static methods are useful for factories or utilities related to the class.</li>
            <li>Use instanceof to perform runtime type checks when classes are used across boundaries.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
