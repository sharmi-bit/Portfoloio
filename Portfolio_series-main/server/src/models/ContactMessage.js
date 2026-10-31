import mongoose from 'mongoose';

export const LIMITS = { name: [2, 80], email: [5, 254], message: [10, 2000] };
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: LIMITS.name[0], maxlength: LIMITS.name[1] },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: LIMITS.email[1], match: EMAIL_RE },
    message: { type: String, required: true, trim: true, minlength: LIMITS.message[0], maxlength: LIMITS.message[1] },
  },
  { timestamps: true },
);

export const ContactMessage = mongoose.models.ContactMessage ?? mongoose.model('ContactMessage', contactMessageSchema);
