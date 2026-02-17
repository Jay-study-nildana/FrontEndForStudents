import { useRef, useEffect, useState } from "react";
import * as LapDataService from "../DataF1/LapDataService";

// Revised SVG path: proper loop, no intersections
const TRACK_PATH =
  "M 150 700 Q 200 650 300 650 Q 400 650 450 600 Q 500 550 600 550 Q 700 550 700 450 Q 700 350 600 350 Q 500 350 450 300 Q 400 250 300 250 Q 200 250 150 300 Q 100 350 100 450 Q 100 550 200 550 Q 500 450 250 600 Q 100 500 100 650 Z";

// Utility to generate a color from a string (driver name)
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
}

function getPointAtLength(path: SVGPathElement, t: number) {
  const total = path.getTotalLength();
  return path.getPointAtLength(t * total);
}

export default function MovingCarsViewPartTwo() {
  const pathRef = useRef<SVGPathElement>(null);
  const [allCars, setAllCars] = useState<
    {
      label: string;
      color: string;
      start: number;
      fullName: string;
      speed?: number;
    }[]
  >([]);
  const [numCars, setNumCars] = useState(6);
  const [carPositions, setCarPositions] = useState<number[]>([]);

  // Fetch drivers and set allCars
  useEffect(() => {
    LapDataService.getDrivers().then((driverNames: string[]) => {
      const carObjs = driverNames.map((name, idx) => {
        // Use last name or initials for label
        const parts = name.split(" ");
        let label =
          parts.length > 1
            ? parts[parts.length - 1].toUpperCase()
            : name.substring(0, 3).toUpperCase();
        if (label.length > 4) label = label.substring(0, 4);
        // Assign a random speed between 0.03 and 0.12
        const speed = 0.03 + Math.random() * 0.09;
        return {
          label,
          color: stringToColor(name),
          start: idx / driverNames.length,
          fullName: name,
          speed,
        };
      });
      setAllCars(carObjs);
    });
  }, []);

  // Update car positions when numCars or allCars changes
  useEffect(() => {
    setCarPositions(
      allCars.slice(0, numCars).map((_car, idx) => idx / Math.max(1, numCars)),
    );
  }, [allCars, numCars]);

  // Animate cars
  useEffect(() => {
    if (allCars.length === 0 || numCars === 0) return;
    let running = true;
    let last = performance.now();

    function animate(now: number) {
      if (!running) return;
      const dt = (now - last) / 1000;
      last = now;
      setCarPositions((prev) =>
        prev.length === numCars
          ? prev.map((t, i) => {
              const speed = allCars[i]?.speed ?? 0.05;
              return (t + speed * dt) % 1;
            })
          : allCars
              .slice(0, numCars)
              .map((_car, idx) => idx / Math.max(1, numCars)),
      );
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => {
      running = false;
    };
  }, [allCars, numCars]);

  return (
    <div
      style={{
        // background: "linear-gradient(#222, #111)",
        padding: 0,
        minHeight: 600,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {/* Table of drivers */}
        <div
          style={{
            minWidth: 220,
            marginTop: 24,
            background: "#181818",
            borderRadius: 10,
            boxShadow: "0 2px 8px #0008",
            padding: 12,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Drivers on Track
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: "#aaa", fontSize: 15 }}>
                <th style={{ textAlign: "left", padding: "4px 6px" }}>Label</th>
                <th style={{ textAlign: "left", padding: "4px 6px" }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {allCars.slice(0, numCars).map((car, idx) => (
                <tr
                  key={car.label}
                  style={{ background: idx % 2 ? "#232323" : "#181818" }}
                >
                  <td
                    style={{
                      padding: "4px 6px",
                      fontWeight: "bold",
                      color: car.color,
                    }}
                  >
                    {car.label}
                  </td>
                  <td style={{ padding: "4px 6px", color: "#fff" }}>
                    {/* Find full name from allCars */}
                    {allCars[idx]?.fullName || car.label}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "16px 0",
            }}
          >
            <button
              onClick={() => setNumCars((n) => Math.max(1, n - 1))}
              style={{
                marginRight: 8,
                fontSize: 18,
                padding: "4px 12px",
                borderRadius: 6,
              }}
            >
              -
            </button>
            <span style={{ color: "#9ff", fontWeight: "bold", fontSize: 18 }}>
              Number of Cars: {numCars}
            </span>
            <button
              onClick={() => setNumCars((n) => Math.min(allCars.length, n + 1))}
              style={{
                marginLeft: 8,
                fontSize: 18,
                padding: "4px 12px",
                borderRadius: 6,
              }}
            >
              +
            </button>
          </div>
          <svg
            viewBox="0 0 800 800"
            width="100%"
            height="500"
            style={{ display: "block", margin: "0 auto" }}
          >
            {/* Track */}
            <path
              ref={pathRef}
              d={TRACK_PATH}
              fill="none"
              stroke="#444"
              strokeWidth={8}
            />
            {/* Cars */}
            {pathRef.current &&
              allCars.length >= numCars &&
              carPositions.length === numCars &&
              carPositions.map((t, i) => {
                const pt = getPointAtLength(pathRef.current!, t);
                return (
                  <g
                    key={allCars[i].label}
                    transform={`translate(${pt.x},${pt.y})`}
                  >
                    <circle
                      r={22}
                      fill={allCars[i].color}
                      stroke="#222"
                      strokeWidth={3}
                    />
                    <text
                      x={0}
                      y={5}
                      textAnchor="middle"
                      fontWeight="bold"
                      fontSize={18}
                      fill="#fff"
                      style={{
                        textShadow: "0 1px 4px #000, 0 0 2px #000",
                        fontFamily: "monospace",
                      }}
                    >
                      {allCars[i].label}
                    </text>
                  </g>
                );
              })}
          </svg>
        </div>
      </div>
    </div>
  );
}
