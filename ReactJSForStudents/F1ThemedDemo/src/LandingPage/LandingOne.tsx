// import React from "react";
import { generateSVGPlaceholder } from "../DataF1/SVGService";

// Local variables for content
const mainFeature = {
  image: `data:image/svg+xml;utf8,${encodeURIComponent(
    generateSVGPlaceholder(1000, 1000, "car", { randomColors: true }),
    //generateSVGPlaceholder(1000, 1000, "car", { randomColors: true, label: "Main Feature" })
  )}`,
  headline: "What we learned from Day 2 of the first Bahrain test",
};

const newsItems = [
  {
    tag: "HIGHLIGHTS",
    image: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(200, 200, "race driver", { randomColors: true, label: "Highlights" }))}`,
    text: "Watch the action from Day 2 of the first Bahrain test",
  },
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(200, 200, "car", { randomColors: true, label: "Leclerc v Norris" }))}`,
    text: "Leclerc leads Norris on second day of Bahrain testing",
  },
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(200, 200, "generic", { randomColors: true, label: "Trailer" }))}`,
    text: "Watch the thrilling trailer for Drive to Survive Season 8",
  },
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(200, 200, "car", { randomColors: true, label: "Audi" }))}`,
    text: "Why Audi’s new-look bodywork in Bahrain got people talking",
  },
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(generateSVGPlaceholder(200, 200, "race driver", { randomColors: true, label: "Regulations" }))}`,
    text: "Get up to speed with the new F1 regulations for 2026",
  },
];

const navButtons = [
  { label: "2026 SCHEDULE", icon: "\u2197" },
  { label: "2025 STANDINGS", icon: "\u2197" },
  { label: "LATEST NEWS", icon: "\u2197" },
  { label: "LATEST VIDEO", icon: "\u2197" },
];

const LandingOne = () => {
  return (
    <div className=" bg-[#f7f4f0] flex flex-col">
      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:flex-row gap-8 p-6 lg:p-12">
        {/* Main Feature */}
        <div
          className="flex-1 relative rounded-xl overflow-hidden shadow-lg bg-black flex flex-col"
          // style={{ maxHeight: 400 }}
        >
          <img
            src={mainFeature.image}
            alt="Bahrain Test"
            className="w-full h-full object-cover opacity-90 flex-1"
            style={{ maxHeight: 400 }}
          />
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h1 className="text-white text-3xl md:text-4xl font-bold font-[Orbitron] drop-shadow-lg">
              {mainFeature.headline}
            </h1>
          </div>
        </div>
        {/* Sidebar News */}
        <div
          className="w-full lg:w-[480px] flex flex-col gap-4"
          // style={{ maxHeight: 400 }}
        >
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-white rounded-lg shadow p-3 min-h-[80px]"
            >
              <img
                src={item.image}
                alt="news thumb"
                className="w-20 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                {item.tag && (
                  <span className="inline-block text-xs font-bold text-pink-600 bg-pink-100 rounded px-2 py-1 mb-1 mr-2 align-middle">
                    {item.tag}
                  </span>
                )}
                <span className="block text-base font-medium text-gray-800 leading-tight">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-6 p-6 bg-[#f7f4f0]">
        {navButtons.map((btn, idx) => (
          <button
            key={idx}
            className="flex items-center justify-between w-64 px-6 py-4 rounded-xl bg-[#cfd3fa] text-lg font-bold font-[Orbitron] text-gray-900 shadow hover:bg-[#b6baf0] transition-all uppercase"
          >
            <span>{btn.label}</span>
            <span className="ml-4 text-2xl">{btn.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingOne;
