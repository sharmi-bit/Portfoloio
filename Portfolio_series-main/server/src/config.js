import 'dotenv/config';

/** Reads and validates configuration. Throws with a clear message instead of failing later. */
export function loadConfig(env = process.env) {
  const mongoUri = (env.MONGODB_URI ?? '').trim();
  const port = Number(env.PORT ?? 5000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error(`Invalid PORT: ${env.PORT}`);

  const clientOrigins = (env.CLIENT_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  return { mongoUri, port, clientOrigins, trustProxy: env.TRUST_PROXY === '1' };
}

/** The server cannot start without a database URI. */
export function requireMongoUri(config) {
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI is not set. Copy server/.env.example to server/.env and add your MongoDB connection string.');
  }
  if (!/^mongodb(\+srv)?:\/\//.test(config.mongoUri)) {
    throw new Error('MONGODB_URI must start with mongodb:// or mongodb+srv://');
  }
}
