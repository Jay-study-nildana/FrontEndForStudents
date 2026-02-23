import React, { useEffect, useState } from "react";

// Helper to decode JWT and get exp
function getTokenExpiration(token: string): number | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    return payload.exp ? payload.exp : null;
  } catch {
    return null;
  }
}

function formatTimeLeft(seconds: number): string {
  if (seconds <= 0) return "Expired";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h > 0 ? h + ":" : ""}${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

interface TokenExpiryTimerProps {
  token: string;
}

const TokenExpiryTimer: React.FC<TokenExpiryTimerProps> = ({ token }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [expTime, setExpTime] = useState<Date | null>(null);

  useEffect(() => {
    if (token) {
      const exp = getTokenExpiration(token);
      if (exp) {
        setExpTime(new Date(exp * 1000));
        const update = () => {
          const now = Math.floor(Date.now() / 1000);
          setTimeLeft(exp - now);
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
      } else {
        setTimeLeft(null);
        setExpTime(null);
      }
    } else {
      setTimeLeft(null);
      setExpTime(null);
    }
  }, [token]);

  if (!expTime || timeLeft === null) return null;

  return (
    <div className="mt-2 text-xs bg-yellow-100 p-2 rounded">
      <strong>Access Token Expiry:</strong>
      <div>Expires in: {formatTimeLeft(timeLeft)}</div>
      <div>Expires at: {expTime.toLocaleString()}</div>
    </div>
  );
};

export default TokenExpiryTimer;
