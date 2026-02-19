import { generateSVGPlaceholder } from "../DataF1/SVGService";

const highlights = [
  {
    title: "F1 Bahrain Testing 2026: Day 2 Highlights",
    duration: "8:41",
    img: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(288, 160, "car", {
        randomColors: true,
        label: "Day 2",
      }),
    )}`,
  },
  {
    title: "F1 Bahrain Testing 2026: Day 1 Highlights",
    duration: "9:41",
    img: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(288, 160, "car", {
        randomColors: true,
        label: "Day 1",
      }),
    )}`,
  },
  {
    title: "F1 Barcelona Shakedown 2026: Day 5 Highlights",
    duration: "10:07",
    img: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(288, 160, "car", {
        randomColors: true,
        label: "Day 5",
      }),
    )}`,
  },
  {
    title: "F1 Barcelona Shakedown 2026: Day 4 Highlights",
    duration: "7:55",
    img: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(288, 160, "car", {
        randomColors: true,
        label: "Day 4",
      }),
    )}`,
  },
];

const PlayIcon = () => (
  <svg
    className="w-8 h-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <circle
      cx="12"
      cy="12"
      r="11"
      stroke="white"
      strokeWidth="2"
      fill="rgba(0,0,0,0.4)"
    />
    <polygon points="10,8 17,12 10,16" fill="white" />
  </svg>
);

const HighlightsCard = ({
  title,
  duration,
  img,
}: {
  title: string;
  duration: string;
  img: string;
}) => (
  <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg w-72 mr-6">
    <img src={img} alt={title} className="w-full h-40 object-cover" />
    <div className="absolute bottom-2 left-2">
      <button className="bg-black bg-opacity-60 rounded-full p-2">
        <PlayIcon />
      </button>
    </div>
    <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
      {duration}
    </span>
    <div className="p-4">
      <div className="text-white font-semibold text-sm mb-1">{title}</div>
    </div>
  </div>
);

const LandingPageSix = () => {
  return (
    <div className="bg-gray-900 px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-3xl font-bold tracking-widest">
          HIGHLIGHTS
        </h2>
        <a
          href="#"
          className="text-white text-lg font-semibold hover:underline"
        >
          View All
        </a>
      </div>
      <div className="flex flex-row items-center justify-between">
        {highlights.map((item, idx) => (
          <HighlightsCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default LandingPageSix;
