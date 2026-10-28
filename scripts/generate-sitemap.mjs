import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const BASE_URL = 'https://maxcnfront.vercel.app';
const TODAY = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/shop', changefreq: 'daily', priority: '0.9' },
  { path: '/category', changefreq: 'weekly', priority: '0.8' },
  { path: '/story', changefreq: 'weekly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/reviews', changefreq: 'weekly', priority: '0.7' },
  { path: '/events', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'monthly', priority: '0.6' },
  { path: '/terms-of-service', changefreq: 'monthly', priority: '0.6' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
];

const categorySlugs = [
  'single-origin',
  'rare-finds',
  'brewing-gear',
  'house-blends',
  'coffee-spaces',
];

const productIds = ['1', '2', '3', '4', '5', '6'];
const eventSlugs = ['kora-kulture'];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const route of staticRoutes) {
  xml += `  <url>\n    <loc>${BASE_URL}${route.path}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`;
}

for (const cat of categorySlugs) {
  xml += `  <url>\n    <loc>${BASE_URL}/category/${cat}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
}

for (const pid of productIds) {
  xml += `  <url>\n    <loc>${BASE_URL}/coffeeDetail/${pid}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
}

for (const ev of eventSlugs) {
  xml += `  <url>\n    <loc>${BASE_URL}/events/${ev}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
}

xml += `</urlset>\n`;

const outputPath = path.join(projectRoot, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');
console.log(`[Sitemap] Successfully generated dynamic sitemap at ${outputPath}`);
