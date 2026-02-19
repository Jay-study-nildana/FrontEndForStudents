// import React from "react";

const quickLinks = [
  { label: "F1® UNLOCKED", url: "#" },
  { label: "F1® STORE", url: "#" },
  { label: "F1® TICKETS", url: "#" },
  { label: "F1® FANTASY", url: "#" },
];

const ExternalLinkIcon = () => (
  <svg
    className="w-5 h-5 ml-2 inline-block"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m5-3h3v3m-11 8l8-8"
    />
  </svg>
);

const LandingPageSeven = () => {
  return (
    <div className="bg-[#f5f7fa] p-6">
      {/* Quick Links */}
      <div className="flex gap-4 mb-8">
        {quickLinks.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            className="flex items-center justify-between bg-[#c7cdfa] rounded-lg px-8 py-4 font-bold text-lg text-black uppercase tracking-wide shadow-sm hover:bg-[#b0b7e6] transition-colors w-1/4 min-w-[220px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{item.label}</span>
            <ExternalLinkIcon />
          </a>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-red-600 rounded-lg p-12 flex flex-col justify-center min-h-[350px] max-w-full">
        <h2
          className="text-white text-5xl font-extrabold mb-6 leading-tight"
          style={{ fontFamily: "inherit" }}
        >
          HELP SHAPE THE F1 WEBSITE
        </h2>
        <p className="text-white text-lg font-semibold mb-6">
          Take a few minutes to tell us what you think.
        </p>
        <button className="bg-white text-black font-bold rounded-full px-6 py-2 text-lg shadow hover:bg-gray-200 transition-colors w-fit">
          Let's go
        </button>
      </div>
    </div>
  );
};

export default LandingPageSeven;
