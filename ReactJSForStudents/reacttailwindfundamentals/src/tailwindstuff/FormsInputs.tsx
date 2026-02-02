import React, { useRef, useState } from "react";
import type { JSX } from "react";

/**
 * FormsInputs.tsx
 *
 * A self-contained React + TypeScript component demonstrating common form controls and input patterns
 * styled with Tailwind CSS:
 * - Text inputs (name, email) with validation & accessible labels
 * - Password input with strength hint
 * - Select, radio group, checkboxes, and switch (toggle)
 * - Textarea with character count
 * - File input with preview (image)
 * - Range (slider) with live value
 * - Date input
 * - Inline / compact form row and responsive form layout
 * - Disabled states, helper text, error text, focus-visible rings
 *
 * Drop into src/components and render <FormsInputs />.
 *
 * Note: For production forms consider server-side validation and libraries (react-hook-form, zod) for robust handling.
 */

function isEmailValid(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function FormsInputs(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [subscribe, setSubscribe] = useState(false);
  const [bio, setBio] = useState("");
  const [rating, setRating] = useState(50);
  const [dob, setDob] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;    
    setFile(f);
    console.log("Selected file:", file);
    if (f && f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setFilePreview(url);
    } else {
      setFilePreview(null);
    }
  }

  function resetFile() {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function validate() {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Please enter your full name (min 2 characters).";
    if (!isEmailValid(email)) next.email = "Please provide a valid email address.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    if (!subscribe) next.subscribe = "You should opt-in to subscribe to demo updates.";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // demo: show alert — in real apps send to server
      alert(`Submitted:\nName: ${name}\nEmail: ${email}\nRole: ${role}\nBio: ${bio}`);
      // clear (for demo)
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setSubscribe(false);
      setBio("");
      setRating(50);
      setDob("");
      resetFile();
      setErrors({});
    }
  }

  const passwordStrength =
    password.length >= 12 ? "Strong" : password.length >= 9 ? "Good" : password.length >= 8 ? "Weak" : "Too short";
  const passwordColor =
    password.length >= 12 ? "bg-green-500" : password.length >= 9 ? "bg-yellow-400" : password.length >= 8 ? "bg-red-400" : "bg-red-300";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Forms & inputs</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Responsive grid: two columns on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <label className="flex flex-col text-sm">
                <span className="font-medium">Full name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className={`mt-1 block w-full rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 border ${
                    errors.name ? "border-red-300 dark:border-red-700" : "border-gray-300 dark:border-gray-700"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400`}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name ? (
                  <span id="name-error" className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.name}
                  </span>
                ) : (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter your first and last name.</span>
                )}
              </label>

              {/* Email */}
              <label className="flex flex-col text-sm">
                <span className="font-medium">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  className={`mt-1 block w-full rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 border ${
                    errors.email ? "border-red-300 dark:border-red-700" : "border-gray-300 dark:border-gray-700"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? (
                  <span id="email-error" className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.email}
                  </span>
                ) : (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">We’ll never share your email.</span>
                )}
              </label>
            </div>

            {/* Password with hint */}
            <label className="flex flex-col text-sm">
              <span className="font-medium">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="At least 8 characters"
                className={`mt-1 block w-full rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 border ${
                  errors.password ? "border-red-300 dark:border-red-700" : "border-gray-300 dark:border-gray-700"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400`}
                aria-invalid={Boolean(errors.password)}
                aria-describedby="password-hint"
              />
              <div className="flex items-center justify-between mt-1">
                <span id="password-hint" className="text-xs text-gray-500 dark:text-gray-400">
                  {password.length > 0 ? `Strength: ${passwordStrength}` : "Choose a strong password."}
                </span>
                {password.length > 0 && (
                  <div className="w-24 h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <div className={`${passwordColor} h-2`} style={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }} />
                  </div>
                )}
              </div>
              {errors.password && (
                <span className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.password}</span>
              )}
            </label>

            {/* Role (radio) and Subscribe (checkbox/switch) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Role</legend>
                <div className="flex gap-3 items-center">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={role === "user"}
                      onChange={() => setRole("user")}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-400"
                    />
                    User
                  </label>

                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={role === "admin"}
                      onChange={() => setRole("admin")}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-400"
                    />
                    Admin
                  </label>
                </div>
              </fieldset>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Checkbox */}
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={subscribe}
                      onChange={(e) => setSubscribe(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-400"
                    />
                    <span>Subscribe to updates</span>
                  </label>
                </div>

                {/* Switch (aria-checked) */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Notifications</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={subscribe}
                    onClick={() => setSubscribe((s) => !s)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus-visible:ring-2 ${
                      subscribe ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        subscribe ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Textarea with char count */}
            <label className="flex flex-col text-sm">
              <span className="font-medium">Bio</span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="A short bio..."
                className="mt-1 block w-full rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                maxLength={280}
                aria-describedby="bio-count"
              />
              <div id="bio-count" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {bio.length}/280
              </div>
            </label>

            {/* File input and preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <label className="flex flex-col text-sm">
                <span className="font-medium">Avatar (image)</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-indigo-600 file:text-white file:cursor-pointer"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG / JPG up to 2MB (demo only)</div>
              </label>

              <div className="flex items-center gap-3">
                {filePreview ? (
                  <div className="w-24 h-24 rounded overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img src={filePreview} alt="preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded bg-gray-100 dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs text-gray-500">
                    No preview
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm"
                  >
                    Choose file
                  </button>
                  <button
                    type="button"
                    onClick={resetFile}
                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Range + date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">Rating (slider)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="w-12 text-sm text-center">{rating}</div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Use the slider to set a value.</div>
              </div>

              <label className="flex flex-col text-sm">
                <span className="font-medium">Date of birth</span>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="mt-1 block w-full rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optional</span>
              </label>
            </div>

            {/* Inline actions */}
            <div className="flex items-center gap-3">
              <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white">
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setName("");
                  setEmail("");
                  setPassword("");
                  setRole("user");
                  setSubscribe(false);
                  setBio("");
                  setRating(50);
                  setDob("");
                  resetFile();
                  setErrors({});
                }}
                className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => {
                  // Quick demo fill
                  setName("Demo User");
                  setEmail("demo@example.com");
                  setPassword("supersecret12");
                  setRole("admin");
                  setSubscribe(true);
                  setBio("This is a short demo bio.");
                }}
                className="ml-auto px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm"
              >
                Fill demo
              </button>
            </div>

            {/* Global form error */}
            {Object.keys(errors).length > 0 && (
              <div className="text-sm text-red-700 dark:text-red-400">
                Please correct the highlighted fields above.
              </div>
            )}
          </form>
        </section>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tip: use the official forms plugin (@tailwindcss/forms) for better base styling, but these utility classes
          work without it as well.
        </div>
      </div>
    </div>
  );
}