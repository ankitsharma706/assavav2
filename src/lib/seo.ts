/**
 * Canonical Metadata & OpenGraph Technical SEO Engine
 * Provides route-level dynamic metadata resolution, canonicalization,
 * robots directives, and social graph cards.
 */

export interface SEOConfig {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SITE_DEFAULTS = {
  siteName: 'ASSAVA',
  baseUrl: 'https://maxcnfront.vercel.app',
  defaultTitle: 'Assava | Luxury Specialty Coffee & Rare Micro-Lots',
  defaultDescription: 'Experience Assava: ultra-specialty Indian & global single-origin coffees, precision roasting, artisanal harvest narratives, and ritual brewing equipment.',
  defaultOgImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=85&w=1200',
  defaultAuthor: 'Assava Coffee Curators',
  locale: 'en_US',
};

function setOrCreateMeta(selector: string, createFn: () => HTMLElement): HTMLElement {
  let element = document.head.querySelector(selector) as HTMLElement | null;
  if (!element) {
    element = createFn();
    document.head.appendChild(element);
  }
  return element;
}

export function applySEO(config: SEOConfig) {
  if (typeof document === 'undefined') return;

  // Title formatting
  const formattedTitle = config.title.includes(SITE_DEFAULTS.siteName)
    ? config.title
    : `${config.title} | ${SITE_DEFAULTS.siteName}`;
  document.title = formattedTitle;

  const description = config.description || SITE_DEFAULTS.defaultDescription;
  const canonicalUrl = config.canonical
    ? (config.canonical.startsWith('http') ? config.canonical : `${SITE_DEFAULTS.baseUrl}${config.canonical}`)
    : `${SITE_DEFAULTS.baseUrl}${window.location.pathname}`;
  const ogImage = config.ogImage || SITE_DEFAULTS.defaultOgImage;
  const ogType = config.ogType || 'website';

  // Description
  const metaDesc = setOrCreateMeta('meta[name="description"]', () => {
    const el = document.createElement('meta');
    el.setAttribute('name', 'description');
    return el;
  });
  metaDesc.setAttribute('content', description);

  // Canonical Link
  const canonicalLink = setOrCreateMeta('link[rel="canonical"]', () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  });
  canonicalLink.setAttribute('href', canonicalUrl);

  // Robots
  const robotsMeta = setOrCreateMeta('meta[name="robots"]', () => {
    const el = document.createElement('meta');
    el.setAttribute('name', 'robots');
    return el;
  });
  if (config.noindex) {
    robotsMeta.setAttribute('content', 'noindex, nofollow, noarchive');
  } else {
    robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  }

  // OpenGraph Tags
  const ogTags: Record<string, string> = {
    'og:title': formattedTitle,
    'og:description': description,
    'og:type': ogType,
    'og:url': canonicalUrl,
    'og:image': ogImage,
    'og:site_name': SITE_DEFAULTS.siteName,
    'og:locale': SITE_DEFAULTS.locale,
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    const el = setOrCreateMeta(`meta[property="${property}"]`, () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      return meta;
    });
    el.setAttribute('content', content);
  });

  // Twitter Cards
  const twitterTags: Record<string, string> = {
    'twitter:card': 'summary_large_image',
    'twitter:title': formattedTitle,
    'twitter:description': description,
    'twitter:image': ogImage,
  };

  Object.entries(twitterTags).forEach(([name, content]) => {
    const el = setOrCreateMeta(`meta[name="${name}"]`, () => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', name);
      return meta;
    });
    el.setAttribute('content', content);
  });
}
