// ...existing code...
import type { JSX } from "react";
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirm: string;
};

const schema: Yup.ObjectSchema<any> = Yup.object({
  username: Yup.string().min(3, "Minimum 3 characters").max(30, "Maximum 30 characters").required("Username required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(8, "Minimum 8 characters").required("Password required"),
  confirm: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm password"),
});

export default function RegisterPageOne(): JSX.Element {
  const resolver = yupResolver(schema) as unknown as Resolver<FormValues>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver,
    mode: "onTouched",
    defaultValues: { username: "", email: "", password: "", confirm: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("register", data);
    alert("Registered");
  };

  return (
    <section className="max-w-xl mx-auto p-6">
      <div className="bg-white/80 dark:bg-slate-900 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">Register with your email and a secure password.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Username
            </label>
            <input
              id="username"
              {...register("username")}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "error-username" : undefined}
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${errors.username ? "border-red-500" : "border-slate-300"} bg-white dark:bg-slate-800`}
              placeholder="johndoe"
            />
            {errors.username && (
              <p id="error-username" role="alert" className="mt-1 text-xs text-red-600">
                {String(errors.username.message)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "error-email" : undefined}
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${errors.email ? "border-red-500" : "border-slate-300"} bg-white dark:bg-slate-800`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p id="error-email" role="alert" className="mt-1 text-xs text-red-600">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "error-password" : undefined}
                className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500
                  ${errors.password ? "border-red-500" : "border-slate-300"} bg-white dark:bg-slate-800`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p id="error-password" role="alert" className="mt-1 text-xs text-red-600">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                {...register("confirm")}
                aria-invalid={!!errors.confirm}
                aria-describedby={errors.confirm ? "error-confirm" : undefined}
                className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500
                  ${errors.confirm ? "border-red-500" : "border-slate-300"} bg-white dark:bg-slate-800`}
                placeholder="••••••••"
              />
              {errors.confirm && (
                <p id="error-confirm" role="alert" className="mt-1 text-xs text-red-600">
                  {String(errors.confirm.message)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 disabled:opacity-60"
            >
              {isSubmitting ? "Creating…" : "Create account"}
            </button>

            <p className="text-sm text-slate-500 hidden sm:block">By registering you agree to our terms.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
// ...existing code...