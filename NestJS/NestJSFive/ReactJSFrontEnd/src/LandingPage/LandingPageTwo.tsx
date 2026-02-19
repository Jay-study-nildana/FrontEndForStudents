import { generateSVGPlaceholder } from "../DataF1/SVGService";

// Local variables for card content
const editorsPicks = [
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(600, 400, "car", {
        randomColors: true,
        label: "Deceptions",
      }),
    )}`,
    title: "7 of the cleverest deceptions in F1 testing history",
    overlay: true,
    large: true,
  },
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(400, 200, "race driver", {
        randomColors: true,
        label: "Norris",
      }),
    )}`,
    title: "Norris pleased with 'good learning' in Bahrain",
  },
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(400, 200, "car", {
        randomColors: true,
        label: "Audi",
      }),
    )}`,
    title: "Bortoleto and Hulkenberg ready for 'long road ahead' at Audi",
  },
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(400, 200, "race driver", {
        randomColors: true,
        label: "Hamilton",
      }),
    )}`,
    title: "Hamilton reflects on decision to change race engineer",
  },
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(400, 200, "generic", {
        randomColors: true,
        label: "Key Terms",
      }),
    )}`,
    title: "Key terms you need to know for pre-season testing",
  },
  {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(
      generateSVGPlaceholder(600, 400, "car", {
        randomColors: true,
        label: "F1 2026",
      }),
    )}`,
    title: "Everything you need to know about F1's new rules for 2026",
    overlay: true,
    large: true,
  },
];

const LandingPageTwo = () => {
  return (
    <div className="p-4 md:p-8 bg-[#f7f4f0] min-h-screen">
      <h2 className="text-xl md:text-2xl font-bold font-[Orbitron] mb-4 text-gray-900">
        EDITOR'S PICKS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top row */}
        <div className="md:col-span-2 row-span-1">
          <div className="relative rounded-xl overflow-hidden shadow-lg h-64 md:h-80">
            <img
              src={editorsPicks[0].image}
              alt="editors pick 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-white text-lg md:text-2xl font-bold drop-shadow-lg">
                {editorsPicks[0].title}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-xl overflow-hidden shadow-lg bg-white flex-1 flex flex-col">
            <img
              src={editorsPicks[1].image}
              alt="editors pick 2"
              className="w-full h-40 object-cover"
            />
            <div className="p-3 flex-1 flex items-end">
              <span className="text-gray-900 font-semibold text-base">
                {editorsPicks[1].title}
              </span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg bg-white flex-1 flex flex-col">
            <img
              src={editorsPicks[2].image}
              alt="editors pick 3"
              className="w-full h-40 object-cover"
            />
            <div className="p-3 flex-1 flex items-end">
              <span className="text-gray-900 font-semibold text-base">
                {editorsPicks[2].title}
              </span>
            </div>
          </div>
        </div>
        {/* Bottom row */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl overflow-hidden shadow-lg bg-white flex-1 flex flex-col">
            <img
              src={editorsPicks[3].image}
              alt="editors pick 4"
              className="w-full h-40 object-cover"
            />
            <div className="p-3 flex-1 flex items-end">
              <span className="text-gray-900 font-semibold text-base">
                {editorsPicks[3].title}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-xl overflow-hidden shadow-lg bg-white flex-1 flex flex-col">
            <img
              src={editorsPicks[4].image}
              alt="editors pick 5"
              className="w-full h-40 object-cover"
            />
            <div className="p-3 flex-1 flex items-end">
              <span className="text-gray-900 font-semibold text-base">
                {editorsPicks[4].title}
              </span>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 row-span-1">
          <div className="relative rounded-xl overflow-hidden shadow-lg h-64 md:h-80">
            <img
              src={editorsPicks[5].image}
              alt="editors pick 6"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-white text-lg md:text-2xl font-bold drop-shadow-lg">
                {editorsPicks[5].title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageTwo;
