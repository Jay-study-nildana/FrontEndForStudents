// ...existing code...
import { useEffect, useState } from 'react';

const VAPID_PUBLIC_KEY = 'BBFHRyN-P8NVaQw8k6muVuvHb2JWvdJIal7jR0jkgEewANoXiuy1FUgK3-Y5VXv9cxJS2cLPfNijQ49Bhb8wdFA'; // replace

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export function usePushSubscription() {
  const [sub, setSub] = useState<PushSubscription | null>(null);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    (async () => {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
      const reg = await navigator.serviceWorker.ready;
      const existing = await reg.pushManager.getSubscription();
      setSub(existing);
      setPermission(Notification.permission);
    })();
    navigator.permissions?.query({ name: 'notifications' as PermissionName }).then(p => {
      p.onchange = () => setPermission(Notification.permission);
    }).catch(()=>{});
  }, []);

  async function subscribe() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) throw new Error('Push not supported');
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });
    // send subscription to server
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(sub),
      headers: { 'Content-Type': 'application/json' },
    });
    setSub(sub);
  }

  async function unsubscribe() {
    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    if (existing) {
      await fetch('/api/unsubscribe', {
        method: 'POST',
        body: JSON.stringify(existing),
        headers: { 'Content-Type': 'application/json' },
      }).catch(()=>{});
      await existing.unsubscribe();
      setSub(null);
    }
  }

  return { sub, permission, subscribe, unsubscribe };
}