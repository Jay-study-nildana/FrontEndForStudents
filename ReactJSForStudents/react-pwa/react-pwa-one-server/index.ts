// ...existing code...
import dotenv from "dotenv";
import cors from 'cors'


import express from "express";
import bodyParser from "body-parser";
import webpush from "web-push";
import { sendPushToAll } from "./pushSender.ts";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors())

/* VAPID keys and contact read from .env */
const VAPID_PUBLIC = process.env.VAPID_PUBLIC ?? "";
const VAPID_PRIVATE = process.env.VAPID_PRIVATE ?? "";
const CONTACT = process.env.CONTACT ?? "";

if (!VAPID_PUBLIC || !VAPID_PRIVATE || !CONTACT) {
  throw new Error("Missing VAPID_PUBLIC, VAPID_PRIVATE or CONTACT in .env");
}

webpush.setVapidDetails(CONTACT, VAPID_PUBLIC, VAPID_PRIVATE);

const subscriptions: webpush.PushSubscription[] = [];

/* endpoint to receive background-synced payloads */
app.post("/api/sync", (req, res) => {
  console.log("sync payload received:", req.body);
  // simulate processing time
  setTimeout(() => res.json({ ok: true }), 500);
});

/* subscribe/unsubscribe endpoints */
app.post("/api/subscribe", (req, res) => {
  const sub = req.body;
  subscriptions.push(sub);
  res.json({ ok: true });
});
app.post("/api/unsubscribe", (req, res) => {
  const sub = req.body;
  const i = subscriptions.findIndex(
    (s) => JSON.stringify(s) === JSON.stringify(sub),
  );
  if (i >= 0) subscriptions.splice(i, 1);
  res.json({ ok: true });
});

/* trigger server-side push to all subs */
app.post("/api/sendNotification", async (req, res) => {
  const payload = req.body || { title: "Server Push", body: "Hello" };
  try {
    await sendPushToAll(subscriptions, payload);
    res.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message || e });
  }
});

app.listen(4000, () =>
  console.log("Server listening on http://localhost:4000"),
);
// ...existing code...
