// import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import type { JSX } from "react";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}