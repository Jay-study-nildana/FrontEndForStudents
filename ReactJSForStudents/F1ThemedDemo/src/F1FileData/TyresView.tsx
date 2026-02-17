import { drivers, dummyBestLap } from "../DataF1/lapData";
import { type JSX } from "react";

// Placeholder arrays for missing columns
const dummyCurrent = [
  "H",
  "S",
  "M",
  "S",
  "M",
  "M",
  "H",
  "S",
  "S",
  "H",
  "S",
  "M",
  "H",
  "S",
  "M",
  "H",
  "S",
  "M",
  "S",
  "H",
  "M",
  "S",
];
const dummyStint = [
  6, 2, 5, 2, 1, 2, 6, 1, 5, 1, 1, 5, 1, 6, 2, 5, 6, 1, 5, 1, 1, 5,
];
const dummyTotal = [
  11, 27, 13, 20, 13, 11, 30, 16, 30, 10, 10, 16, 10, 11, 27, 13, 11, 10, 16,
  10, 10, 16,
];
const dummyLaps = [
  11, 8, 6, 6, 2, 3, 1, 3, 1, 2, 2, 3, 2, 3, 8, 6, 3, 2, 3, 2, 2, 3,
];
const dummyPrevious = [
  4, 4, 1, 3, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 4, 1, 1, 0, 1, 0, 0, 1,
];

const rows = drivers.map((driver, i) => ({
  position: i + 1,
  driver: driver.toUpperCase().split(" ").pop(),
  bestLap: dummyBestLap[i] || "-",
  current: dummyCurrent[i] || "-",
  stint: dummyStint[i] ? dummyStint[i].toString() : "-",
  total: dummyTotal[i] ? dummyTotal[i].toString() : "-",
  laps: dummyLaps[i] ? dummyLaps[i].toString() : "-",
  previous: dummyPrevious[i] ? dummyPrevious[i].toString() : "-",
}));

export default function TyresView(): JSX.Element {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tyres</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border border-slate-300 rounded shadow bg-white text-xs">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                POSITION
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                DRIVER
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                BEST LAP
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                CURRENT
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                STINT
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                TOTAL
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                LAPS
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                PREVIOUS
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                <td className="px-2 py-2 border-b border-slate-200 font-semibold text-slate-800">
                  {row.position}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 font-bold text-red-600 uppercase">
                  {row.driver}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-purple-600 font-mono">
                  {row.bestLap}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {row.current}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {row.stint}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {row.total}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {row.laps}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {row.previous}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
