import type { JSX } from "react";
import { useMemo, useState } from "react";

/**
 * Inheritance — Interactive Playground
 * - Demonstrates classical class inheritance in JS/TS:
 *   - base class, subclasses (extends)
 *   - method overriding and calling super()
 *   - static methods and properties
 *   - instanceof checks (runtime type)
 *   - polymorphism: treating subclasses as base type
 *
 * Interactive controls let students create instances, call methods, and inspect behavior.
 */

abstract class Creature {
  name: string;
  age: number;

  constructor(name: string, age = 0) {
    this.name = name;
    this.age = age;
  }

  // shared behavior — subclasses may override
  speak(): string {
    return `${this.name} makes a sound`;
  }

  birthday() {
    this.age += 1;
    return this.age;
  }

  toJSON() {
    return { type: "Creature", name: this.name, age: this.age };
  }
}

class Animal extends Creature {
  species: string;

  constructor(name: string, species: string, age = 0) {
    super(name, age);
    this.species = species;
  }

  // override speak but still call super.speak() as part of behavior
  speak(): string {
    return `${this.name} the ${this.species} says: ${super.speak()}`;
  }

  static info() {
    return "Animal: base subclass for many living creatures";
  }

  toJSON() {
    return { type: "Animal", name: this.name, species: this.species, age: this.age };
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed = "mixed", age = 0) {
    super(name, "dog", age);
    this.breed = breed;
  }

  // more specific override
  speak(): string {
    // call parent implementation for demo, then add subtype voice
    const parent = super.speak();
    return `${parent} — woof (breed: ${this.breed})`;
  }

  fetch(item: string) {
    return `${this.name} fetched the ${item}!`;
  }

  toJSON() {
    return { type: "Dog", name: this.name, species: this.species, breed: this.breed, age: this.age };
  }
}

class Cat extends Animal {
  indoor: boolean;

  constructor(name: string, indoor = true, age = 0) {
    super(name, "cat", age);
    this.indoor = indoor;
  }

  speak(): string {
    return `${this.name} purrs ${this.indoor ? "(indoors)" : "(outdoors)"}`;
  }

  climb() {
    return `${this.name} climbs a tree (or a curtain).`;
  }

  toJSON() {
    return { type: "Cat", name: this.name, species: this.species, indoor: this.indoor, age: this.age };
  }
}

export default function Inheritance(): JSX.Element {
  // hold instances in state as base type (polymorphism)
  const [instances, setInstances] = useState<Creature[]>(() => [
    new Dog("Rex", "Labrador", 3),
    new Cat("Mittens", true, 2),
  ]);
  const [log, setLog] = useState<string[]>([]);

  // helpers
  function addDog() {
    const d = new Dog(`Dog${instances.length + 1}`, "beagle", 0);
    setInstances((s) => [...s, d]);
    setLog((l) => [`added ${d.name} (Dog)`, ...l]);
  }

  function addCat() {
    const c = new Cat(`Cat${instances.length + 1}`, Math.random() > 0.5, 0);
    setInstances((s) => [...s, c]);
    setLog((l) => [`added ${c.name} (Cat)`, ...l]);
  }

  function ageAll() {
    // mutate instances in-place (demonstrates mutation) then replace array to trigger React update
    instances.forEach((it) => it.birthday());
    setInstances((s) => [...s]);
    setLog((l) => ["everyone had a birthday", ...l]);
  }

  function callSpeak(index: number) {
    const it = instances[index];
    const message = it.speak();
    setLog((l) => [`speak(${it.name}): ${message}`, ...l]);
  }

  function doSpecific(index: number) {
    const it = instances[index];
    // runtime type checks to demonstrate subclass methods
    if (it instanceof Dog) {
      setLog((l) => [`${it.fetch("ball")}`, ...l]);
    } else if (it instanceof Cat) {
      setLog((l) => [`${it.climb()}`, ...l]);
    } else {
      setLog((l) => [`${it.name} has no specific action`, ...l]);
    }
  }

  function rename(index: number) {
    const it = instances[index];
    it.name = `${it.name}_renamed`;
    setInstances((s) => [...s]);
    setLog((l) => [`renamed to ${it.name}`, ...l]);
  }

  function remove(index: number) {
    setInstances((s) => s.filter((_, i) => i !== index));
    setLog((l) => [`removed index ${index}`, ...l]);
  }

  const snapshot = useMemo(() => instances.map((i) => (i as any).toJSON ? (i as any).toJSON() : { name: i.name, age: i.age }), [instances]);

  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Inheritance — Interactive Playground</h2>
        <p className="text-slate-600">Explore extends, method overrides, super(), static members and instanceof checks.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Instances (polymorphic list)</h3>
          <p className="text-sm text-slate-600">The array holds Creature typed items — concrete subclasses provide specific behavior.</p>

          <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {instances.map((it, idx) => (
              <div key={idx} className="p-2 border rounded flex items-center justify-between">
                <div>
                  <div><strong>{it.name}</strong> <span className="text-xs text-slate-500">({it.constructor.name})</span></div>
                  <div className="text-xs">age: {(it as any).age}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-indigo-600 text-white rounded" onClick={() => callSpeak(idx)}>Speak</button>
                  <button className="px-2 py-1 bg-amber-600 text-white rounded" onClick={() => doSpecific(idx)}>Do</button>
                  <button className="px-2 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => rename(idx)}>Rename</button>
                  <button className="px-2 py-1 bg-rose-600 text-white rounded" onClick={() => remove(idx)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <button type="button" className="px-3 py-1 bg-green-600 text-white rounded" onClick={addDog}>Add Dog</button>
            <button type="button" className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={addCat}>Add Cat</button>
            <button type="button" className="px-3 py-1 bg-amber-600 text-white rounded" onClick={ageAll}>Age all</button>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-white/90 dark:bg-slate-800 shadow">
          <h3 className="font-semibold">Polymorphism & Inspection</h3>
          <p className="text-sm text-slate-600">Use instanceof to branch on concrete behavior; static methods describe classes.</p>

          <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
            <div><strong>Animal.info()</strong>: {Animal.info()}</div>
            <div className="mt-2"><strong>Snapshot:</strong>
              <pre className="bg-slate-50 dark:bg-slate-700 p-2 rounded text-xs mt-1">{JSON.stringify(snapshot, null, 2)}</pre>
            </div>
          </div>

          <div className="mt-3">
            <h4 className="font-semibold">Activity Log</h4>
            <div className="mt-2 text-xs bg-slate-50 dark:bg-slate-700 p-2 rounded max-h-40 overflow-auto">
              {log.length === 0 ? <div className="text-slate-500">No actions yet</div> : log.map((l, i) => <div key={i}>{l}</div>)}
            </div>

            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => setLog([])}>Clear log</button>
              <button className="px-3 py-1 bg-slate-300 text-slate-900 rounded" onClick={() => { console.log("instances", instances); alert("Instances logged to console"); }}>Log instances</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}