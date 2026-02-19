import type { JSX } from "react";
// import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NotFoundThree(): JSX.Element {
  const [table, setTable] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  function randomCellValue() {
    const words = [
      "Alpha",
      "Bravo",
      "Charlie",
      "Delta",
      "Echo",
      "42",
      "99",
      "Sky",
      "Sun",
      "Moon",
    ];
    return words[Math.floor(Math.random() * words.length)];
  }

  function randomizeTable() {
    setTable(
      Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => randomCellValue()),
      ),
    );
  }

  // Populate table on initial render
  useEffect(() => {
    randomizeTable();
  }, []);

  return (
    <section className="w-full p-2">
      <h2 className="text-2xl font-bold mb-4">Random Table Generator</h2>
      <button
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold shadow"
        onClick={randomizeTable}
      >
        Generate Random Table
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-[240px] w-full border border-slate-300 rounded shadow bg-white">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 border-b border-slate-300 text-left">
                Col 1
              </th>
              <th className="px-4 py-2 border-b border-slate-300 text-left">
                Col 2
              </th>
              <th className="px-4 py-2 border-b border-slate-300 text-left">
                Col 3
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2 border-b border-slate-200">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
