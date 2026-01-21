import { useEffect, useState } from "react";
import type { JSX } from "react";

export default function UseEffectPage(): JSX.Element {
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState("waiting...");

  useEffect(() => {
    setStatus("mounted — starting timer");
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    const fakeFetch = setTimeout(() => setStatus("fake fetch complete"), 1500);

    return () => {
      clearInterval(id);
      clearTimeout(fakeFetch);
      setStatus("unmounted — cleaned up");
    };
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-2">useEffect demo</h2>
      <p className="mb-2">Seconds since mount: <strong>{time}</strong></p>
      <p className="mb-4">Status: {status}</p>
      <p className="text-sm text-slate-500">Placeholder: observe the timer and cleanup when navigating away.</p>
    </main>
  );
}