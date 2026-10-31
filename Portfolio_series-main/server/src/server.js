import { loadConfig, requireMongoUri } from './config.js';
import { connectDB, disconnectDB, isDbReady } from './db.js';
import { ContactMessage } from './models/ContactMessage.js';
import { createApp } from './app.js';

async function main() {
  const config = loadConfig();
  requireMongoUri(config);

  await connectDB(config.mongoUri); // throws if MongoDB can't be reached → process exits with a clear error
  const app = createApp({ config, ContactMessage, isDbReady });
  const server = app.listen(config.port, () => {
    console.info(`[api] listening on http://localhost:${config.port}  (CORS: ${config.clientOrigins.join(', ')})`);
  });

  const shutdown = async (signal) => {
    console.info(`[api] ${signal} received, shutting down…`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((err) => {
  console.error(`[api] failed to start: ${err.message}`);
  process.exit(1);
});
