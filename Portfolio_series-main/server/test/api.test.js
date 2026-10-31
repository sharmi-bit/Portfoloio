import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { loadConfig, requireMongoUri } from '../src/config.js';

// These tests exercise the API logic with an in-memory stand-in for the model.
// They do NOT prove a real MongoDB connection — see README for how to verify that with your Atlas URI.
const config = { mongoUri: 'x', port: 0, clientOrigins: ['http://localhost:5173'], trustProxy: false };

async function start({ dbReady = true } = {}) {
  const saved = [];
  const ContactMessage = { create: async (doc) => saved.push(doc) };
  const app = createApp({ config, ContactMessage, isDbReady: () => dbReady });
  const server = await new Promise((r) => { const s = app.listen(0, () => r(s)); });
  const base = `http://127.0.0.1:${server.address().port}`;
  return { base, saved, close: () => new Promise((r) => server.close(r)) };
}
const post = (base, body, headers = {}) =>
  fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
const valid = { name: 'Asha Rao', email: 'Asha@Example.com', message: 'Hello, I would like to talk about an internship.' };

test('health reports db state', async () => {
  const up = await start({ dbReady: true });
  let r = await fetch(`${up.base}/api/health`);
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true, db: 'connected' });
  await up.close();
  const down = await start({ dbReady: false });
  r = await fetch(`${down.base}/api/health`);
  assert.deepEqual(await r.json(), { ok: false, db: 'disconnected' });
  await down.close();
});

test('valid contact is stored (trimmed) and returns 201', async () => {
  const s = await start();
  const r = await post(s.base, { ...valid, name: '  Asha Rao  ' });
  assert.equal(r.status, 201);
  assert.equal(s.saved.length, 1);
  assert.equal(s.saved[0].name, 'Asha Rao');
  await s.close();
});

test('invalid input returns 400 with field errors and stores nothing', async () => {
  const s = await start();
  const r = await post(s.base, { name: 'A', email: 'nope', message: 'short' });
  assert.equal(r.status, 400);
  const body = await r.json();
  assert.deepEqual(Object.keys(body.errors).sort(), ['email', 'message', 'name']);
  assert.equal(s.saved.length, 0);
  assert.equal((await post(s.base, { name: 123, email: {}, message: [] })).status, 400); // wrong types
  await s.close();
});

test('database down returns 503, malformed JSON returns 400, unknown route 404', async () => {
  const down = await start({ dbReady: false });
  assert.equal((await post(down.base, valid)).status, 503);
  assert.equal((await post(down.base, '{bad json')).status, 400);
  assert.equal((await fetch(`${down.base}/api/nope`)).status, 404);
  await down.close();
});

test('honeypot submissions are accepted silently but not stored', async () => {
  const s = await start();
  const r = await post(s.base, { ...valid, website: 'http://spam.example' });
  assert.equal(r.status, 201);
  assert.equal(s.saved.length, 0);
  await s.close();
});

test('CORS: allowed origin is echoed, other origins get no CORS header', async () => {
  const s = await start();
  let r = await fetch(`${s.base}/api/health`, { headers: { Origin: 'http://localhost:5173' } });
  assert.equal(r.headers.get('access-control-allow-origin'), 'http://localhost:5173');
  r = await fetch(`${s.base}/api/health`, { headers: { Origin: 'https://evil.example' } });
  assert.equal(r.headers.get('access-control-allow-origin'), null);
  r = await fetch(`${s.base}/api/contact`, { method: 'OPTIONS', headers: { Origin: 'http://localhost:5173', 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' } });
  assert.equal(r.status, 204);
  await s.close();
});

test('rate limit: the 6th contact request in a window is rejected with 429', async () => {
  const s = await start();
  const codes = [];
  for (let i = 0; i < 6; i++) codes.push((await post(s.base, valid)).status);
  assert.deepEqual(codes, [201, 201, 201, 201, 201, 429]);
  await s.close();
});

test('config: MONGODB_URI is required and validated; secrets are never defaulted', () => {
  assert.throws(() => requireMongoUri(loadConfig({})), /MONGODB_URI is not set/);
  assert.throws(() => requireMongoUri(loadConfig({ MONGODB_URI: 'http://wrong' })), /must start with mongodb/);
  assert.doesNotThrow(() => requireMongoUri(loadConfig({ MONGODB_URI: 'mongodb://localhost:27017/x' })));
  assert.deepEqual(loadConfig({ CLIENT_ORIGINS: 'https://a.com/, https://b.com' }).clientOrigins, ['https://a.com', 'https://b.com']);
});
