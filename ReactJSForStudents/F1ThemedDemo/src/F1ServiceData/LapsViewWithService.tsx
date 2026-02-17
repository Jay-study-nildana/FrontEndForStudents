import type { JSX } from "react";
import { useEffect, useState } from "react";
import * as LapDataService from "../DataF1/LapDataService";
import FieldLoader from "../Utils/FieldLoader";


export default function LapsView(): JSX.Element {
  const [drivers, setDrivers] = useState<string[]>([]);
  const [bestLap, setBestLap] = useState<string[]>([]);
  const [gap, setGap] = useState<string[]>([]);
  const [s1, setS1] = useState<string[]>([]);
  const [s2, setS2] = useState<string[]>([]);
  const [s3, setS3] = useState<string[]>([]);
  const [tyre, setTyre] = useState<string[]>([]);
  const [loading, setLoading] = useState({
    drivers: true,
    bestLap: true,
    gap: true,
    s1: true,
    s2: true,
    s3: true,
    tyre: true,
  });

  useEffect(() => {
    LapDataService.getDrivers().then((data) => {
      setDrivers(data);
      setLoading((l) => ({ ...l, drivers: false }));
    });
    LapDataService.getBestLap().then((data) => {
      setBestLap(data);
      setLoading((l) => ({ ...l, bestLap: false }));
    });
    LapDataService.getGap().then((data) => {
      setGap(data);
      setLoading((l) => ({ ...l, gap: false }));
    });
    LapDataService.getS1().then((data) => {
      setS1(data);
      setLoading((l) => ({ ...l, s1: false }));
    });
    LapDataService.getS2().then((data) => {
      setS2(data);
      setLoading((l) => ({ ...l, s2: false }));
    });
    LapDataService.getS3().then((data) => {
      setS3(data);
      setLoading((l) => ({ ...l, s3: false }));
    });
    LapDataService.getTyre().then((data) => {
      setTyre(data);
      setLoading((l) => ({ ...l, tyre: false }));
    });
  }, []);

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
            {Array.from({ length: 22 }).map((_, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                <td className="px-2 py-2 border-b border-slate-200 font-semibold text-slate-800">
                  {idx + 1}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 font-bold text-red-600 uppercase">
                  {loading.drivers || !drivers[idx] ? (
                    <CellLoader />
                  ) : (
                    drivers[idx]?.toUpperCase().split(" ").pop() || "-"
                  )}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-purple-600 font-mono">
                  {loading.bestLap || !bestLap[idx] ? (
                    <CellLoader />
                  ) : (
                    bestLap[idx] || "-"
                  )}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-600">
                  {loading.gap || !gap[idx] ? <CellLoader /> : gap[idx] || ""}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-green-700 font-mono">
                  {loading.s1 || !s1[idx] ? <CellLoader /> : s1[idx] || "-"}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-yellow-700 font-mono">
                  {loading.s2 || !s2[idx] ? <CellLoader /> : s2[idx] || "-"}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-yellow-700 font-mono">
                  {loading.s3 || !s3[idx] ? <CellLoader /> : s3[idx] || "-"}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {loading.tyre || !tyre[idx] ? (
                    <CellLoader />
                  ) : (
                    tyre[idx] || "-"
                  )}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {/* LAPS column placeholder */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Minimalistic cell loader component
// function CellLoader() {
//   return (
//     <span
//       className="inline-block w-4 h-4 animate-pulse bg-slate-200 rounded"
//       style={{ verticalAlign: "middle" }}
//     >
//       {/* XXX */}
//     </span>
//   );
// }

function CellLoader() {
  return (
    <FieldLoader />
  );
}
