// import React from "react";
import { generateSVGPlaceholder } from "../DataF1/SVGService";

const svgThemes = ["car", "race driver", "generic"];

// Generate random sizes from 100px to 2000px (e.g., 100, 250, 500, 1000, 1500, 2000)
const sizes = [100, 250, 500, 1000, 1500, 2000];

// For each theme, pick a random size and random color
const svgVariants = svgThemes.map((theme) => {
  const size = sizes[Math.floor(Math.random() * sizes.length)];
  return {
    theme,
    width: size,
    height: size,
    randomColors: true,
    label: undefined,
  };
});

export default function NotFoundFour() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        justifyContent: "center",
      }}
    >
      {svgVariants.map((variant, idx) => {
        const svg = generateSVGPlaceholder(
          variant.width,
          variant.height,
          variant.theme as "car" | "race driver" | "generic",
          { randomColors: variant.randomColors, label: variant.label },
        );
        return (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              padding: 8,
              background: "#222",
              borderRadius: 8,
              minWidth: 120,
            }}
          >
            <div
              style={{
                width: variant.width,
                height: variant.height,
                overflow: "auto",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </div>
            <div style={{ color: "#fff", fontSize: 14, marginTop: 8 }}>
              Theme: {variant.theme}, Size: {variant.width}x{variant.height}
            </div>
          </div>
        );
      })}
    </div>
  );
}
