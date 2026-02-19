import { generateSVGPlaceholder } from "../DataF1/SVGService";
import { useState } from "react";

// Local data for drivers and teams
const driverCards = [
  {
    position: "1ST",
    name: "Lando Norris",
    team: "McLaren",
    flag: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(24, 24, "generic", { randomColors: true, label: "UK" }))}`,
    points: 423,
    bg: "bg-gradient-to-br from-[#ff8000] to-[#ff4d00]",
    pattern: "bg-[url('/refimages/bg-orange.svg')]",
    image: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(180, 260, "race driver", { randomColors: true, label: "Norris" }))}`,
  },
  {
    position: "2ND",
    name: "Max Verstappen",
    team: "Red Bull Racing",
    flag: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(24, 24, "generic", { randomColors: true, label: "NL" }))}`,
    points: 421,
    bg: "bg-gradient-to-br from-[#1e41ff] to-[#0033a0]",
    pattern: "bg-[url('/refimages/bg-blue2.svg')]",
    image: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(180, 260, "race driver", { randomColors: true, label: "Verstappen" }))}`,
  },
  {
    position: "3RD",
    name: "Oscar Piastri",
    team: "McLaren",
    flag: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(24, 24, "generic", { randomColors: true, label: "AU" }))}`,
    points: 410,
    bg: "bg-gradient-to-br from-[#ff8000] to-[#ff4d00]",
    pattern: "bg-[url('/refimages/bg-orange.svg')]",
    image: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(180, 260, "race driver", { randomColors: true, label: "Piastri" }))}`,
  },
];

const teamCards = [
  {
    position: "2ND",
    name: "Mercedes",
    points: 469,
    drivers: ["George Russell", "Kimi Antonelli"],
    logo: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(40, 40, "generic", { randomColors: true, label: "M" }))}`,
    bg: "bg-gradient-to-br from-[#00d2be] to-[#009ca6]",
    pattern: "bg-[url('/refimages/bg-cyan.svg')]",
    car: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(320, 100, "car", { randomColors: true, label: "Mercedes" }))}`,
  },
  {
    position: "1ST",
    name: "McLaren",
    points: 833,
    drivers: ["Oscar Piastri", "Lando Norris"],
    logo: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(40, 40, "generic", { randomColors: true, label: "McL" }))}`,
    bg: "bg-gradient-to-br from-[#ff8000] to-[#ff4d00]",
    pattern: "bg-[url('/refimages/bg-orange.svg')]",
    car: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(320, 100, "car", { randomColors: true, label: "McLaren" }))}`,
  },
  {
    position: "3RD",
    name: "Red Bull Racing",
    points: 451,
    drivers: ["Max Verstappen", "Yuki Tsunoda"],
    logo: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(40, 40, "generic", { randomColors: true, label: "RB" }))}`,
    bg: "bg-gradient-to-br from-[#1e41ff] to-[#0033a0]",
    pattern: "bg-[url('/refimages/bg-blue2.svg')]",
    car: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(320, 100, "car", { randomColors: true, label: "Red Bull" }))}`,
  },
];

const tabs = ["DRIVERS", "TEAMS"];

const LandingPageFour = () => {
  const [activeTab, setActiveTab] = useState("DRIVERS");

  return (
    <div className="bg-[#f7f4f0] p-6 md:p-12">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron] text-gray-900 mb-6">
        2025 SEASON
      </h1>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-lg font-bold font-[Orbitron] focus:outline-none ${
              activeTab === tab
                ? "text-black border-b-4 border-red-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Content */}
      {activeTab === "DRIVERS" ? (
        <div className="flex flex-wrap gap-8 justify-center mt-6">
          {driverCards.map((driver, _idx) => (
            <div
              key={driver.name}
              className={`relative w-[400px] h-[320px] rounded-xl shadow-lg ${driver.bg} ${driver.pattern} p-6 flex flex-col justify-between`}
            >
              {/* Position */}
              <div className="text-white text-2xl font-bold mb-2 flex flex-col">
                <span>{driver.position}</span>
                <span className="text-white text-2xl font-bold font-[Orbitron]">
                  {driver.name.split(" ")[0]}{" "}
                  <span className="font-extrabold">
                    {driver.name.split(" ").slice(1).join(" ")}
                  </span>
                </span>                
                <span className="text-white text-lg font-semibold">
                    {driver.team}
                </span>
              </div>
              {/* Name & Team */}
              <div>
                <div className="flex items-center mt-1">
                  {/* <img src={driver.flag} alt="flag" className="w-6 h-6 mr-2" /> */}

                </div>
              </div>
              {/* Points */}
              <div className="absolute left-6 bottom-6 text-white text-xl font-bold">
                {driver.points}{" "}
                <span className="text-base font-semibold">PTS</span>
              </div>
              {/* Driver Image */}
              <img
                src={driver.image}
                alt={driver.name}
                className="absolute bottom-0 right-0 w-[180px] h-[260px] object-contain"
                style={{ pointerEvents: "none" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center mt-6">
          {teamCards.map((team, _idx) => (
            <div
              key={team.name}
              className={`relative w-[400px] h-[320px] rounded-xl shadow-lg ${team.bg} ${team.pattern} p-6 flex flex-col justify-between`}
            >
              {/* Position */}
              <div className="text-white text-2xl font-bold mb-2">
                <span>{team.position}</span>
              </div>
              {/* Name & Points */}
              <div>
                <span className="text-white text-2xl font-bold font-[Orbitron]">
                  {team.name}
                </span>
                <span className="block text-white text-xl font-bold mt-1">
                  {team.points}{" "}
                  <span className="text-base font-semibold">PTS</span>
                </span>
                <div className="mt-2">
                  {team.drivers.map((d, _i) => (
                    <span
                      key={d}
                      className="block text-white text-lg font-semibold"
                    >
                      {d.split(" ")[0]}{" "}
                      <span className="font-extrabold">
                        {d.split(" ").slice(1).join(" ")}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              {/* Team Logo */}
              <img
                src={team.logo}
                alt={team.name + " logo"}
                className="absolute top-6 right-6 w-10 h-10"
                style={{ pointerEvents: "none" }}
              />
              {/* Car Image */}
              {/* <img
                src={team.car}
                alt={team.name + " car"}
                className="absolute bottom-0 left-0 w-[320px] h-[100px] object-contain"
                style={{ pointerEvents: "none" }}
              /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPageFour;
