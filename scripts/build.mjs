// Static build: the game is one self-contained HTML file (three.js and lil-gui are bundled in)
// plus the car model. "Building" copies them to dist/, which is served as the site root.
import { cpSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const src = join(root, 'test-driver');
const out = join(root, 'dist');
const required = ['index.html', 'assets/CarConcept.glb', 'Test-Driver-Manual.pdf', 'cover.jpg'];
for (const f of required) if (!existsSync(join(src, f))) throw new Error(`Missing test-driver/${f}`);

rmSync(out, { recursive: true, force: true });
cpSync(src, out, { recursive: true, filter: (p) => !p.includes(`${join(src, 'src')}`) });
console.log('Build complete: dist/ ->', readdirSync(out).join(', '));
