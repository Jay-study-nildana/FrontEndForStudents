// ...existing code...
import type { JSX } from "react";

export default function Contact(): JSX.Element {
  return (
    <section className="p-6 prose lg:prose-lg min-w-0 mx-0 max-w-full">
      <h2 className="text-3xl font-extrabold">Contact Us</h2>
      <p className="text-slate-600 dark:text-slate-300">
        We’re here to help. Reach out with questions, feedback, or partnership inquiries and we’ll get back to you within one business day.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold text-lg">Support</h3>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            Email: <a href="mailto:support@example.com" className="text-indigo-600">support@example.com</a><br />
            Phone: <a href="tel:+1234567890" className="text-indigo-600">+1 (234) 567-890</a>
          </p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Support hours: Mon–Fri, 9:00 AM – 6:00 PM (local time)</p>
        </div>

        <div className="rounded-lg p-6 bg-white/80 dark:bg-slate-800 shadow">
          <h3 className="font-semibold text-lg">Head Office</h3>
          <address className="not-italic mt-2 text-sm text-slate-700 dark:text-slate-300">
            123 Tailwind Lane<br />
            Suite 400<br />
            Example City, EX 12345<br />
            Country
          </address>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            For media or partnership requests, please email <a href="mailto:partnerships@example.com" className="text-indigo-600">partnerships@example.com</a>.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg p-6 bg-linear-to-br from-amber-50 to-rose-50 dark:from-slate-900 dark:to-slate-800 shadow">
        <h3 className="font-semibold">Quick links</h3>
        <ul className="mt-2 text-sm text-slate-700 dark:text-slate-300 space-y-1">
          <li><a href="#" className="text-indigo-600">Help Center</a></li>
          <li><a href="#" className="text-indigo-600">Privacy & Terms</a></li>
          <li><a href="#" className="text-indigo-600">Status</a></li>
        </ul>
      </div>
    </section>
  );
}
// ...existing code...