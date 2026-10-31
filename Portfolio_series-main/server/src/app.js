import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { contactRouter } from './routes/contact.js';

/**
 * Builds the Express app. Dependencies are injectable so the API can be tested without a database.
 * Only the endpoints below exist — nothing exposes stored messages.
 */
export function createApp({ config, ContactMessage, isDbReady }) {
  const app = express();
  app.disable('x-powered-by');
  if (config.trustProxy) app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      // Allow only the configured frontend origins (requests with no Origin, e.g. curl, are not browser CORS requests).
      origin(origin, cb) {
        if (!origin || config.clientOrigins.includes(origin)) return cb(null, true);
        return cb(null, false);
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
      maxAge: 600,
    }),
  );
  app.use(express.json({ limit: '10kb' }));

  app.get('/api/health', (_req, res) => {
    const connected = isDbReady();
    res.status(200).json({ ok: connected, db: connected ? 'connected' : 'disconnected' });
  });

  app.use('/api/contact', contactRouter({ ContactMessage, isDbReady }));

  app.use((_req, res) => res.status(404).json({ ok: false, message: 'Not found.' }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    if (err?.type === 'entity.parse.failed') return res.status(400).json({ ok: false, message: 'Invalid JSON body.' });
    if (err?.type === 'entity.too.large') return res.status(413).json({ ok: false, message: 'Request body too large.' });
    console.error('[api] unhandled error:', err?.message);
    return res.status(500).json({ ok: false, message: 'Internal server error.' });
  });

  return app;
}
