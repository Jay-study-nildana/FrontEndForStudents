import { useState, useEffect } from "react";
import type { JSX } from "react";
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type Preview = { url: string; name: string; type: string };

type FormValues = {
  displayName: string;
  avatar?: FileList | null;
  docs?: FileList | null;
};

const FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/gif", "application/pdf"];

const schema: Yup.ObjectSchema<any> = Yup.object({
  displayName: Yup.string().required("Display name required"),
  avatar: Yup.mixed()
    .test("fileSize", "File too large", (value: unknown) => {
      const v = value as FileList | undefined | null;
      if (!v || v.length === 0) return true;
      return Array.from(v).every((f) => f.size <= FILE_SIZE);
    })
    .test("fileType", "Unsupported file type", (value: unknown) => {
      const v = value as FileList | undefined | null;
      if (!v || v.length === 0) return true;
      return Array.from(v).every((f) => SUPPORTED_FORMATS.includes(f.type));
    }),
  docs: Yup.mixed().test("docsCount", "Max 3 files", (value: unknown) => {
    const v = value as FileList | undefined | null;
    if (!v || v.length === 0) return true;
    return v.length <= 3;
  }),
});

export default function ProfileUploadPageOne(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolver = yupResolver(schema) as unknown as Resolver<FormValues, any>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver,
    defaultValues: { displayName: "", avatar: undefined, docs: undefined },
    mode: "onTouched",
  });

  const avatarFiles = watch("avatar");
  const docsFiles = watch("docs");

  const [previews, setPreviews] = useState<Preview[]>([]);
  const [docPreviews, setDocPreviews] = useState<Preview[]>([]);

  useEffect(() => {
    if (!avatarFiles || avatarFiles.length === 0) {
      setPreviews([]);
      return;
    }
    const arr = Array.from(avatarFiles).map((f) => ({ url: URL.createObjectURL(f), name: f.name, type: f.type }));
    setPreviews(arr);
    return () => arr.forEach((a) => URL.revokeObjectURL(a.url));
  }, [avatarFiles]);

  useEffect(() => {
    if (!docsFiles || docsFiles.length === 0) {
      setDocPreviews([]);
      return;
    }
    const arr = Array.from(docsFiles).map((f) => ({ url: URL.createObjectURL(f), name: f.name, type: f.type }));
    setDocPreviews(arr);
    return () => arr.forEach((a) => URL.revokeObjectURL(a.url));
  }, [docsFiles]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("uploads", data);
    alert("Profile saved");
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <div className="bg-white/80 dark:bg-slate-900 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Profile & Uploads</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Set your display name and upload avatar / supporting documents.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Display Name</label>
            <input
              {...register("displayName")}
              className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${errors.displayName ? "border-red-500" : "border-slate-300"} bg-white dark:bg-slate-800`}
              placeholder="Your name"
              aria-invalid={!!errors.displayName}
            />
            {errors.displayName && (
              <p className="mt-1 text-xs text-red-600">{String(errors.displayName.message)}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Avatar (image)</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              {...register("avatar")}
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 dark:file:bg-slate-700"
              aria-invalid={!!errors.avatar}
            />
            {errors.avatar && <p className="mt-1 text-xs text-red-600">{String(errors.avatar.message)}</p>}

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {previews.map((p) => (
                <div key={p.url} className="flex flex-col items-center">
                  {p.type.startsWith("image/") ? (
                    <img src={p.url} alt={p.name} className="w-24 h-24 object-cover rounded-md border" />
                  ) : (
                    <a href={p.url} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm underline">
                      Preview {p.name}
                    </a>
                  )}
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 truncate w-24 text-center">{p.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Supporting docs (max 3)</label>
            <input
              type="file"
              accept=".pdf,image/*"
              multiple
              {...register("docs")}
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 dark:file:bg-slate-700"
              aria-invalid={!!errors.docs}
            />
            {errors.docs && <p className="mt-1 text-xs text-red-600">{String(errors.docs.message)}</p>}

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {docPreviews.map((d) => (
                <div key={d.url} className="flex flex-col items-center">
                  {d.type.startsWith("image/") ? (
                    <img src={d.url} alt={d.name} className="w-20 h-20 object-cover rounded-md border" />
                  ) : (
                    <a href={d.url} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm underline">
                      Open {d.name}
                    </a>
                  )}
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 truncate w-20 text-center">{d.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 disabled:opacity-60"
            >
              {isSubmitting ? "Saving…" : "Save Profile"}
            </button>

            <p className="text-sm text-slate-500 hidden sm:block">Files are previewed locally and not uploaded in this demo.</p>
          </div>
        </form>
      </div>
    </section>
  );
}