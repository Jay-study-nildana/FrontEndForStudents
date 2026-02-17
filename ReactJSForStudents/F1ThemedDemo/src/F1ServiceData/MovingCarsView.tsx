import { useRef, useEffect, useState } from "react";

// Example SVG path for the circuit (replace with your actual track path)
const TRACK_PATH =
  "M 100 400 Q 50 100 400 100 Q 700 100 700 400 Q 700 700 400 700 Q 100 700 100 400 Z";

// Example car data
const CARS = [
  { label: "ALO", color: "#16a34a", start: 0 },
  { label: "BEA", color: "#a3a3a3", start: 0.33 },
  { label: "BOR", color: "#ef4444", start: 0.66 },
];

function getPointAtLength(path: SVGPathElement, t: number) {
  const total = path.getTotalLength();
  return path.getPointAtLength(t * total);
}

export default function MovingCarsView() {
  const pathRef = useRef<SVGPathElement>(null);
  const [carPositions, setCarPositions] = useState(
    CARS.map((car) => car.start)
  );

  // Animate cars
  useEffect(() => {
    let running = true;
    let last = performance.now();

    function animate(now: number) {
      if (!running) return;
      const dt = (now - last) / 1000;
      last = now;
      setCarPositions((prev) =>
        prev.map((t, i) => (t + 0.05 * (i + 1) * dt) % 1)
      );
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => {
      running = false;
    };
  }, []);

  return (
    <div style={{ background: "linear-gradient(#222, #111)", padding: 0 }}>
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
          carPositions.map((t, i) => {
            const pt = getPointAtLength(pathRef.current!, t);
            return (
              <g key={CARS[i].label} transform={`translate(${pt.x},${pt.y})`}>
                <circle
                  r={22}
                  fill={CARS[i].color}
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
                  {CARS[i].label}
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  );
}