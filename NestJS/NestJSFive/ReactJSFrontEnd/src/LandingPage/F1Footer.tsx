// import React from "react";

const navLinks = [
  "Schedule",
  "Drivers",
  "News",
  "Teams",
  "Fantasy & Gaming",
  "Cookie Preferences",
  "More",
];

const socialIcons = [
  {
    name: "Facebook",
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z" />
      </svg>
    ),
  },
  {
    name: "X",
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.53 6.47a.75.75 0 0 0-1.06 0L12 10.94 7.53 6.47A.75.75 0 1 0 6.47 7.53L10.94 12l-4.47 4.47a.75.75 0 1 0 1.06 1.06L12 13.06l4.47 4.47a.75.75 0 0 0 1.06-1.06L13.06 12l4.47-4.47a.75.75 0 0 0 0-1.06z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    svg: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 6 12 6 12 6s-6.2 0-7.86.061a2.75 2.75 0 0 0-1.94 1.94A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.94 1.94C5.8 18 12 18 12 18s6.2 0 7.86-.061a2.75 2.75 0 0 0 1.94-1.94A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15V9l6 3-6 3z" />
      </svg>
    ),
  },
];

const F1Logo = () => (
  <svg
    className="h-6 w-16"
    viewBox="0 0 80 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="8" width="30" height="4" fill="#e10600" />
    <rect x="32" y="8" width="46" height="4" fill="#e10600" />
    <rect x="0" y="8" width="16" height="4" fill="#e10600" />
    <rect x="0" y="8" width="8" height="4" fill="#e10600" />
  </svg>
);

const AppStoreButtons = () => (
  <div className="flex gap-3">
    <a
      href="#"
      className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 shadow text-white font-semibold text-sm"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm-1.5 14.5h-7v-1.5h7v1.5zm0-3h-7v-1.5h7v1.5zm0-3h-7V9h7v1.5z" />
      </svg>
      App Store
    </a>
    <a
      href="#"
      className="bg-black rounded-lg px-4 py-2 flex items-center gap-2 shadow text-white font-semibold text-sm"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 2.2c-1.1-.1-2.3.7-2.9 1.7-.6 1-1.6 2.7-2.9 2.7-1.2 0-2.2-1.7-2.9-2.7-.6-1-1.8-1.8-2.9-1.7C2.2 2.3 1 3.7 1 5.3c0 2.2 2.2 4.6 5.5 7.7 3.3-3.1 5.5-5.5 5.5-7.7 0-1.6-1.2-3-2.9-3.1z" />
      </svg>
      Google Play
    </a>
  </div>
);

const F1Footer = () => {
  return (
    <footer className="bg-[#f8f6f3] w-full pt-8 pb-4 px-8">
      {/* Download App Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2
          className="text-4xl font-extrabold text-black tracking-tight mb-4 md:mb-0"
          style={{ fontFamily: "inherit" }}
        >
          DOWNLOAD THE OFFICIAL F1 APP
        </h2>
        <AppStoreButtons />
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-start gap-x-12 gap-y-2 font-bold text-lg text-black mb-2">
        {navLinks.map((link, idx) => (
          <a key={idx} href="#" className="hover:underline flex items-center">
            {link}
            {link === "More" && (
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </a>
        ))}
      </nav>

      {/* F1 Logo and Red Line */}
      <div className="flex items-center gap-2 mb-4">
        <F1Logo />
        <div className="h-2 bg-[#e10600] flex-1 rounded-sm" />
      </div>

      {/* Social Icons and Display Mode */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          {socialIcons.map((icon, idx) => (
            <a
              key={idx}
              href="#"
              aria-label={icon.name}
              className="text-black hover:text-red-600 transition-colors"
            >
              {icon.svg}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-700">
            © 2003-2026 Formula One World Championship Limited
          </span>
          {/* <button className="border border-black rounded-full px-5 py-2 text-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors">
            Display mode
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button> */}
        </div>
      </div>
    </footer>
  );
};

export default F1Footer;
