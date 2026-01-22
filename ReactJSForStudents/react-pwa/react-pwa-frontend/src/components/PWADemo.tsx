import type { JSX } from "react";
import NotificationCenter from "./NotificationCenter";
import SyncQueueViewer from "./SyncQueueViewer";

export default function PWADemo(): JSX.Element {
  return (
    <section className="prose lg:prose-xl p-6">
      <SyncQueueViewer />
      <NotificationCenter />
    </section>
  );
}
