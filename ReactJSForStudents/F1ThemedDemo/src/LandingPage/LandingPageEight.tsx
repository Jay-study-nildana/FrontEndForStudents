// import React from "react";

const topPartners = [
  "LVMH",
  "Pirelli",
  "aramco",
  "Heineken",
  "aws",
  "Lenovo",
  "DHL",
  "QATAR AIRWAYS",
  "MSC CRUISES",
  "salesforce",
];
const midPartners = [
  "LOUIS VUITTON",
  "TAG HEUER",
  "Moët Hennessy",
  "AMERICAN EXPRESS",
  "pepsico",
  "crypto.com",
  "standard chartered",
  "Santander",
  "Globant",
  "allwyn",
  "pwc",
  "Nestlé",
  "Barilla",
  "Las Vegas",
  "LIQUI MOLY",
  "Paramount+",
];
const bottomPartners = [
  "PUMA",
  "TATA COMMUNICATIONS",
  "aggreko",
  "McDonald's",
  "T Mobile",
];

const PartnersRow = ({ partners }: { partners: string[] }) => (
  <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 py-8">
    {partners.map((name, idx) => (
      <div
        key={idx}
        className="text-white text-2xl font-light opacity-90 whitespace-nowrap select-none"
        style={{ fontFamily: "inherit" }}
      >
        {name}
      </div>
    ))}
  </div>
);

const LandingPageEight = () => {
  return (
    <div className="w-full">
      {/* Top band */}
      <div className="bg-[#23232b] px-8 pt-8 pb-2">
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-white text-3xl font-extrabold tracking-widest"
            style={{ fontFamily: "inherit" }}
          >
            OUR PARTNERS
          </h2>
          <a href="#" className="text-white font-bold text-lg hover:underline">
            View all
          </a>
        </div>
        <PartnersRow partners={topPartners} />
      </div>
      {/* Middle band */}
      <div className="bg-[#393940] px-8">
        <PartnersRow partners={midPartners} />
      </div>
      {/* Bottom band */}
      <div className="bg-[#53535a] px-8 rounded-b-lg">
        <PartnersRow partners={bottomPartners} />
      </div>
    </div>
  );
};

export default LandingPageEight;
