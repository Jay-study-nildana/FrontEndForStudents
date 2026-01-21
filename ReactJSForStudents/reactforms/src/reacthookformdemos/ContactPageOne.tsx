// ...existing code...
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import type { JSX } from "react";

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const schema = Yup.object({
  name: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  phone: Yup.string()
    .matches(/^\+?\d{7,15}$/, "Invalid phone")
    .nullable()
    .notRequired(),
  message: Yup.string().min(10, "Too short").required("Message required"),
});

export default function ContactPageOne(): JSX.Element {
  // cast resolver to the form values resolver type to satisfy TS
  const resolver = yupResolver(schema) as unknown as Resolver<FormValues>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver,
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("contact submit", data);
    alert("Contact submitted");
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="text-sm text-slate-600">Send us a message and we'll get back to you shortly.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "error-name" : undefined}
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${errors.name ? "border-red-500" : "border-slate-300"} bg-white`}
            />
            {errors.name && (
              <p id="error-name" role="alert" className="mt-1 text-xs text-red-600">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "error-email" : undefined}
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${errors.email ? "border-red-500" : "border-slate-300"} bg-white`}
            />
            {errors.email && (
              <p id="error-email" role="alert" className="mt-1 text-xs text-red-600">
                {String(errors.email.message)}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "error-phone" : undefined}
            className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${errors.phone ? "border-red-500" : "border-slate-300"} bg-white`}
            placeholder="+1234567890"
          />
          {errors.phone && (
            <p id="error-phone" role="alert" className="mt-1 text-xs text-red-600">
              {String(errors.phone.message)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "error-message" : undefined}
            className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${errors.message ? "border-red-500" : "border-slate-300"} bg-white resize-vertical`}
          />
          {errors.message && (
            <p id="error-message" role="alert" className="mt-1 text-xs text-red-600">
              {String(errors.message.message ?? errors.message)}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 disabled:opacity-60 w-full sm:w-auto"
          >
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>

          <p className="text-sm text-slate-500 hidden sm:block">We typically respond within 1-2 business days.</p>
        </div>
      </form>
    </section>
  );
}
// ...existing code...