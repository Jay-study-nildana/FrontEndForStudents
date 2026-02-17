import { useRef, useEffect, useState } from "react";
import { getDrivers } from "../DataF1/LapDataService";
import { generateSVGPlaceholder } from "../DataF1/SVGService";

// Driver card style mapping (fallbacks for bg/pattern)
const driverCardStyle = (driver: any) => ({
  bg: driver.bg || "bg-gradient-to-b from-[#bcbec0] to-[#888a8c]",
  pattern: driver.pattern || "",
  faded: driver.faded || false,
});

const scrollAmount = 350; // px per arrow click

const LandingPageThree = () => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDrivers().then((data) => {
      // Map array of names to array of objects with .name and .image property
      const mapped = Array.isArray(data)
        ? data.map((d) => ({
            name: d,
            image: `data:image/svg+xml;utf8,${encodeURIComponent
              (
                generateSVGPlaceholder(140, 220, "race driver", 
                  {
                  randomColors: true,
                  // label: d,
                  })
              )
            }`,
          }))
        : [];
      setDrivers(mapped);
      setLoading(false);
    });
  }, []);

  const handleScroll = (dir: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft } = rowRef.current;
      const amount = dir === "left" ? -scrollAmount : scrollAmount;
      rowRef.current.scrollTo({
        left: scrollLeft + amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white p-6 md:p-10">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold font-[Orbitron] text-gray-900 tracking-tight">
          DRIVERS
        </h2>
        <div className="flex items-center gap-2">
          <a href="#" className="font-bold text-black hover:underline mr-2">
            View all
          </a>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            <span className="text-2xl">&#8592;</span>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <span className="text-2xl">&#8594;</span>
          </button>
        </div>
      </div>
      {/* Drivers Row */}
      {loading ? (
        <div className="flex justify-center items-center h-40 text-lg font-semibold text-gray-500">
          Loading drivers...
        </div>
      ) : (
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
        >
          {drivers.map((driver, idx) => {
            const { bg, pattern, faded } = driverCardStyle(driver);
            return (
              <div
                key={driver.name + idx}
                className={`relative min-w-[170px] w-[170px] h-[280px] rounded-xl flex flex-col items-center justify-end shadow-lg ${bg} ${pattern} ${faded ? "opacity-50" : ""}`}
              >
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[220px] object-contain z-10"
                  style={{ pointerEvents: "none" }}
                />
                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent z-20 rounded-b-xl">
                  <span className="block text-white text-lg font-bold font-[Orbitron] leading-tight text-center">
                    {driver.name.split(" ")[0]}
                    <br />
                    {driver.name.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>
      {/* Red accent line */}
      <div className="relative h-4">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[90%] h-2 bg-[#e10600] rounded-r-[12px]"
          style={{ clipPath: "polygon(0 0, 98% 0, 100% 100%, 0% 100%)" }}
        ></div>
      </div>
    </div>
  );
};

export default LandingPageThree;
