// Minimal static file server (Node built-ins only, no network or packages needed).
// Usage: node scripts/serve.mjs [dir] [port]   — defaults: dist (or test-driver if dist is missing), 3000
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { join, extname, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const dirArg = process.argv[2] || (existsSync(join(root, 'dist')) ? 'dist' : 'test-driver');
const base = resolve(root, dirArg);
const port = Number(process.argv[3] || process.env.PORT || 3000);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.glb': 'model/gltf-binary', '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8'
};

createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = normalize(join(base, path));
  if (file !== base && !file.startsWith(base + sep)) { res.writeHead(403).end('Forbidden'); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found'); return; }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream', 'Content-Length': statSync(file).size });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Test Driver: http://localhost:${port}/  (serving ${dirArg}/)`));
