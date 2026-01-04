// Helper module showing exported utilities and a class (used to demo "modules" + "classes")

// Named export: a simple arrow function
export const greet = (name: string): string => `Hello, ${name}!`;

// Named export: a rest-parameter function demonstrating spread/rest
export function sum(...nums: number[]): number {
  // rest collects an arbitrary number of args into an array
  return nums.reduce((acc, n) => acc + n, 0);
}

// Named export: returns a plain object (used to demo destructuring)
export function createPerson(name: string, age: number) {
  return { name, age, createdAt: new Date().toISOString() };
}

// Exported class to demonstrate ES class syntax and instances
export class Learner {
  name: string;
  progress: number;

  constructor(name: string) {
    this.name = name;
    this.progress = 0;
  }

  // method to advance progress (mutable instance method)
  advance(percent = 10) {
    this.progress = Math.min(100, this.progress + percent);
    return this.progress;
  }

  // method that returns a snapshot (pure-ish)
  snapshot() {
    return { name: this.name, progress: this.progress };
  }
}