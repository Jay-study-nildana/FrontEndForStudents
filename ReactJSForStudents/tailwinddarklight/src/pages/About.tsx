// import React from "react";

export default function About() {
  return (
    <section className="py-6">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        This example site shows routing and Tailwind UI patterns.
      </p>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Team</h2>
          <ul className="list-none space-y-3">
            <li>
              <strong>Alice Johnson</strong>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Product
              </div>
            </li>
            <li>
              <strong>Bob Smith</strong>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Engineering
              </div>
            </li>
            <li>
              <strong>Carla Gomez</strong>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Design
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Project Info</h2>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-200 space-y-2">
            <li>Routing with React Router</li>
            <li>Styling with Tailwind CSS</li>
            <li>Simple layout using an Outlet</li>
          </ol>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Tech Versions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="text-gray-500">
                <th className="pb-2">Package</th>
                <th className="pb-2">Version</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2">React</td>
                <td className="py-2">19.x</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">Vite</td>
                <td className="py-2">7.x</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">Tailwind</td>
                <td className="py-2">3.x</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
