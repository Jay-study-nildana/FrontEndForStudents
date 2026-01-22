// ...existing code...
import { useEffect, useState } from "react";
import { usePushSubscription } from "../hooks/usePushSubscription";

export default function NotificationCenter() {
  const { sub, permission, subscribe, unsubscribe } = usePushSubscription();
  const [messages, setMessages] = useState<any[]>([]);
  const [title, setTitle] = useState("Server Push");
  const [body, setBody] = useState("Hello");

  useEffect(() => {
    navigator.serviceWorker?.addEventListener("message", (ev: any) => {
      if (ev.data?.type === "PUSH_MESSAGE")
        setMessages((m) => [ev.data.payload, ...m]);
    });
    // capture notifications shown by service worker by listening to clients
    (navigator.serviceWorker as any)?.getRegistration?.().then((reg: any) => {
      // no-op
      console.log("SW registration for NotificationCenter", reg);
    });
  }, []);

  async function sendTestPush() {
    const payload = { title, body };
    await fetch("/api/sendNotification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 12,
        borderRadius: 6,
        marginTop: 12,
      }}
    >
      <h3>Push Notifications</h3>
      <div>Permission: {permission}</div>
      <div>Subscription: {sub ? "active" : "none"}</div>
      <div
        style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}
      >
        <button onClick={() => (sub ? unsubscribe() : subscribe())}>
          {sub ? "Unsubscribe" : "Subscribe"}
        </button>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginLeft: 8,
          }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notification title"
          />
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Notification body"
          />
          <button onClick={sendTestPush} style={{ marginLeft: 8 }}>
            Send Test Push (server)
          </button>
        </div>
      </div>
      <h4>Received messages</h4>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{JSON.stringify(m)}</li>
        ))}
        {messages.length === 0 && (
          <li>
            <i>No messages yet</i>
          </li>
        )}
      </ul>
    </div>
  );
}
