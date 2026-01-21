import { useReducer, useState } from "react";
import type { JSX } from "react";

type State = { count: number };
type Action =
  | { type: "increment"; by: number }
  | { type: "decrement"; by: number }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.by };
    case "decrement":
      return { count: state.count - action.by };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

export default function UseReducerPage(): JSX.Element {
  const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-2">useReducer demo</h2>

      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm">Step:</label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value) || 1)}
          className="w-20 border px-2 py-1 rounded"
        />
      </div>

      <p className="mb-4">Count: <strong>{state.count}</strong></p>

      <div className="flex gap-2 mb-4">
        <button onClick={() => dispatch({ type: "increment", by: step })} className="px-3 py-1 bg-indigo-600 text-white rounded">
          +{step}
        </button>
        <button onClick={() => dispatch({ type: "decrement", by: step })} className="px-3 py-1 bg-slate-200 rounded">
          -{step}
        </button>
        <button onClick={() => dispatch({ type: "reset" })} className="px-3 py-1 bg-red-500 text-white rounded">
          Reset
        </button>
      </div>

      <p className="text-sm text-slate-500">Placeholder: change the step and use the buttons to update state via reducer.</p>
    </main>
  );
}