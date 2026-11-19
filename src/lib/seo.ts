/**
 * Canonical Metadata & OpenGraph Technical SEO Engine
 * Provides route-level dynamic metadata resolution, canonicalization,
 * robots directives, and social graph cards.
 */

import type { Product, CategoryDetailData, CoffeeEvent } from '../types';

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
  baseUrl: (import.meta.env.VITE_SITE_URL || 'https://maxcnfront.vercel.app').replace(/\/+$/, ''),
  defaultTitle: 'Assava | Luxury Specialty Coffee & Rare Micro-Lots',
  defaultDescription: 'Experience Assava: ultra-specialty Indian & global single-origin coffees, precision roasting, artisanal harvest narratives, and ritual brewing equipment.',
  defaultOgImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=85&w=1200',
  defaultAuthor: 'Assava Coffee Curators',
  locale: 'en_US',
};

const routeCopy: Record<string, Pick<SEOConfig, 'title' | 'description'>> = {
  '/': { title: 'Assava | Luxury Specialty Coffee & Rare Micro-Lots', description: 'Explore specialty Indian and global single-origin coffee, precision roasting, and brewing equipment from Assava.' },
  '/shop': { title: 'Shop Specialty Coffee', description: 'Browse Assava single-origin coffees, blends, and brewing equipment.' },
  '/category': { title: 'Coffee Categories', description: 'Explore Assava coffee origins, blends, brewing gear, and curated collections.' },
  '/story': { title: 'The Assava Coffee Story', description: 'Learn about Assava coffee sourcing, roasting, and brewing.' },
  '/about': { title: 'About Assava Coffee', description: 'Learn about Assava Specialty Coffee, its team, sourcing, and roasting.' },
  '/reviews': { title: 'Customer Reviews', description: 'Read customer feedback about Assava coffee and service.' },
  '/events': { title: 'Coffee Events & Workshops', description: 'Discover Assava coffee tastings, workshops, and community events.' },
  '/contact': { title: 'Contact Assava Coffee', description: 'Contact Assava customer support and coffee roasters.' },
  '/terms': { title: 'Terms of Service', description: 'Review the terms for using the Assava website and services.' },
  '/privacy-policy': { title: 'Privacy Policy', description: 'Read how Assava handles personal information and advertising preferences.' },
  '/faq': { title: 'Frequently Asked Questions', description: 'Find answers about Assava coffee, ordering, and brewing.' },
  '/shipping': { title: 'Shipping Information', description: 'Review shipping information for Assava orders.' },
  '/returns': { title: 'Returns and Refunds', description: 'Review return and refund information for Assava orders.' },
};

export function getRouteSEO(
  pathname: string,
  products: Product[],
  categories: Record<string, CategoryDetailData>,
  events: CoffeeEvent[],
): SEOConfig {
  const path = pathname.replace(/\/+$/, '') || '/';
  const productMatch = path.match(/^\/coffeeDetail\/([a-z0-9-]+)$/i);
  if (productMatch) {
    const product = products.find((item) => item.id === productMatch[1]);
    return product
      ? { title: `${product.name} | Specialty Coffee`, description: product.description, canonical: path, ogType: 'product', ogImage: product.image }
      : { title: 'Page Not Found', description: 'The requested coffee product could not be found.', canonical: path, noindex: true };
  }

  const categoryMatch = path.match(/^\/category\/([a-z0-9-]+)$/i);
  if (categoryMatch) {
    const category = categories[categoryMatch[1]];
    return category
      ? { title: `${category.name} | Assava Coffee`, description: category.intro || category.tagline, canonical: path, ogImage: category.heroImage }
      : { title: 'Page Not Found', description: 'The requested coffee category could not be found.', canonical: path, noindex: true };
  }

  const eventMatch = path.match(/^\/events\/([a-z0-9-]+)$/i);
  if (eventMatch) {
    const event = events.find((item) => item.id === eventMatch[1]);
    return event
      ? { title: `${event.title} | Assava Events`, description: event.description, canonical: path, ogType: 'article', ogImage: event.heroImage }
      : { title: 'Page Not Found', description: 'The requested event could not be found.', canonical: path, noindex: true };
  }

  const noindex = /^\/(cart|payment|account|orderHistory|tracking|thankyou|search)(\/|$)/i.test(path);
  return {
    ...(routeCopy[path] || { title: 'Page Not Found', description: 'The requested page could not be found.' }),
    canonical: path,
    noindex: noindex || !routeCopy[path],
  };
}

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
