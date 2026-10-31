import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export const isDbReady = () => mongoose.connection.readyState === 1;

/** Connects once; fails fast (rejects) if the cluster can't be reached within the timeout. */
export async function connectDB(uri) {
  mongoose.connection.on('disconnected', () => console.warn('[db] disconnected'));
  mongoose.connection.on('reconnected', () => console.info('[db] reconnected'));
  mongoose.connection.on('error', (err) => console.error('[db] error:', err.message));
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000, maxPoolSize: 5 });
  console.info(`[db] connected to "${mongoose.connection.name}"`);
}

export const disconnectDB = () => mongoose.disconnect();
