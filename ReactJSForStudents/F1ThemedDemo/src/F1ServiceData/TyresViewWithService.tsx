import type { JSX } from "react";
import { useEffect, useState } from "react";
import * as LapDataService from "../DataF1/LapDataService";
import FieldLoader from "../Utils/FieldLoader";

export default function TyresView(): JSX.Element {
  const [drivers, setDrivers] = useState<string[]>([]);
  const [tyre, setTyre] = useState<string[]>([]);
  const [currentLap, setCurrentLap] = useState<string[]>([]);
  const [bestLap, setBestLap] = useState<string[]>([]);
  const [loading, setLoading] = useState({
    drivers: true,
    tyre: true,
    currentLap: true,
    bestLap: true,
  });

  useEffect(() => {
    LapDataService.getDrivers().then((data) => {
      setDrivers(data);
      setLoading((l) => ({ ...l, drivers: false }));
    });
    LapDataService.getTyre().then((data) => {
      setTyre(data);
      setLoading((l) => ({ ...l, tyre: false }));
    });
    LapDataService.getCurrentLap().then((data) => {
      setCurrentLap(data);
      setLoading((l) => ({ ...l, currentLap: false }));
    });
    LapDataService.getBestLap().then((data) => {
      setBestLap(data);
      setLoading((l) => ({ ...l, bestLap: false }));
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tyres</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[500px] w-full border border-slate-300 rounded shadow bg-white text-xs">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-2 py-2 border-b border-slate-300 text-left">POSITION</th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">DRIVER</th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">TYRE</th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">CURRENT LAP</th>
              <th className="px-2 py-2 border-b border-slate-300 text-left">BEST LAP</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 22 }).map((_, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-2 py-2 border-b border-slate-200 font-semibold text-slate-800">{idx + 1}</td>
                <td className="px-2 py-2 border-b border-slate-200 font-bold text-red-600 uppercase">
                  {loading.drivers || !drivers[idx] ? <CellLoader /> : (drivers[idx]?.toUpperCase().split(" ").pop() || "-")}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-slate-800">
                  {loading.tyre || !tyre[idx] ? <CellLoader /> : (tyre[idx] || "-")}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-purple-600 font-mono">
                  {loading.currentLap || !currentLap[idx] ? <CellLoader /> : (currentLap[idx] || "-")}
                </td>
                <td className="px-2 py-2 border-b border-slate-200 text-green-700 font-mono">
                  {loading.bestLap || !bestLap[idx] ? <CellLoader /> : (bestLap[idx] || "-")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CellLoader() {
  return (
    <FieldLoader />
  );
}