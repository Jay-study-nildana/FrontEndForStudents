import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: true,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // simulate submission
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="py-6">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Have questions? Send us a message.
      </p>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="grid gap-3">
          <label className="flex flex-col">
            <span className="text-sm font-medium">Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded mt-1"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium">Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="border p-2 rounded mt-1"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="border p-2 rounded mt-1"
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              name="subscribe"
              type="checkbox"
              checked={form.subscribe}
              onChange={handleChange}
            />
            <span className="text-sm">Subscribe to updates</span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Send message
            </button>
            <button
              type="button"
              onClick={() =>
                setForm({ name: "", email: "", message: "", subscribe: true })
              }
              className="px-4 py-2 border rounded-md"
            >
              Reset
            </button>
            {submitted && <span className="text-green-600">Message sent!</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
