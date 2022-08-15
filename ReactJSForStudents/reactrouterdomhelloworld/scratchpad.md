  "dependencies": {
    "history": "^5.2.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router": "6.3.0",
    "react-router-dom": "6.3.0"
  },

  import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
