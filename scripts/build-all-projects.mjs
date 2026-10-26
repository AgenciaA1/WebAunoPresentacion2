// Propuesta 2: builds EVERY project folder in "Mockups proyectos" into
// public/all/<slug>/NN.webp + src/data/all-projects.json (texts parsed from each .docx).
// Re-run whenever folders are added: node scripts/build-all-projects.mjs
import sharp from 'sharp';
import JSZip from 'jszip';
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('..', 'Mockups proyectos  - Agencia A1 2026');
const OUT = path.resolve('public', 'all');
const SKIP = new Set(['Mosaico proyectos']);
const SPLIT = { 'AXIM - NOTTS': ['Axim', 'Notts'] }; // folders that hold several projects
const IMG = /\.(jpe?g|png)$/i;
const MAX_IMAGES = 8;

const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const cleanName = s =>
  s.replace(/\s*-\s*(publicado|mockups?.*)$/i, '').replace(/^web\s+/i, '').replace(/\s+/g, ' ').trim()
    .replace(/\b([A-ZÁÉÍÓÚ]{3,})\b/g, w => w[0] + w.slice(1).toLowerCase());

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}

async function docxParagraphs(file) {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const xml = await zip.file('word/document.xml').async('string');
  return xml.split('</w:p>').map(p =>
    p.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim(),
  ).filter(Boolean);
}

function parseText(paras, fallbackTitle) {
  let title = fallbackTitle;
  let category = '';
  const services = [];
  const body = [];
  let inServices = false;
  for (const p of paras) {
    if (/^textos?\b/i.test(p) || p.toLowerCase() === fallbackTitle.toLowerCase() || /^copy:?$/i.test(p) || p.length < 6) continue;
    if (p.includes(' | ') && p.length < 140) {
      let [t, c] = p.split(' | ');
      if (c.split(' ').length <= 2 && t.length > c.length) [t, c] = [c, t]; // "Category | Name" order
      title = t.trim();
      category = c.trim();
      continue;
    }
    if (/^servicios desarrollados/i.test(p)) {
      const after = p.split(':')[1];
      if (after) services.push(...after.split('·').map(s => s.trim().replace(/\.$/, '')).filter(Boolean));
      else inServices = true;
      continue;
    }
    if (inServices && p.length < 120) { services.push(p.replace(/\.$/, '')); continue; }
    inServices = false;
    if (!category && p.includes('·') && p.length < 120) { category = p; continue; }
    if (p.length > 60) body.push(p.replace(/^"|"$/g, ''));
  }
  const summary = (body[0] ?? '').split(/(?<=\.)\s/)[0];
  return { title, category: category.replace(/ & /g, ' · '), services, body, summary };
}

const projects = [];
for (const folder of fs.readdirSync(SRC).filter(f => !SKIP.has(f) && fs.statSync(path.join(SRC, f)).isDirectory()).sort()) {
  const units = SPLIT[folder] ? SPLIT[folder].map(s => [path.join(folder, s), s]) : [[folder, cleanName(folder)]];
  for (const [rel, name] of units) {
    const dir = path.join(SRC, rel);
    const files = walk(dir);
    const imgs = files.filter(f => IMG.test(f) && !/\(1\)\.\w+$/.test(f)).sort().slice(0, MAX_IMAGES);
    if (!imgs.length) continue;
    const docx = files.find(f => /\.docx$/i.test(f));
    const text = docx ? parseText(await docxParagraphs(docx), name) : { title: name, category: '', services: [], body: [], summary: '' };
    const slug = slugify(name);
    fs.mkdirSync(path.join(OUT, slug), { recursive: true });
    const images = [];
    for (const [i, f] of imgs.entries()) {
      const outName = `${String(i + 1).padStart(2, '0')}.webp`;
      const outPath = path.join(OUT, slug, outName);
      if (!fs.existsSync(outPath)) {
        await sharp(f, { limitInputPixels: false })
          .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 76 }).toFile(outPath);
      }
      images.push(`/all/${slug}/${outName}`);
    }
    projects.push({ slug, ...text, category: text.category || 'Branding · Comunicación', images });
    console.log(slug, images.length, docx ? '' : '(sin texto)');
  }
}
fs.writeFileSync('src/data/all-projects.json', JSON.stringify(projects, null, 2));
console.log('total', projects.length);
