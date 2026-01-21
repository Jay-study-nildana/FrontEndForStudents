
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import type { JSX } from "react";

type FormValues = {
  ageBracket: string;
  interests: string[];
  agree: boolean;
  notes?: string;
};

const schema: Yup.ObjectSchema<FormValues> = Yup.object({
  ageBracket: Yup.string().required("Choose one"),
  interests: Yup.array().of(Yup.string()).min(1, "Pick at least one").required(),
  agree: Yup.boolean().oneOf([true], "You must agree").required(),
  notes: Yup.string().max(500).notRequired(),
}) as Yup.ObjectSchema<FormValues>;

export default function SurveyPageOne(): JSX.Element {
  const resolver = yupResolver(schema) as unknown as Resolver<FormValues, any>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver,
    defaultValues: { interests: [], agree: false },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("survey", data);
    alert("Survey submitted");
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <div className="bg-white/90 dark:bg-slate-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">Survey</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Share a few quick details — all fields validated with Yup.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">Age</legend>
            <div className="flex gap-4 flex-wrap">
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="under18" {...register("ageBracket")} className="form-radio" />
                <span className="text-sm">Under 18</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="18-35" {...register("ageBracket")} className="form-radio" />
                <span className="text-sm">18-35</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" value="35plus" {...register("ageBracket")} className="form-radio" />
                <span className="text-sm">35+</span>
              </label>
            </div>
            {errors.ageBracket && <p className="text-xs text-red-600">{String(errors.ageBracket.message)}</p>}
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">Interests (select at least one)</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" value="sports" {...register("interests")} className="form-checkbox" />
                <span className="text-sm">Sports</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" value="tech" {...register("interests")} className="form-checkbox" />
                <span className="text-sm">Tech</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" value="music" {...register("interests")} className="form-checkbox" />
                <span className="text-sm">Music</span>
              </label>
            </div>
            {errors.interests && <p className="text-xs text-red-600">{String(errors.interests.message)}</p>}
          </fieldset>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              {...register("notes")}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical"
              placeholder="Anything else you'd like to add (max 500 chars)"
            />
            {errors.notes && <p className="text-xs text-red-600">{String(errors.notes.message)}</p>}
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register("agree")} className="form-checkbox" />
              <span className="text-sm">I agree to terms</span>
            </label>
            {errors.agree && <p className="text-xs text-red-600">{String(errors.agree.message)}</p>}
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit Survey"}
            </button>

            <p className="text-sm text-slate-500 hidden sm:block">Responses are saved locally in this demo.</p>
          </div>
        </form>
      </div>
    </section>
  );
}