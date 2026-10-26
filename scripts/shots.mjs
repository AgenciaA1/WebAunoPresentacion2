// Dev helper: screenshots every section at a given width. Usage: node scripts/shots.mjs <outDir> [width]
import puppeteer from 'puppeteer-core';
const [out, width = '1440'] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage();
const errors = [];
page.on('console', m => ['error', 'warn'].includes(m.type()) && errors.push(m.text()));
page.on('pageerror', e => errors.push(e.message));
await page.setViewport({ width: +width, height: width < 768 ? 812 : 900 });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 4000));
await page.screenshot({ path: `${out}/${width}-0-hero.png` });
for (const id of ['nosotros', 'estadisticas', 'portfolio', 'clientes', 'equipo', 'contacto']) {
  await page.evaluate(id => { document.documentElement.style.scrollBehavior = 'auto'; document.getElementById(id).scrollIntoView(); }, id);
  await new Promise(r => setTimeout(r, 3500));
  await page.screenshot({ path: `${out}/${width}-${id}.png` });
}
if (process.argv[4] === 'dialog') {
  await page.evaluate(() => { document.getElementById('portfolio').scrollIntoView(); });
  await new Promise(r => setTimeout(r, 1500));
  await page.click('#portfolio ol button');
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `${out}/${width}-dialog.png` });
}
console.log('errors:', errors);
await browser.close();
