/**
 * Generates an SVG placeholder image.
 * @param width Width of the SVG
 * @param height Height of the SVG
 * @param theme Theme of the drawing ('car', 'race driver', 'generic')
 * @param options Optional settings: randomColors (boolean), label (string)
 * @returns SVG string
 */
export function generateSVGPlaceholder(
  width: number,
  height: number,
  theme: "car" | "race driver" | "generic" = "generic",
  options?: { randomColors?: boolean; label?: string },
) {
  const randomColor = () =>
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  const palette = {
    car: "#1976d2",
    "race driver": "#d32f2f",
    generic: "#757575",
  };
  const color = options?.randomColors ? randomColor() : palette[theme];
  const label = options?.label ?? "";

  let svgContent = "";
  if (theme === "car") {
    // Simple car: body + wheels
    svgContent = `
			<rect x="${width * 0.1}" y="${height * 0.5}" width="${width * 0.8}" height="${height * 0.2}" rx="${height * 0.1}" fill="${color}" />
			<circle cx="${width * 0.2}" cy="${height * 0.75}" r="${height * 0.08}" fill="#333" />
			<circle cx="${width * 0.8}" cy="${height * 0.75}" r="${height * 0.08}" fill="#333" />
		`;
  } else if (theme === "race driver") {
    // Simple driver: head + body
    svgContent = `
			<circle cx="${width * 0.5}" cy="${height * 0.3}" r="${height * 0.12}" fill="${color}" />
			<rect x="${width * 0.4}" y="${height * 0.45}" width="${width * 0.2}" height="${height * 0.3}" rx="${height * 0.08}" fill="${color}" />
		`;
  } else {
    // Generic: colored rectangle
    svgContent = `<rect x="0" y="0" width="${width}" height="${height}" fill="${color}" />`;
  }

  // Add label if requested
  if (label) {
    svgContent += `
			<text x="${width / 2}" y="${height * 0.9}" text-anchor="middle" font-size="${Math.max(14, height * 0.15)}" fill="#fff">${label}</text>
		`;
  }

  return `
		<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
			${svgContent}
		</svg>
	`;
}
