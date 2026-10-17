// Static build: the game is a single HTML file, so "building" means copying it
// (with the manual and cover) into dist/. dist/index.html is the game itself.
import { cpSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'test-driver');
const out = join(root, 'dist');

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'test-driver'), { recursive: true });

for (const file of ['index.html', 'Test-Driver-Manual.pdf', 'cover.jpg']) {
  if (!existsSync(join(src, file))) throw new Error(`Missing test-driver/${file}`);
  cpSync(join(src, file), join(out, file));               // dist/index.html = the game
  cpSync(join(src, file), join(out, 'test-driver', file)); // keeps /test-driver/ links working
}

console.log('Build complete: dist/ ->', readdirSync(out).join(', '));
