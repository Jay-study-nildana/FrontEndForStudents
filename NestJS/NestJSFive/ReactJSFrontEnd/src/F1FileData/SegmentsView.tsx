import type { JSX } from "react";
import {
  drivers,
  dummyBestLap,
  dummyS1,
  dummyS2,
  dummyS3,
  dummyTyre,
} from "../DataF1/lapData";

// Dummy lapTime array (local)
const dummyLapTime = [
  "PIT",
  "PIT",
  "PIT",
  "2:01.404",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
  "PIT",
];

const rows = drivers.map((driver, i) => ({
  position: i + 1,
  driver: driver.toUpperCase().split(" ").pop(),
  bestLap: dummyBestLap[i] || "-",
  lapTime: dummyLapTime[i] || "-",
  s1: dummyS1[i] || "-",
  s2: dummyS2[i] || "-",
  s3: dummyS3[i] || "-",
  tyre: dummyTyre[i] || "-",
}));

export default function SegmentsView(): JSX.Element {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Segments</h2>
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
                LAP TIME
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                SECTOR 1
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                SECTOR 2
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                SECTOR 3
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                TYRE
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
                <td className="px-2 py-2 border-b border-slate-200 text-slate-600">
                  {row.lapTime}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-green-700 font-mono">
                  {row.s1}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-yellow-700 font-mono">
                  {row.s2}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-yellow-700 font-mono">
                  {row.s3}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {row.tyre}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
