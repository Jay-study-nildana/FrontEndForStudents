import { useEffect, useState } from "react";
import { getDriverStandings, type DriverStanding } from "../DataF1/LapDataService";

// const nationalityFlags: Record<string, string> = {
//   "United Kingdom": "/refimages/flag-uk.png",
//   Netherlands: "/refimages/flag-nl.png",
//   Australia: "/refimages/flag-au.png",
//   Monaco: "/refimages/flag-mc.png",
//   Italy: "/refimages/flag-it.png",
//   Thailand: "/refimages/flag-th.png",
//   Spain: "/refimages/flag-es.png",
//   Germany: "/refimages/flag-de.png",
//   France: "/refimages/flag-fr.png",
//   "New Zealand": "/refimages/flag-nz.png",
//   Canada: "/refimages/flag-ca.png",
//   Japan: "/refimages/flag-jp.png",
//   Brazil: "/refimages/flag-br.png",
//   Argentina: "/refimages/flag-ar.png",
// };

const teamColors: Record<string, string> = {
  McLaren: "bg-[#ff8000]",
  "Red Bull Racing": "bg-[#1e41ff]",
  Mercedes: "bg-[#00d2be]",
  Ferrari: "bg-[#e10600]",
  Williams: "bg-[#005aff]",
  "Aston Martin": "bg-[#009b5e]",
  "Kick Sauber": "bg-[#52e252]",
  "Racing Bulls": "bg-[#2b4562]",
  "Haas F1 Team": "bg-[#bcbec0]",
  Alpine: "bg-[#0090ff]",
};

const LandingPageFive = () => {
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDriverStandings().then((data) => {
      setStandings(data);
      setLoading(false);
    });
  }, []);

  const rowsToShow = collapsed ? standings.slice(0, 5) : standings;

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 mx-auto mt-8 shadow">
      <h2 className="text-2xl font-bold font-[Orbitron] mb-6 text-gray-900">
        Driver Standings
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-40 text-lg font-semibold text-gray-500">
          Loading standings...
        </div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-700 text-sm">
              <th className="py-2 px-2">POS.</th>
              <th className="py-2 px-2">DRIVER</th>
              <th className="py-2 px-2">NATIONALITY</th>
              <th className="py-2 px-2">TEAM</th>
              <th className="py-2 px-2 text-right">PTS.</th>
            </tr>
          </thead>
          <tbody>
            {rowsToShow.map((driver) => (
              <tr key={driver.pos} className="border-b last:border-none">
                <td className="py-2 px-2 font-semibold text-gray-900">
                  {driver.pos}
                </td>
                <td className="py-2 px-2">
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    {/* {nationalityFlags[driver.nationality] && (
                      <img
                        src={nationalityFlags[driver.nationality]}
                        alt={driver.nationality}
                        className="w-5 h-5 mr-1"
                        style={{ verticalAlign: "middle" }}
                      />
                    )} */}
                    <span className="font-semibold text-gray-900">
                      {driver.name.split(" ")[0]}{" "}
                      <span className="font-extrabold">
                        {driver.name.split(" ").slice(1).join(" ")}
                      </span>
                    </span>
                  </span>
                </td>
                <td className="py-2 px-2">
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    {/* {nationalityFlags[driver.nationality] && (
                      <img
                        src={nationalityFlags[driver.nationality]}
                        alt={driver.nationality}
                        className="w-5 h-5 mr-1"
                        style={{ verticalAlign: "middle" }}
                      />
                    )} */}
                    <span>{driver.nationality}</span>
                  </span>
                </td>
                <td className="py-2 px-2">
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <span className={`inline-block w-4 h-4 rounded-full mr-1 ${teamColors[driver.team] || "bg-gray-300"}`}></span>
                    <span>{driver.team}</span>
                  </span>
                </td>
                <td className="py-2 px-2 text-right font-bold text-gray-900">
                  {driver.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Collapse/Expand button */}
      {!loading && (
        <div className="flex justify-center mt-4">
          <button
            className="text-gray-700 font-semibold hover:underline flex items-center gap-1"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? (
              <>
                Show more <span className="text-lg">&#x25BC;</span>
              </>
            ) : (
              <>
                Show less <span className="text-lg">&#x25B2;</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPageFive;