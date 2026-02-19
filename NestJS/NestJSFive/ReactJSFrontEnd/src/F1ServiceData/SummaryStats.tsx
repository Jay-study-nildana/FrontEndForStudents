import type { JSX } from "react";
import { useEffect, useState } from "react";
import * as SummaryStatsDataService from "../DataF1/SummaryStatsDataService";
import FieldLoader from "../Utils/FieldLoader";



export default function SummaryStats(): JSX.Element {
  const [fastest, setFastest] = useState<any>(null);
  const [loadingFastest, setLoadingFastest] = useState(true);
  const [avgLap, setAvgLap] = useState<number | null>(null);
  const [loadingAvgLap, setLoadingAvgLap] = useState(true);
  const [tyreUsage, setTyreUsage] = useState<Record<string, number> | null>(
    null,
  );
  const [loadingTyreUsage, setLoadingTyreUsage] = useState(true);
  const [largestGap, setLargestGap] = useState<any>(null);
  const [loadingLargestGap, setLoadingLargestGap] = useState(true);
  const [sectorLeaders, setSectorLeaders] = useState<any>(null);
  const [loadingSectorLeaders, setLoadingSectorLeaders] = useState(true);
  const [driverLapTyre, setDriverLapTyre] = useState<any[]>([]);
  const [loadingDriverLapTyre, setLoadingDriverLapTyre] = useState(true);

  useEffect(() => {
    SummaryStatsDataService.getFastestBestLap().then((d) => {
      setFastest(d);
      setLoadingFastest(false);
    });
    SummaryStatsDataService.getAverageBestLap().then((d) => {
      setAvgLap(d);
      setLoadingAvgLap(false);
    });
    SummaryStatsDataService.getTyreUsageCount().then((d) => {
      setTyreUsage(d);
      setLoadingTyreUsage(false);
    });
    SummaryStatsDataService.getLargestGap().then((d) => {
      setLargestGap(d);
      setLoadingLargestGap(false);
    });
    SummaryStatsDataService.getSectorLeaders().then((d) => {
      setSectorLeaders(d);
      setLoadingSectorLeaders(false);
    });
    SummaryStatsDataService.getDriverLapTyreSummary().then((d) => {
      setDriverLapTyre(d);
      setLoadingDriverLapTyre(false);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Summary Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fastest Lap */}
        <div className="bg-slate-50 rounded p-4 shadow">
          <div className="font-semibold mb-1">Fastest Best Lap</div>
          {loadingFastest ? (
            <FieldLoader />
          ) : fastest ? (
            <div>
              <span className="font-mono text-purple-700">{fastest.lap}</span>{" "}
              by{" "}
              <span className="font-bold text-red-700">{fastest.driver}</span>
            </div>
          ) : (
            <span className="text-slate-400">N/A</span>
          )}
        </div>

        {/* Average Lap */}
        <div className="bg-slate-50 rounded p-4 shadow">
          <div className="font-semibold mb-1">Average Best Lap (s)</div>
          {loadingAvgLap ? (
            <FieldLoader />
          ) : avgLap !== null ? (
            <span className="font-mono text-green-700">
              {avgLap.toFixed(3)}
            </span>
          ) : (
            <span className="text-slate-400">N/A</span>
          )}
        </div>

        {/* Tyre Usage */}
        <div className="bg-slate-50 rounded p-4 shadow">
          <div className="font-semibold mb-1">Tyre Usage Count</div>
          {loadingTyreUsage ? (
            <FieldLoader />
          ) : tyreUsage ? (
            <ul className="text-xs">
              {Object.entries(tyreUsage).map(([tyre, count]) => (
                <li key={tyre}>
                  <span className="font-mono text-blue-700">{tyre}</span>:{" "}
                  {count}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-slate-400">N/A</span>
          )}
        </div>

        {/* Largest Gap */}
        <div className="bg-slate-50 rounded p-4 shadow">
          <div className="font-semibold mb-1">Largest Gap</div>
          {loadingLargestGap ? (
            <FieldLoader />
          ) : largestGap ? (
            <span>
              <span className="font-bold text-red-700">
                {largestGap.driver}
              </span>{" "}
              <span className="font-mono text-slate-700">{largestGap.gap}</span>
            </span>
          ) : (
            <span className="text-slate-400">N/A</span>
          )}
        </div>

        {/* Sector Leaders */}
        <div className="bg-slate-50 rounded p-4 shadow md:col-span-2">
          <div className="font-semibold mb-1">Sector Leaders</div>
          {loadingSectorLeaders ? (
            <FieldLoader />
          ) : sectorLeaders ? (
            <div className="flex flex-wrap gap-4">
              {Object.entries(sectorLeaders).map(([sector, info]: any) =>
                info ? (
                  <span
                    key={sector}
                    className="inline-block bg-slate-200 rounded px-2 py-1"
                  >
                    <span className="font-bold text-slate-700">{sector}</span>:{" "}
                    <span className="font-mono text-green-700">
                      {info.value}
                    </span>{" "}
                    (<span className="text-red-700">{info.driver}</span>)
                  </span>
                ) : null,
              )}
            </div>
          ) : (
            <span className="text-slate-400">N/A</span>
          )}
        </div>

        {/* Driver Lap & Tyre Table */}
        <div className="bg-slate-50 rounded p-4 shadow md:col-span-2">
          <div className="font-semibold mb-2">All Drivers: Best Lap & Tyre</div>
          {loadingDriverLapTyre ? (
            <FieldLoader />
          ) : driverLapTyre.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-[400px] text-xs">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left">Driver</th>
                    <th className="px-2 py-1 text-left">Best Lap</th>
                    <th className="px-2 py-1 text-left">Tyre</th>
                  </tr>
                </thead>
                <tbody>
                  {driverLapTyre.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-100"}
                    >
                      <td className="px-2 py-1 font-bold text-red-700">
                        {row.driver}
                      </td>
                      <td className="px-2 py-1 font-mono text-purple-700">
                        {row.bestLap}
                      </td>
                      <td className="px-2 py-1 text-blue-700">{row.tyre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <span className="text-slate-400">N/A</span>
          )}
        </div>
      </div>
    </div>
  );
}
