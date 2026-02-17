import type { JSX } from "react";
import { useState } from "react";
import LapsView from "./LapsView";
import SectorsView from "./SectorsView";
import SegmentsView from "./SegmentsView";
import TyresView from "./TyresView";

const TABS = ["Laps", "Sectors", "Segments", "Tyres"];

export default function F1ViewWithFileData(): JSX.Element {
  const [activeTab, setActiveTab] = useState("Laps");

  function renderView() {
    switch (activeTab) {
      case "Laps":
        return <LapsView />;
      case "Sectors":
        return <SectorsView />;
      case "Segments":
        return <SegmentsView />;
      case "Tyres":
        return <TyresView />;
      default:
        return <div className="p-4">Unknown View</div>;
    }
  }

  return (
    <section className="w-full p-2">
      <div>
        <p>F1 Data from File</p>
      </div>
      <div className="flex mb-4 border-b border-slate-300">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-semibold focus:outline-none transition border-b-2 ${
              activeTab === tab
                ? "border-red-600 text-red-600 bg-slate-100"
                : "border-transparent text-slate-700 bg-white hover:bg-slate-50"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {renderView()}
    </section>
  );
}
