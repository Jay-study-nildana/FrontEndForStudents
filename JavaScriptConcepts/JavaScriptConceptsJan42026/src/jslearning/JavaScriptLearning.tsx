import type { JSX } from "react";
import { Link } from "react-router-dom";

export default function JavaScriptLearning(): JSX.Element {
  return (
    <section className="prose lg:prose-xl p-6">
      <header className="mb-6">
        <h2 className="text-4xl font-extrabold">JavaScript Learning</h2>
        <p className="text-slate-600">
          A lightweight landing page for students learning modern JavaScript and
          DOM APIs with practical exercises.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-1">
        {/* <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold text-lg">Core Topics</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>JavaScript fundamentals: variables, types, scope</li>
            <li>ES6+ features: arrow functions, modules, destructuring</li>
            <li>Asynchronous JS: promises, async/await, fetch</li>
            <li>DOM manipulation and event handling</li>
          </ul>
        </div> */}

        <div className="rounded-lg p-6 bg-gradient-to-tr from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 shadow">
          <h3 className="font-semibold text-lg">Get hands-on</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Try short exercises, small projects, and interactive code challenges
            to build confidence.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              to="/js-learning/one"
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            >
                JS Essentials One
            </Link>
            <Link
                to="/js-learning/arrow-functions"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Arrow Functions 
            </Link>
            <Link
                to="/js-learning/destructuring"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Destructuring
            </Link>
            <Link
                to="/js-learning/spread-operator"
                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                >
                Spread Operator
            </Link>
            <Link
                to="/js-learning/rest-operator"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                Rest Operator
            </Link>
            <Link
                to="/js-learning/classes"
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                JS Classes
            </Link>
          </div>
        </div>
        
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {/* <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold text-lg">Core Topics</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>JavaScript fundamentals: variables, types, scope</li>
            <li>ES6+ features: arrow functions, modules, destructuring</li>
            <li>Asynchronous JS: promises, async/await, fetch</li>
            <li>DOM manipulation and event handling</li>
          </ul>
        </div> */}

        <div className="rounded-lg p-6 bg-gradient-to-tr from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 shadow">
          <h3 className="font-semibold text-lg">Get hands-on</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Try short exercises, small projects, and interactive code challenges
            to build confidence.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
                to="/js-learning/prototypes"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                Prototypes
            </Link>
            <Link
                to="/js-learning/inheritance"
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                Inheritance
            </Link>
            <Link
                to="/js-learning/closures"
                className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700"
                >
                Closures
            </Link>
            <Link
                to="/js-learning/execution-context"
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
                >
                Execution Context
            </Link>
            <Link
                to="/js-learning/bind-call-apply"
                className="px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700"
                >
                Bind / Call / Apply
            </Link>
            <Link
                to="/js-learning/arrays"
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                Arrays
            </Link>
            <Link
                to="/js-learning/maps"
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                Maps
            </Link>
          </div>
        </div>
        
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {/* <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold text-lg">Core Topics</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>JavaScript fundamentals: variables, types, scope</li>
            <li>ES6+ features: arrow functions, modules, destructuring</li>
            <li>Asynchronous JS: promises, async/await, fetch</li>
            <li>DOM manipulation and event handling</li>
          </ul>
        </div> */}

        <div className="rounded-lg p-6 bg-gradient-to-tr from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 shadow">
          <h3 className="font-semibold text-lg">Get hands-on</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Try short exercises, small projects, and interactive code challenges
            to build confidence.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
                to="/js-learning/prototypes"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                Prototypes
            </Link>
            <Link
                to="/js-learning/sets"
                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                >
                Sets
            </Link>
            <Link
                to="/js-learning/map-filter-reduce"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                Map • Filter • Reduce
            </Link>
            <Link
                to="/js-learning/immutability"
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                Immutability
            </Link>

          </div>
        </div>
        
      </div>            

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-800 shadow">
          <h4 className="font-semibold">Practice</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Short exercises with feedback.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-800 shadow">
          <h4 className="font-semibold">Reference</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Links to docs and examples.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-white/90 dark:bg-slate-800 shadow">
          <h4 className="font-semibold">Assessment</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Small projects to evaluate progress.
          </p>
        </div>
      </div>
    </section>
  );
}