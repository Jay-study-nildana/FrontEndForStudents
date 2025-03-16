// standard boiler plate for most react apps
// checked the code on mar 16 2025. It is working fine.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App"; //app starts here

const rootElement = document.getElementById("root"); //linking index.html div with id root
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
