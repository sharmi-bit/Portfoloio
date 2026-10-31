import { useEffect, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { submitContact } from '../lib/api';
import { EASE } from './fx';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-bone placeholder:text-smoke outline-none transition focus:border-crimson-2 focus:bg-white/[0.08] aria-[invalid=true]:border-crimson';

/** "Let’s Build" contact form — sends to the backend API (POST /api/contact), which validates and stores it in MongoDB. */
export default function ContactModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;
    const data = new FormData(e.currentTarget);
    setStatus('loading');
    setMessage('');
    setFieldErrors({});
    const res = await submitContact({
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      website: String(data.get('website') ?? ''),
    });
    if (res.ok) {
      setStatus('success');
      setMessage(res.message);
    } else {
      setStatus('error');
      setMessage(res.message);
      setFieldErrors(res.fieldErrors ?? {});
    }
  }

  const err = (f: string) => fieldErrors[f];

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/85 px-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
      onClick={onClose}
    >
      <motion.div
        className="max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-2xl bg-ink-2 p-6 ring-1 ring-white/10 sm:p-8"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-crimson-2">The Next Episode</p>
            <h3 className="mt-2 font-display text-4xl leading-none text-bone">Let’s Build</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact form"
            data-cursor="close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        {status === 'success' ? (
          <div className="py-10 text-center" role="status">
            <p className="text-4xl text-crimson-2">✓</p>
            <p className="mt-4 text-lg font-semibold text-bone">{message}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-bold tracking-[0.12em] text-bone transition hover:border-bone hover:bg-white/10"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label htmlFor="cf-name" className="mb-1.5 block text-xs font-semibold tracking-[0.2em] text-mist">NAME</label>
              <input id="cf-name" name="name" type="text" autoComplete="name" maxLength={80} placeholder="Your name" autoFocus
                aria-invalid={!!err('name')} aria-describedby={err('name') ? 'cf-name-err' : undefined} className={inputClass} />
              {err('name') && <p id="cf-name-err" className="mt-1 text-xs text-crimson-2">{err('name')}</p>}
            </div>
            <div>
              <label htmlFor="cf-email" className="mb-1.5 block text-xs font-semibold tracking-[0.2em] text-mist">EMAIL</label>
              <input id="cf-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com"
                aria-invalid={!!err('email')} aria-describedby={err('email') ? 'cf-email-err' : undefined} className={inputClass} />
              {err('email') && <p id="cf-email-err" className="mt-1 text-xs text-crimson-2">{err('email')}</p>}
            </div>
            <div>
              <label htmlFor="cf-message" className="mb-1.5 block text-xs font-semibold tracking-[0.2em] text-mist">MESSAGE</label>
              <textarea id="cf-message" name="message" rows={5} maxLength={2000} placeholder="What would you like to build together?"
                aria-invalid={!!err('message')} aria-describedby={err('message') ? 'cf-message-err' : undefined} className={`${inputClass} resize-y`} />
              {err('message') && <p id="cf-message-err" className="mt-1 text-xs text-crimson-2">{err('message')}</p>}
            </div>

            {/* Honeypot — hidden from people, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
            </div>

            {status === 'error' && message && (
              <p role="alert" className="rounded-md bg-crimson/15 px-4 py-3 text-sm text-bone ring-1 ring-crimson/40">{message}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              data-cursor="play"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-crimson px-7 text-sm font-bold tracking-[0.12em] text-white shadow-[0_0_40px_rgba(229,19,43,0.4)] transition hover:bg-crimson-2 disabled:cursor-wait disabled:opacity-70"
            >
              {status === 'loading' ? 'SENDING…' : <><span>▶</span> SEND MESSAGE</>}
            </button>
            <p className="text-center text-xs text-smoke">
              Prefer email?{' '}
              <a href={`mailto:${profile.email}`} className="text-mist underline-offset-4 hover:text-bone hover:underline">{profile.email}</a>
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
