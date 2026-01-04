import type { JSX } from "react";
import { useMemo, useState } from "react";
// Importing named exports from our helper module demonstrates ES modules
import { greet, sum, createPerson, Learner } from "./jsLearningOneHelpers";

/**
 * Interactive demo component that showcases:
 * - let / const (scope & reassignment)
 * - arrow functions
 * - destructuring
 * - spread / rest
 * - modules (imports above)
 * - classes (Learner class)
 *
 * Plenty of inline comments explain each part for students.
 */
export default function JSFeaturesDemo(): JSX.Element {
  // React state holds UI values for interactivity
  const [name, setName] = useState<string>("Student");
  const [numbers, setNumbers] = useState<number[]>([1, 2, 3]);
  const [lastSum, setLastSum] = useState<number | null>(null);

  // classes: create a Learner instance and keep it in state for interactive methods
  const [learner] = useState(() => new Learner("Alex")); // single instance retained

  // let / const demo: using useMemo so values re-evaluate only when `name` changes
  const letConstDemo = useMemo(() => {
    // const binding — cannot be reassigned, but object properties can change
    const info = { message: greet(name) }; // greet imported from module (arrow fn)
    // let is block-scoped and can be reassigned
    let counter = 0;
    counter += 1; // valid with let
    return { info, counter };
  }, [name]);

  // Arrow function usage: local mapper
  const double = (n: number) => n * 2; // concise arrow function

  // Destructuring demo: take properties from an object
  const person = createPerson(name, 20); // uses module function
  const { name: personName, age: personAge } = person; // object destructuring

  // Array destructuring example
  const [firstNum, ...restNums] = numbers; // rest collects remaining items

  // Function demonstrating spread to append a number immutably
  function appendNumber(n: number) {
    // spread operator creates a new array with the new value appended
    setNumbers((prev) => [...prev, n]);
  }

  // Function demonstrating rest parameters and using imported `sum`
  function handleSum(...args: number[]) {
    // rest params gather arguments; spread could be used to forward arrays
    const result = sum(...args); // sum is a module-exported function
    setLastSum(result);
  }

  // Class interaction: advance the learner and force a re-render by updating dummy state
  const [, forceRerender] = useState(0);
  function advanceLearner() {
    // learner.advance mutates the instance internal state
    learner.advance(5); // call method from the imported class
    forceRerender((s) => s + 1); // update React state so UI reflects change
  }

  // Shared "filled" button baseline to avoid repeating long class strings.
  // You can tweak colors here to match your design system.
  const filledBtnBase =
    "px-3 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-offset-1";

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">JavaScript Features — Interactive Demo</h2>
        <p className="text-slate-600">
          Small, self-contained examples of modern JavaScript features with UI controls.
        </p>
      </header>

      {/* let / const + modules */}
      <div className="rounded-lg p-4 bg-white/90 shadow mb-4">
        <h3 className="font-semibold">let / const & modules</h3>
        <p className="text-sm text-slate-600">
          const binding for objects + let for reassignable variables. Greeting is
          provided by an imported arrow function (greet).
        </p>
        <div className="mt-2 flex gap-2 items-center">
          <input
            className="px-2 py-1 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Your name"
          />
          <div className="text-sm text-slate-700">
            <strong>const message:</strong> {letConstDemo.info.message}
            <br />
            <strong>let counter:</strong> {letConstDemo.counter}
          </div>
        </div>
      </div>

      {/* arrow functions + destructuring */}
      <div className="rounded-lg p-4 bg-white/90 shadow mb-4">
        <h3 className="font-semibold">Arrow Functions & Destructuring</h3>
        <p className="text-sm text-slate-600">
          Arrow functions provide concise syntax. Destructuring extracts values from objects/arrays.
        </p>

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-slate-700">
              <strong>Person (object destructured):</strong>
              <br />
              Name: {personName} — Age: {personAge}
            </div>
          </div>

          <div>
            <div className="text-sm text-slate-700">
              <strong>Array destructuring:</strong>
              <br />
              firstNum: {firstNum ?? "—"} — rest: [{restNums.join(", ")}]
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className={`${filledBtnBase} bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300`}
            onClick={() => setNumbers([1, 2, 3])}
          >
            Reset numbers
          </button>
          <button
            type="button"
            className={`${filledBtnBase} bg-slate-300 text-slate-900 border-slate-400 hover:bg-slate-400 focus:ring-slate-400`}
            onClick={() => appendNumber(double(numbers.length + 1))}
          >
            Append doubled index (uses arrow fn)
          </button>
        </div>
      </div>

      {/* spread / rest + sum example */}
      <div className="rounded-lg p-4 bg-white/90 shadow mb-4">
        <h3 className="font-semibold">Spread / Rest</h3>
        <p className="text-sm text-slate-600">
          Spread expands arrays/objects; rest gathers function args or remaining elements.
        </p>

        <div className="mt-2 text-sm text-slate-700">
          Current numbers: [{numbers.join(", ")}]
          <br />
          Last computed sum: {lastSum ?? "—"}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className={`${filledBtnBase} bg-amber-600 text-white border-amber-600 hover:bg-amber-700 focus:ring-amber-300`}
            onClick={() => handleSum(...numbers)} // spread to pass array items as separate args
          >
            Sum numbers (uses rest + module sum)
          </button>

          <button
            type="button"
            className={`${filledBtnBase} bg-slate-300 text-slate-900 border-slate-400 hover:bg-slate-400 focus:ring-slate-400`}
            onClick={() => setNumbers((prev) => [0, ...prev])} // spread used in setter above
          >
            Prepend zero (uses spread)
          </button>
        </div>
      </div>

      {/* classes */}
      <div className="rounded-lg p-4 bg-white/90 shadow">
        <h3 className="font-semibold">Classes</h3>
        <p className="text-sm text-slate-600">
          The Learner class (imported) encapsulates state and behavior. We call methods and show snapshots.
        </p>

        <div className="mt-2 text-sm text-slate-700">
          Learner snapshot: {JSON.stringify(learner.snapshot())}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className={`${filledBtnBase} bg-green-600 text-white border-green-600 hover:bg-green-700 focus:ring-green-300`}
            onClick={advanceLearner}
          >
            Advance learner by 5%
          </button>
          <button
            type="button"
            className={`${filledBtnBase} bg-slate-300 text-slate-900 border-slate-400 hover:bg-slate-400 focus:ring-slate-400`}
            onClick={() => {
              // debug: log before change
              console.log("learner before reset:", learner.snapshot ? learner.snapshot() : learner);

              // prefer calling a reset method if available, otherwise mutate
              if (typeof (learner as any).reset === "function") {
                (learner as any).reset();
              } else {
                (learner as any).progress = 0;
              }

              // debug: log after change
              console.log("learner after reset:", learner.snapshot ? learner.snapshot() : learner);

              // force a React render so the UI shows the updated instance state
              forceRerender((s) => s + 1);
            }}
          >
            Reset progress (direct mutate)
          </button>
        </div>
      </div>
    </section>
  );
}