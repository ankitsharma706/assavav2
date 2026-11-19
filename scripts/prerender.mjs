import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { createServer } from 'vite';
import { PassThrough } from 'node:stream';

const root = process.cwd();
const outputDir = path.join(root, 'dist');
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  resolve: { alias: { 'react-router-dom': 'react-router' } },
});

function renderMarkup(element) {
  return new Promise((resolve, reject) => {
    let markup = '';
    const stream = renderToPipeableStream(element, {
      onAllReady() {
        const output = new PassThrough();
        output.on('data', (chunk) => { markup += chunk.toString(); });
        output.on('end', () => resolve(markup));
        output.on('error', reject);
        stream.pipe(output);
      },
      onShellError: reject,
      onError: (error) => console.error('[SEO] SSR rendering error', error),
    });
  });
}

try {
  const [{ default: App }, { StaticRouter }, { PRODUCTS }, { CATEGORY_DATA }, { EVENTS }, seo, adsense] = await Promise.all([
    vite.ssrLoadModule('/src/App.tsx'),
    vite.ssrLoadModule('react-router'),
    vite.ssrLoadModule('/src/constants.ts'),
    vite.ssrLoadModule('/src/data/categoryData.ts'),
    vite.ssrLoadModule('/src/data/events.ts'),
    vite.ssrLoadModule('/src/lib/seo.ts'),
    vite.ssrLoadModule('/src/lib/adsense.ts'),
  ]);
  const paths = [...new Set([
    '/', '/shop', '/category', '/story', '/about', '/reviews', '/events',
    '/contact', '/privacy-policy', '/terms', '/faq', '/shipping', '/returns',
    '/cart', '/payment', '/account', '/orderHistory', '/tracking', '/thankyou', '/search',
    ...Object.keys(CATEGORY_DATA).map((slug) => `/category/${slug}`),
    ...PRODUCTS.map((product) => `/coffeeDetail/${product.id}`),
    ...EVENTS.map((event) => `/events/${event.id}`),
  ])];
  const baseTemplate = fs.readFileSync(path.join(outputDir, 'index.html'), 'utf8');

  const escapeAttribute = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  const metadataTags = (config, pathname) => {
    const formattedTitle = config.title.includes(seo.SITE_DEFAULTS.siteName)
      ? config.title
      : `${config.title} | ${seo.SITE_DEFAULTS.siteName}`;
    const canonical = `${seo.SITE_DEFAULTS.baseUrl}${config.canonical || pathname}`;
    const description = config.description || seo.SITE_DEFAULTS.defaultDescription;
    const tags = [
      `<title>${escapeAttribute(formattedTitle)}</title>`,
      `<meta name="description" content="${escapeAttribute(description)}" />`,
      `<link rel="canonical" href="${escapeAttribute(canonical)}" />`,
      `<meta name="robots" content="${config.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`,
      `<meta property="og:title" content="${escapeAttribute(formattedTitle)}" />`,
      `<meta property="og:description" content="${escapeAttribute(description)}" />`,
      `<meta property="og:type" content="${config.ogType || 'website'}" />`,
      `<meta property="og:url" content="${escapeAttribute(canonical)}" />`,
      `<meta property="og:image" content="${escapeAttribute(config.ogImage || seo.SITE_DEFAULTS.defaultOgImage)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeAttribute(formattedTitle)}" />`,
      `<meta name="twitter:description" content="${escapeAttribute(description)}" />`,
      `<meta name="twitter:image" content="${escapeAttribute(config.ogImage || seo.SITE_DEFAULTS.defaultOgImage)}" />`,
    ];
    return tags.join('\n    ');
  };

  for (const pathname of paths) {
    const markup = await renderMarkup(
      React.createElement(StaticRouter, { location: pathname }, React.createElement(App)),
    );
    const config = seo.getRouteSEO(pathname, PRODUCTS, CATEGORY_DATA, EVENTS);
    const publisherId = adsense.ADSENSE_CLIENT_ID;
    const html = baseTemplate
      .replace(/<title>[\s\S]*?<\/title>/, '')
      .replace(/<meta name="description"[^>]*\/>/, '')
      .replace(/<link rel="canonical"[^>]*\/>/, '')
      .replace(/<meta name="robots"[^>]*\/>/, '')
      .replace(/<meta property="og:[^"]+"[^>]*\/>/g, '')
      .replace(/<meta name="twitter:[^"]+"[^>]*\/>/g, '')
      .replace('</head>', `    <meta name="google-adsense-account" content="${escapeAttribute(publisherId)}" />\n    <script async src="https://fundingchoicesmessages.google/i/${escapeAttribute(publisherId)}?ers=1"></script>\n    <script>(function(){function signalGooglefcPresent(){if(!window.frames.googlefcPresent){if(document.body){var iframe=document.createElement('iframe');iframe.style='width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;';iframe.style.display='none';iframe.name='googlefcPresent';document.body.appendChild(iframe);}else{setTimeout(signalGooglefcPresent,0);}}}signalGooglefcPresent();})();</script>\n  </head>`)
      .replace('</head>', `    ${metadataTags(config, pathname)}\n  </head>`)
      .replace(/<!--app-html:start-->[\s\S]*?<!--app-html:end-->/, `<!--app-html:start-->${markup}<!--app-html:end-->`);
    const filePath = pathname === '/'
      ? path.join(outputDir, 'index.html')
      : path.join(outputDir, pathname.slice(1), 'index.html');
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html);
  }
  console.log(`[SEO] Pre-rendered ${paths.length} routes`);
} finally {
  await vite.close();
}
