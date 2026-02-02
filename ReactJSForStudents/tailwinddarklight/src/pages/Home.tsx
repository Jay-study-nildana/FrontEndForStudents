import { useState } from "react";

export default function Home() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="py-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Home</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Overview, quick stats and actions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 space-y-2">
            <li>View latest metrics</li>
            <li>Manage account settings</li>
            <li>Visit documentation</li>
          </ul>
          {/* buttons moved to a dedicated Actions section below */}
        </div>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Summary Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="pb-2">Metric</th>
                  <th className="pb-2">Value</th>
                  <th className="pb-2">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-2">Users</td>
                  <td className="py-2 font-medium">12,345</td>
                  <td className="py-2 text-green-600">+4.2%</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">Sessions</td>
                  <td className="py-2 font-medium">23,456</td>
                  <td className="py-2 text-red-600">-1.1%</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">Conversion</td>
                  <td className="py-2 font-medium">3.8%</td>
                  <td className="py-2 text-green-600">+0.6%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-3">More Details</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Toggle to reveal a sample details block and interactive form.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={showMore}
              onChange={() => setShowMore(!showMore)}
            />
            <span className="text-sm">Show extra content</span>
          </label>
        </div>

        {showMore && (
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Extra Content</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              This is additional content revealed by the toggle. You can place
              any UI here.
            </p>
            <form className="grid gap-3 md:grid-cols-2">
              <input placeholder="First name" className="border p-2 rounded" />
              <input placeholder="Last name" className="border p-2 rounded" />
              <input
                placeholder="Email"
                className="border p-2 rounded md:col-span-2"
              />
              <button
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded md:col-span-2"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="mt-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Actions</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Primary and secondary actions moved here for consistent layout.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Primary
          </button>
          <button className="px-4 py-2 border rounded-md">Secondary</button>
        </div>
      </div>
    </section>
  );
}
