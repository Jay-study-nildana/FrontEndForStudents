import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import F1Footer from "./LandingPage/F1Footer";
import type { JSX } from "react";

export default function MainLayout(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-linear-to-br from-sky-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      <div className="w-full px-2 flex flex-col flex-1 min-w-0">
        <Navbar />

        <main className="w-full pb-12 flex-1 mt-10">
          <div className="rounded-2xl p-6 bg-white/80 dark:bg-slate-800 shadow-md h-full min-w-0 bg-red-700">
            <Outlet />
          </div>
        </main>

        <F1Footer />
      </div>
    </div>
  );
}
