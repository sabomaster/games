# Games

## Test Driver

![Test Driver cover](test-driver/cover.jpg)

Test Driver is a browser driving sim with realistic physics. At speed, the road turns to ice, a tyre blows out or cargo blocks your lane. Keep the car on the road, bring it back to a steady line and earn a score and medal. Snow, rain, night and a cockpit with working gauges.

- **Play:** run `npm start` (Node 18+, no packages to install) and open http://localhost:3000/ in a desktop browser with WebGL 2 (Chrome, Edge, Firefox, Safari). No internet connection is needed: three.js and lil-gui are bundled into [`test-driver/index.html`](test-driver/index.html), and the car model is in [`test-driver/assets/`](test-driver/assets/).
  Opening `index.html` directly from disk also works, but browsers block loading the car model from a file, so the simpler built-in car is used.
- **Manual:** [`test-driver/Test-Driver-Manual.pdf`](test-driver/Test-Driver-Manual.pdf)

### Project layout

| Path | What it is |
|---|---|
| `test-driver/index.html` | The game: one self-contained file (game code + three.js 0.169.0 + lil-gui 0.19.2) |
| `test-driver/assets/CarConcept.glb` | Car model (CC BY 4.0, see `CarConcept-LICENSE.txt`) |
| `test-driver/src/test-driver.source.html` | Readable source of the game (loads three.js and lil-gui from a CDN via an import map) |
| `scripts/build.mjs` | `npm run build`: copies the game, model, manual and cover to `dist/` |
| `scripts/serve.mjs` | `npm start`: tiny local web server (Node built-ins only), serves `dist/` or `test-driver/` |

### Controls

| Key | Action |
|---|---|
| W / S | Throttle / brake (hold S at a stop for reverse) |
| A / D | Steer |
| Space | Handbrake |
| C | Camera: Cockpit, Top, Chase |
| P / Esc | Pause |
| R | New run |
| 0 – 3 | Normal, ice patch, tyre blowout, obstacle |
| H | Telemetry panel |

Gamepads and steering wheels are supported. See the manual for details.

### Credits

Car model "Car Concept" by Eric Chadwick, Darmstadt Graphics Group GmbH, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), from the [Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets). Built with [three.js](https://threejs.org) and [lil-gui](https://lil-gui.georgealways.com).
