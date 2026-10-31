/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the portfolio API, e.g. http://localhost:5000 (see .env.example). */
  readonly VITE_API_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
