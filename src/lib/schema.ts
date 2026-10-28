/**
 * Schema.org Typed JSON-LD Structured Data Generator
 * Provides enterprise-grade structured data for Organization, WebSite,
 * Article, Product, BreadcrumbList, and FAQPage with XSS sanitization.
 */

import { SITE_DEFAULTS } from './seo';

export function sanitizeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

export interface OrganizationSchema {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

export function generateOrganizationSchema(custom?: Partial<OrganizationSchema>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: custom?.name || 'ASSAVA Coffee',
    url: custom?.url || SITE_DEFAULTS.baseUrl,
    logo: custom?.logo || `${SITE_DEFAULTS.baseUrl}/logo.png`,
    description: SITE_DEFAULTS.defaultDescription,
    telephone: custom?.telephone || '+91 9000 8000 12',
    email: custom?.email || 'hello@assavacoffee.com',
    sameAs: custom?.sameAs || [
      'https://instagram.com/assavacoffee',
      'https://linkedin.com/company/assavacoffee',
      'https://twitter.com/assavacoffee',
    ],
    address: custom?.address || {
      '@type': 'PostalAddress',
      streetAddress: 'District Centre, Chandrasekharpur',
      addressLocality: 'Bhubaneswar',
      addressRegion: 'Odisha',
      postalCode: '751024',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91 9000 8000 12',
      contactType: 'Customer Care',
      email: 'hello@assavacoffee.com',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ASSAVA Luxury Coffee Experience',
    url: SITE_DEFAULTS.baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_DEFAULTS.baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${SITE_DEFAULTS.baseUrl}${item.path}`,
    })),
  };
}

export interface ProductSchemaInput {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
}

export function generateProductSchema(product: ProductSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: `ASSAVA-${product.id}`,
    mpn: `ASSAVA-LOT-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'ASSAVA',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_DEFAULTS.baseUrl}/coffeeDetail/${product.id}`,
      priceCurrency: product.currency || 'USD',
      price: product.price.toFixed(2),
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      itemCondition: 'https://schema.org/NewCondition',
    },
    ...(product.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating.toString(),
            reviewCount: (product.reviewCount || 32).toString(),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}

export function generateArticleSchema(article: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: [article.image],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url.startsWith('http') ? article.url : `${SITE_DEFAULTS.baseUrl}${article.url}`,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.authorName || 'Assava Coffee Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ASSAVA',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_DEFAULTS.baseUrl}/logo.png`,
      },
    },
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
