import type { JSX } from "react";

import {
  drivers,
  dummyBestLap,
  dummyGap,
  dummyS1,
  dummyS2,
  dummyS3,
  dummyTyre,
} from "../DataF1/lapData";


const rows = drivers.map((driver, i) => ({
  position: i + 1,
  driver: driver.toUpperCase().split(" ").pop(), // Use last name in uppercase for table
  bestLap: dummyBestLap[i] || "-",
  gap: dummyGap[i] || "",
  s1: dummyS1[i] || "-",
  s2: dummyS2[i] || "-",
  s3: dummyS3[i] || "-",
  tyre: dummyTyre[i] || "-",
  //   laps: dummyLaps[i] ? dummyLaps[i].toString() : "-",
}));

export default function LapsView(): JSX.Element {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Laps</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full border border-slate-300 rounded shadow bg-white">
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
                GAP
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                S1
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                S2
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                S3
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                TYRE
              </th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">
                LAPS
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
                  {row.gap}
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
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {/* {row.laps} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
