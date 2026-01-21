import type { JSX } from "react";
import { useMemo, useState } from "react";

/**
 * Destructuring
 * - Interactive playground demonstrating object & array destructuring patterns:
 *   - basic extraction, renaming, defaults
 *   - nested destructuring
 *   - rest in objects/arrays
 *   - swapping with array destructuring
 *   - parameter destructuring
 *   - combining destructuring with spread to produce new values (immutability)
 *
 * Plenty of inline comments and controls so students can try patterns live.
 */
export default function Destructuring(): JSX.Element {
  // Example object with nested structure and arrays
  const [person, setPerson] = useState({
    name: "Sam",
    age: 25,
    nickname: undefined as string | undefined,
    address: { city: "Seattle", zip: "98101" },
    skills: ["JavaScript", "React", "CSS"],
  });

  // Simple numeric pair used to demonstrate swapping via array destructuring
  const [pair, setPair] = useState<[number, number]>([10, 20]);

  // Local inputs to demonstrate building new objects/arrays with spread + destructuring
  const [newCity, setNewCity] = useState("Portland");
  const [addedSkill, setAddedSkill] = useState("TypeScript");

  // ----- Derived values using destructuring -----
  // Basic object destructuring with renaming and default value for nickname
  const { name: personName, age: personAge, nickname = "—" } = person;

  // Nested destructuring: pull city from address
  const {
    address: { city: personCity, zip: personZip },
  } = person;

  // Object rest: gather remaining fields after extracting name
  const { name: extractedName, ...personRest } = person;

  // Array destructuring: first skill and the rest of skills
  const [firstSkill, ...otherSkills] = person.skills;

  // Swap demonstration using destructuring
  const swapPair = () => {
    // array destructuring swap
    const [a, b] = pair;
    setPair([b, a]);
  };

  // Update nested value immutably using spread (common pattern with destructuring)
  function updateCity() {
    setPerson((prev) => ({
      ...prev,
      address: { ...prev.address, city: newCity }, // nested spread
    }));
  }

  // Add a skill immutably using spread for arrays
  function addSkill() {
    setPerson((prev) => ({ ...prev, skills: [...prev.skills, addedSkill] }));
    setAddedSkill("");
  }

  // Remove first skill using array destructuring + spread
  function removeFirstSkill() {
    const [, ...rest] = person.skills; // skip first
    setPerson((p) => ({ ...p, skills: rest }));
  }

  // Parameter destructuring example: function accepts a destructured object
  const brief = ({ name, age }: { name: string; age: number }) => `${name} — ${age} yrs`;

  // Show a code-like example for teaching: returning an object literal from concise arrow
  const exampleReturnObject = useMemo(
    () => `() => ({ name: "${person.name}", city: "${person.address.city}" })`,
    [person.name, person.address.city]
  );

  // Reset demo data to original
  function resetDemo() {
    setPerson({
      name: "Sam",
      age: 25,
      nickname: undefined,
      address: { city: "Seattle", zip: "98101" },
      skills: ["JavaScript", "React", "CSS"],
    });
    setPair([10, 20]);
    setNewCity("Portland");
    setAddedSkill("TypeScript");
  }

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Destructuring — Interactive Playground</h2>
        <p className="text-slate-600">
          Hands-on examples of object & array destructuring. Try the controls to mutate state immutably.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Object basics */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Object Destructuring</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Extract fields, rename them, and provide defaults.
          </p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>person.name (renamed):</strong> {personName}
            </div>
            <div>
              <strong>person.age:</strong> {personAge}
            </div>
            <div>
              <strong>nickname (default):</strong> {nickname}
            </div>
            <div className="mt-2">
              <strong>address.city (nested destructuring):</strong> {personCity}
            </div>
            <div>
              <strong>address.zip:</strong> {personZip}
            </div>

            <div className="mt-3">
              <strong>Remaining object after extracting name:</strong>
              <pre className="bg-slate-50 dark:bg-slate-700 p-2 rounded text-xs mt-1">
                {JSON.stringify(personRest, null, 2)}
              </pre>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
              onClick={() => setPerson((p) => ({ ...p, nickname: "Sammy" }))}
            >
              Set nickname
            </button>

            <button
              type="button"
              className="px-3 py-1 bg-amber-600 text-white border border-amber-600 rounded hover:bg-amber-700"
              onClick={() => setPerson((p) => ({ ...p, nickname: undefined }))}
            >
              Clear nickname
            </button>
          </div>
        </div>

        {/* Array destructuring */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Array Destructuring</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">First/rest, swapping, and immutably updating arrays.</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong>skills:</strong> [{person.skills.join(", ")}]
            </div>
            <div>
              <strong>firstSkill:</strong> {firstSkill ?? "—"}
            </div>
            <div>
              <strong>otherSkills (rest):</strong> [{otherSkills.join(", ")}]
            </div>

            <div className="mt-2">
              <strong>pair:</strong> [{pair.join(", ")}]
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-green-600 text-white border border-green-600 rounded hover:bg-green-700"
              onClick={swapPair}
            >
              Swap pair
            </button>

            <button
              type="button"
              className="px-3 py-1 bg-slate-300 text-slate-900 border border-slate-400 rounded hover:bg-slate-400"
              onClick={removeFirstSkill}
            >
              Remove first skill
            </button>

            <div className="flex items-center gap-2">
              <input
                className="px-2 py-1 border rounded"
                value={addedSkill}
                onChange={(e) => setAddedSkill(e.target.value)}
                placeholder="new skill"
              />
              <button
                type="button"
                className="px-3 py-1 bg-amber-600 text-white border border-amber-600 rounded hover:bg-amber-700"
                onClick={addSkill}
              >
                Add skill
              </button>
            </div>
          </div>
        </div>

        {/* Immutability & parameter destructuring */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Immutability & Parameter Destructuring</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Use spread + destructuring to create updated objects; accept destructured params in functions.
          </p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <label className="block">
              New city:
              <input
                className="ml-2 px-2 py-1 border rounded"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
              />
            </label>

            <div className="mt-2">
              <strong>brief(person) via parameter destructuring:</strong> {brief({ name: person.name, age: person.age })}
            </div>

            <div className="mt-2">
              <strong>Example concise arrow returning object:</strong>
              <div className="mt-1 text-xs bg-slate-50 dark:bg-slate-700 p-2 rounded">{exampleReturnObject}</div>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded hover:bg-indigo-700"
              onClick={updateCity}
            >
              Update city (immutable)
            </button>

            <button
              type="button"
              className="px-3 py-1 bg-slate-300 text-slate-900 border border-slate-400 rounded hover:bg-slate-400"
              onClick={() => setPerson((p) => ({ ...p, age: p.age + 1 }))}
            >
              Increment age
            </button>
          </div>
        </div>

        {/* Teaching notes */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Notes & Tips</h3>
          <ul className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Destructuring simplifies extraction of multiple properties in a single expression.</li>
            <li>Provide defaults to avoid undefined: const { `a = 1` } = obj</li>
            <li>Use rest (...) to gather remaining properties or items.</li>
            <li>Combine destructuring with spread for immutable updates: {`{ ...obj, nested: { ...obj.nested, x: 1 } }`}</li>
            <li>Array destructuring can swap values without a temp variable: [a, b] = [b, a]</li>
          </ul>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-rose-600 text-white border border-rose-600 rounded hover:bg-rose-700"
              onClick={resetDemo}
            >
              Reset demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}