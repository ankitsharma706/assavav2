import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, 'dist');
const baseUrl = (process.env.VITE_SITE_URL || 'https://assavav.vercel.app').replace(/\/+$/, '');
const adsenseConfig = JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/lib/adsense-config.json'), 'utf8'));
const publisherId = process.env.VITE_ADSENSE_CLIENT_ID || adsenseConfig.publisherId;
const today = new Date().toISOString().slice(0, 10);
const staticRoutes = [
  '/', '/shop', '/category', '/story', '/about', '/reviews', '/events',
  '/contact', '/privacy-policy', '/terms', '/faq', '/shipping', '/returns',
];

const readSlugs = (file, pattern) => {
  const contents = fs.readFileSync(path.join(projectRoot, file), 'utf8');
  return [...contents.matchAll(pattern)].map((match) => match[1]);
};

const categories = readSlugs('src/data/categoryData.ts', /id:\s*'([^']+)'/g);
const products = readSlugs('src/constants.ts', /^ {4}id:\s*'([^']+)'/gm);
const events = readSlugs('src/data/events.ts', /^ {4}id:\s*'([^']+)'/gm);
const routes = [...new Set([
  ...staticRoutes,
  ...categories.map((slug) => `/category/${slug}`),
  ...products.map((id) => `/coffeeDetail/${id}`),
  ...events.map((slug) => `/events/${slug}`),
])];

const urls = routes.map((route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /payment\nDisallow: /account\nDisallow: /orderHistory\nDisallow: /tracking\nDisallow: /thankyou\nDisallow: /search\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
if (!/^ca-pub-\d+$/.test(publisherId)) throw new Error('VITE_ADSENSE_CLIENT_ID must be a valid AdSense publisher ID');
fs.writeFileSync(path.join(outputDir, 'ads.txt'), `google.com, pub-${publisherId.slice('ca-pub-'.length)}, DIRECT, f08c47fec0942fa0\n`);
console.log(`[SEO] Generated sitemap and robots.txt for ${routes.length} canonical routes`);
