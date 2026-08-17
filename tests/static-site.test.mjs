import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const distRoot = new URL("../dist/", import.meta.url);

test("builds a complete static portfolio", async () => {
  const html = await readFile(new URL("index.html", distRoot), "utf8");
  assert.match(html, /<title>Phurinat Khrueatan — Software Engineering × GIS<\/title>/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /\.\/assets\/[^"']+\.js/);
  assert.match(html, /\.\/assets\/[^"']+\.css/);
  await Promise.all([
    access(new URL(".nojekyll", distRoot)),
    access(new URL("favicon.svg", distRoot)),
    access(new URL("og.png", distRoot)),
  ]);
  const assets = await readdir(new URL("assets/", distRoot));
  assert.ok(assets.some((file) => file.endsWith(".js")));
  assert.ok(assets.some((file) => file.endsWith(".css")));
});

test("includes the official GitHub Pages deployment workflow", async () => {
  const workflow = await readFile(new URL(".github/workflows/deploy-pages.yml", projectRoot), "utf8");
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /pages:\s*write/);
  assert.match(workflow, /id-token:\s*write/);
});
