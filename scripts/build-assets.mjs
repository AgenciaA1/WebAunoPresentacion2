// Converts source folders (Mockups / Logos Clientes) into web-optimized WebP assets.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('..');
const SRC = path.join(ROOT, 'Mockups proyectos  - Agencia A1 2026');
const OUT = path.resolve('public');

// slug -> source folder (relative to SRC)
const PROJECTS = {
  blumos: 'Blumos', salcopets: 'SALCOPETS', ogx: 'OGX', cluny: 'CLUNY',
  babyprotec: 'Baby Protec', hidrolatina: 'Hidrolatina', pinwine: 'Pinwine',
  arcor: 'ARCOR', axim: 'AXIM - NOTTS/Axim', 'capital-natural': 'CAPITAL NATURAL',
  'conecta-costanera': 'CONECTA COSTANERA', equilibrio: 'Equilibrio',
};
const IMG = /\.(jpe?g|png)$/i;

const manifest = {};
for (const [slug, dir] of Object.entries(PROJECTS)) {
  const files = fs.readdirSync(path.join(SRC, dir)).filter(f => IMG.test(f)).sort();
  fs.mkdirSync(path.join(OUT, 'projects', slug), { recursive: true });
  manifest[slug] = [];
  for (const [i, f] of files.entries()) {
    const name = `${String(i + 1).padStart(2, '0')}.webp`;
    await sharp(path.join(SRC, dir, f), { limitInputPixels: false })
      .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78 }).toFile(path.join(OUT, 'projects', slug, name));
    manifest[slug].push(`/projects/${slug}/${name}`);
  }
  console.log(slug, files.length);
}

const LOGOS = path.join(ROOT, 'Logos Clientes');
fs.mkdirSync(path.join(OUT, 'logos'), { recursive: true });
const logos = [];
for (const d of fs.readdirSync(LOGOS).filter(d => /^[0-9]+$/.test(d)).sort((a, b) => a - b)) {
  for (const f of fs.readdirSync(path.join(LOGOS, d)).filter(f => /\.png$/i.test(f))) {
    const name = f.replace(/^A1-web-logos?[-_]/i, '').replace(/\.png$/i, '');
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    // Source logos are dark on white: turn luminance into alpha and paint them white for the dark UI
    const src = sharp(path.join(LOGOS, d, f)).flatten({ background: '#fff' }).trim({ threshold: 20 }).resize({ width: 480, withoutEnlargement: true });
    const { data, info } = await src.clone().grayscale().negate().normalise().linear(1.4, 0).extractChannel(0).raw().toBuffer({ resolveWithObject: true });
    await sharp({ create: { width: info.width, height: info.height, channels: 3, background: '#ffffff' } })
      .joinChannel(data, { raw: { width: info.width, height: info.height, channels: 1 } })
      .webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, 'logos', `${slug}.webp`));
    logos.push({ name: name.replace(/[_-]/g, ' '), src: `/logos/${slug}.webp` });
  }
}
fs.writeFileSync('src/data/assets.json', JSON.stringify({ projects: manifest, logos }, null, 2));
console.log('logos', logos.length);
