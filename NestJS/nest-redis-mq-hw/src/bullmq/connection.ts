import { ConnectionOptions } from 'bullmq';

export function createRedisConnection(): ConnectionOptions {
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error('REDIS_URL is not defined');
  }

  const u = new URL(url);
  const opts: ConnectionOptions = {
    host: u.hostname || undefined,
    port: u.port ? parseInt(u.port, 10) : undefined,
    username: u.username || undefined,
    password: u.password || undefined,
    tls: u.protocol === 'rediss:' ? {} : undefined,
  };

  // remove undefined keys
  Object.keys(opts).forEach((k) => (opts as any)[k] === undefined && delete (opts as any)[k]);

  return opts;
}