// ...existing code...
import webpush from 'web-push';

export async function sendPushToAll(subs: webpush.PushSubscription[], payload: any) {
  const promises = subs.map(s => webpush.sendNotification(s, JSON.stringify(payload)).catch(err => {
    console.warn('Push failed for sub, removing', err);
    return null;
  }));
  await Promise.all(promises);
}