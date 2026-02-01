import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const appFile = path.join(root, 'app', 'App.tsx');
const outDir = path.join(root, 'scripts', 'playwright-output');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const screenshotsDir = path.join(outDir, 'screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

const base = process.env.PLAYWRIGHT_BASE || 'http://localhost:5173';

function extractPaths() {
  const s = fs.readFileSync(appFile, 'utf8');
  const re = /path=\"([^\"]+)\"/g;
  const paths = new Set(['/']);
  let m;
  while ((m = re.exec(s)) !== null) {
    paths.add(m[1]);
  }
  // always include login/register
  paths.add('/login');
  paths.add('/register');
  return Array.from(paths).sort();
}

const roles = [
  { name: 'anon', user: null },
  { name: 'student', user: { id: 's1', name: 'Student Test', email: 's@test', role: 'student' } },
  { name: 'parent', user: { id: 'p1', name: 'Parent Test', email: 'p@test', role: 'parent' } },
  { name: 'tutor', user: { id: 't1', name: 'Tutor Test', email: 't@test', role: 'tutor' } },
  { name: 'admin', user: { id: 'a1', name: 'Admin Test', email: 'a@test', role: 'admin' } },
];

(async () => {
  const results = [];
  const paths = extractPaths();
  console.log('Routes to test:', paths.length);

  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const role of roles) {
    const page = await context.newPage();
    const roleResults = [];
    const logs = [];
    const errors = [];

    page.on('console', (msg) => {
      logs.push({ type: msg.type(), text: msg.text() });
    });
    page.on('pageerror', (err) => {
      errors.push({ message: err.message });
    });

    for (const p of paths) {
      try {
        // set localStorage via a small navigation to base
        await page.goto(base, { waitUntil: 'networkidle' });
        if (role.user) {
          await page.evaluate((u) => localStorage.setItem('genie-user', JSON.stringify(u)), role.user);
        } else {
          await page.evaluate(() => localStorage.removeItem('genie-user'));
        }
        const url = base + p;
        const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        const status = res ? res.status() : null;
        // wait a little for client-side rendering
        await page.waitForTimeout(500);
        const title = await page.title();
        const html = await page.content();
        const safePath = p === '/' ? 'root' : p.replace(/\//g, '_').replace(/^_/, '');
        const shotPath = path.join(screenshotsDir, `${role.name}__${safePath}.png`);
        await page.screenshot({ path: shotPath, fullPage: true });

        roleResults.push({ path: p, url, status, title, screenshot: shotPath, logs: logs.slice(), errors: errors.slice() });
        // clear logs for next route
        logs.length = 0;
        errors.length = 0;
      } catch (e) {
        roleResults.push({ path: p, error: e.message });
      }
    }

    results.push({ role: role.name, items: roleResults });
    await page.close();
  }

  await browser.close();
  const reportPath = path.join(outDir, 'report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log('Wrote report to', reportPath);
  process.exit(0);
})();
