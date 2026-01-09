import React from 'react';

type CounterProps = {
  initialCount?: number;
  label?: string;
};

export const Counter: React.FC<CounterProps> = ({ initialCount = 0, label = 'Counter' }) => {
  const [count, setCount] = React.useState<number>(initialCount);

  return (
    <div className="p-4 bg-white rounded shadow inline-block">
      <div className="mb-2 text-sm text-gray-500">{label}</div>

      <div className="flex items-center space-x-3">
        <span
          data-testid="count"
          aria-live="polite"
          className="text-2xl font-semibold text-gray-800"
        >
          {count}
        </span>

        <button
          type="button"
          aria-label="increment"
          onClick={() => setCount((c) => c + 1)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring"
        >
          +
        </button>
      </div>
    </div>
  );
};