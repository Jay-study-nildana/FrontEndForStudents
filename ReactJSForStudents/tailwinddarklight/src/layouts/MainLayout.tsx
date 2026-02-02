// import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
