import type { JSX } from "react";
import { useMemo, useState } from "react";

/**
 * Prototypes — Interactive Playground
 * - Demonstrates JavaScript prototype-based inheritance and related patterns:
 *   - constructor functions + prototype methods
 *   - Object.create and prototype chains
 *   - shared mutable prototype properties (pitfall)
 *   - hasOwnProperty vs inherited properties
 *   - Object.getPrototypeOf / Object.setPrototypeOf
 *   - deleting own properties to fall back to prototype values
 *
 * Inline comments and small interactive controls help students experiment.
 */
export default function Prototypes(): JSX.Element {
  // ---- Constructor-function + prototype example ----
  // Classic function constructor (pre-ES6 class style)
  function Car(this: any, make: string, model: string) {
    // own properties set per-instance
    this.make = make;
    this.model = model;
    // avoid putting arrays/objects on prototype if mutability is not desired
    this.ownNotes = [];
  }
  // prototype method shared by all instances
  (Car as any).prototype.info = function () {
    return `${this.make} ${this.model}`;
  };
  // shared (pitfall) prototype property (array) — demonstrates shared mutation
  (Car as any).prototype.sharedTags = [] as string[];

  // ---- Object.create example ----
  const protoBase = {
    kind: "base",
    describe() {
      return `kind:${this.kind}`;
    },
  };

  // React state to hold examples and logs
  const [carA, setCarA] = useState<any>(
    () => new (Car as any)("Toyota", "Corolla")
  );
  const [carB, setCarB] = useState<any>(
    () => new (Car as any)("Honda", "Civic")
  );
  const [objC, setObjC] = useState(() =>
    Object.create(protoBase, {
      name: { value: "objC", writable: true, enumerable: true },
    })
  );
  const [log, setLog] = useState<string[] | null>([]);
  const [sharedTag, setSharedTag] = useState<string>("star");

  // helpers to inspect an object (own keys + prototype keys)
  function inspect(o: any) {
    const own = Object.keys(o);
    const proto = Object.getPrototypeOf(o)
      ? Object.getOwnPropertyNames(Object.getPrototypeOf(o))
      : [];
    return { own, proto };
  }

  // add a shared tag to prototype array (demonstrates pitfall)
  function addSharedTag(tag: string) {
    (Car as any).prototype.sharedTags.push(tag);
    setLog((l) => [
      ...(l || []),
      `added shared tag "${tag}" to Car.prototype.sharedTags`,
    ]);
    // force update by shallow-replacing state references
    setCarA({ ...carA });
    setCarB({ ...carB });
  }

  // add an own note to a car instance (safe)
  function addOwnNote(target: "A" | "B") {
    if (target === "A") {
      carA.ownNotes.push(`note@${Date.now()}`);
      setCarA({ ...carA });
      setLog((l) => [...(l || []), "added own note to carA"]);
    } else {
      carB.ownNotes.push(`note@${Date.now()}`);
      setCarB({ ...carB });
      setLog((l) => [...(l || []), "added own note to carB"]);
    }
  }

  // add an own property that shadows prototype property, then delete it to see fallback
  function shadowThenDelete() {
    carA.kind = "shadowed";
    setCarA({ ...carA });
    setLog((l) => [
      ...(l || []),
      "set carA.kind (own) to 'shadowed' — shadows prototype if present",
    ]);
    // delete after short delay to demonstrate fallback
    setTimeout(() => {
      delete carA.kind;
      setCarA({ ...carA });
      setLog((l) => [
        ...(l || []),
        "deleted carA.kind — fallback to prototype -if exists now visible",
      ]);
    }, 1000);
  }

  // change objC prototype at runtime
  function swapProto() {
    const newProto = {
      kind: "swapped",
      describe(): string {
        return `SWAPPED→${(this as any).name}`;
      },
    };
    Object.setPrototypeOf(objC, newProto);
    setObjC({ ...objC });
    setLog((l) => [...(l || []), "objC prototype swapped"]);
  }

  // inspect outputs for UI
  const aInspect = useMemo(() => inspect(carA), [carA]);
  const cInspect = useMemo(
    () => ({
      own: Object.keys(objC),
      proto: Object.getPrototypeOf(objC)
        ? Object.getOwnPropertyNames(Object.getPrototypeOf(objC))
        : [],
    }),
    [objC]
  );

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">
          Prototypes — Interactive Playground
        </h2>
        <p className="text-slate-600">
          Explore prototype chains, shared prototype properties, Object.create,
          and runtime prototype manipulation.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Constructor + prototype */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Constructor function & prototype</h3>
          <p className="text-sm text-slate-600">
            Methods on prototype are shared; mutable properties on prototype are
            shared by all instances (usually a pitfall).
          </p>

          <div className="mt-3 text-sm text-slate-700">
            <div>
              <strong>carA.info():</strong>{" "}
              {(carA as any).info ? (carA as any).info() : "—"}
            </div>
            <div>
              <strong>carB.info():</strong>{" "}
              {(carB as any).info ? (carB as any).info() : "—"}
            </div>
            <div className="mt-2">
              <strong>Car.prototype.sharedTags:</strong>{" "}
              {(Car as any).prototype.sharedTags.join(", ") || "—"}
            </div>
            <div>
              <strong>carA.ownNotes:</strong> [
              {(carA.ownNotes || []).join(", ")}]
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <input
              className="px-2 py-1 border rounded"
              value={sharedTag}
              onChange={(e) => setSharedTag(e.target.value)}
            />
            <button
              type="button"
              className="px-3 py-1 bg-amber-600 text-white rounded border border-amber-600"
              onClick={() => addSharedTag(sharedTag)}
            >
              Add shared tag
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-indigo-600 text-white rounded border border-indigo-600"
              onClick={() => addOwnNote("A")}
            >
              Add own note → A
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-green-600 text-white rounded border border-green-600"
              onClick={() => addOwnNote("B")}
            >
              Add own note → B
            </button>
          </div>

          <div className="mt-3 text-xs">
            <div>
              <strong>carA keys:</strong> {aInspect.own.join(", ") || "—"}
            </div>
            <div>
              <strong>carA proto keys:</strong>{" "}
              {aInspect.proto.join(", ") || "—"}
            </div>
          </div>
        </div>

        {/* Object.create and prototype manipulation */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">
            Object.create & runtime prototype ops
          </h3>
          <p className="text-sm text-slate-600">
            Object.create builds objects with a specific prototype. You can swap
            prototypes at runtime with Object.setPrototypeOf.
          </p>

          <div className="mt-3 text-sm text-slate-700">
            <div>
              <strong>objC.name:</strong> {String((objC as any).name)}
            </div>
            <div>
              <strong>objC.describe():</strong>{" "}
              {typeof (objC as any).describe === "function"
                ? (objC as any).describe()
                : "—"}
            </div>
            <div className="mt-2">
              <strong>objC own keys:</strong> {cInspect.own.join(", ")}
            </div>
            <div>
              <strong>objC proto keys:</strong> {cInspect.proto.join(", ")}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-indigo-600 text-white rounded border border-indigo-600"
              onClick={() => {
                setObjC(
                  Object.create(protoBase, {
                    name: { value: "objC", writable: true, enumerable: true },
                  })
                );
                setLog((l) => [
                  ...(l || []),
                  "reset objC prototype to protoBase",
                ]);
              }}
            >
              Reset protoBase
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-amber-600 text-white rounded border border-amber-600"
              onClick={swapProto}
            >
              Swap prototype
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-rose-600 text-white rounded border border-rose-600"
              onClick={shadowThenDelete}
            >
              Shadow then delete
            </button>
          </div>

          <div className="mt-3 text-xs">
            <div>
              <strong>protoBase keys:</strong>{" "}
              {Object.getOwnPropertyNames(protoBase).join(", ")}
            </div>
            <div>
              <strong>getPrototypeOf(objC):</strong>{" "}
              {String(
                Object.getPrototypeOf(objC) === protoBase
                  ? "protoBase"
                  : "other"
              )}
            </div>
          </div>
        </div>

        {/* Teaching notes & logs */}
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow md:col-span-2">
          <h3 className="font-semibold">Notes & Tips</h3>
          <ul className="mt-2 text-sm text-slate-700">
            <li>
              Prototype methods are shared — best for stateless functions.
            </li>
            <li>
              Avoid placing mutable objects (arrays/objects) on prototype; every
              instance sees the same reference.
            </li>
            <li>
              Use hasOwnProperty to check if a property is own vs inherited:
              obj.hasOwnProperty("x").
            </li>
            <li>
              Object.getPrototypeOf and Object.setPrototypeOf let you
              inspect/change the prototype chain at runtime.
            </li>
            <li>
              ES6 classes use prototypes under the hood; prototypes are the
              fundamental mechanism.
            </li>
          </ul>

          <div className="mt-4">
            <h4 className="font-semibold">Activity log</h4>
            <div className="mt-2 text-xs bg-slate-50 dark:bg-slate-700 p-2 rounded max-h-40 overflow-auto">
              {(log || []).length === 0 ? (
                <div className="text-slate-500">No actions yet</div>
              ) : (
                (log || []).map((l, i) => <div key={i}>{l}</div>)
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="px-3 py-1 bg-slate-300 text-slate-900 rounded border border-slate-400"
                onClick={() => setLog([])}
              >
                Clear log
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-slate-300 text-slate-900 rounded border border-slate-400"
                onClick={() => {
                  console.log("carA", carA, "carB", carB, "objC", objC);
                  alert("Objects logged to console");
                }}
              >
                Log instances
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
