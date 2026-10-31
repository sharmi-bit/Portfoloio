import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE } from './fx';

/** Full-screen player for the self-introduction video. Rendered in a portal so it isn't clipped by transformed section wrappers. */
export default function VideoModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Introduction video"
      onClick={onClose}
    >
      <div className="gutter flex h-16 shrink-0 items-center justify-between gap-3 pt-[env(safe-area-inset-top)]">
        <p className="truncate font-display text-2xl tracking-wide text-bone">Meet {profile.firstName.charAt(0) + profile.firstName.slice(1).toLowerCase()}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          data-cursor="close"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20"
        >
          ✕
        </button>
      </div>
      <motion.div
        className="gutter flex min-h-0 flex-1 items-center justify-center pb-6"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <video
          poster={profile.introVideo.poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          onClick={(e) => e.stopPropagation()}
          className="max-h-full w-full max-w-5xl rounded-xl bg-black"
        >
          <source src={profile.introVideo.src} type="video/mp4" />
          <source src={profile.introVideo.webm} type="video/webm" />
        </video>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
