import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { EMAIL_RE, LIMITS } from '../models/ContactMessage.js';

/** Returns { clean, errors }. Only plain strings within the limits are accepted. */
export function validateContact(body) {
  const errors = {};
  const clean = {};
  for (const field of ['name', 'email', 'message']) {
    const raw = body?.[field];
    if (typeof raw !== 'string') {
      errors[field] = 'This field is required.';
      continue;
    }
    const value = raw.trim();
    const [min, max] = LIMITS[field];
    if (value.length < min) errors[field] = `Must be at least ${min} characters.`;
    else if (value.length > max) errors[field] = `Must be at most ${max} characters.`;
    else if (field === 'email' && !EMAIL_RE.test(value)) errors[field] = 'Enter a valid email address.';
    else clean[field] = value;
  }
  return { clean, errors };
}

export function contactRouter({ ContactMessage, isDbReady }) {
  const router = Router();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { ok: false, message: 'Too many messages. Please try again later.' },
  });

  router.post('/', limiter, async (req, res, next) => {
    try {
      // Honeypot: real visitors never fill this hidden field. Pretend success, store nothing.
      if (typeof req.body?.website === 'string' && req.body.website.trim() !== '') {
        return res.status(201).json({ ok: true, message: 'Thanks — your message was sent.' });
      }
      const { clean, errors } = validateContact(req.body);
      if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });
      if (!isDbReady()) return res.status(503).json({ ok: false, message: 'The database is temporarily unavailable.' });

      await ContactMessage.create(clean);
      return res.status(201).json({ ok: true, message: 'Thanks — your message was sent.' });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
