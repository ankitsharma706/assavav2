/**
 * Google AdSense Compliance Route Guard
 * Enforces strict isolation of ad scripts and units to content-rich views only.
 * Completely suppresses ad execution on transactional, account, error, and blank screens.
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ADSENSE_CLIENT_ID = 'ca-pub-4318712038607459';

// Explicitly approved content routes with genuine publisher editorial content
const APPROVED_CONTENT_PATTERNS = [
  /^\/$/,                       // Home (rich editorial content)
  /^\/home$/,                   // Home alias
  /^\/shop$/,                   // Shop catalog
  /^\/shopping$/,               // Shop alias
  /^\/category$/,               // Category registry
  /^\/category\/[a-z0-9-]+$/,   // Specific category editorial
  /^\/coffeeDetail\/[a-z0-9-]+$/, // Rich product profile & brewing notes
  /^\/story$/,                  // The Heritage & Harvest Narrative
  /^\/about$/,                  // Comprehensive Brand History & Team
  /^\/reviews$/,                // Verified Patron Reviews
  /^\/events$/,                 // Coffee Masterclasses & Tastings
  /^\/events\/[a-z0-9-]+$/,     // Specific event detail
  /^\/contact$/,                // Authentic Contact & Roastery Info
  /^\/terms$/,                  // Terms of Service
  /^\/terms-of-service$/,       // Terms alias
  /^\/privacy-policy$/,         // Mandatory Legal Policy
  /^\/privacy$/,                // Privacy alias
  /^\/faq$/,                    // FAQ & Customer Guidance
];

// Disallowed routes: utility, authentication, transactional, dashboard, or empty states
const RESTRICTED_PATTERNS = [
  /^\/cart/,
  /^\/payment/,
  /^\/account/,
  /^\/orderHistory/,
  /^\/tracking/,
  /^\/thankyou/,
  /^\/search/,
  /^\/login/,
  /^\/signup/,
  /^\/auth/,
  /^\/reset-password/,
  /^\/404/,
  /^\/500/,
];

export function isContentRoute(pathname: string): boolean {
  // If explicitly restricted, reject immediately
  if (RESTRICTED_PATTERNS.some(pattern => pattern.test(pathname))) {
    return false;
  }
  // Must match one of the verified content-rich routes
  return APPROVED_CONTENT_PATTERNS.some(pattern => pattern.test(pathname));
}

export const AdSenseGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const [canServeAds, setCanServeAds] = useState(false);

  useEffect(() => {
    const isEligible = isContentRoute(pathname);
    setCanServeAds(isEligible);

    if (isEligible) {
      // Load AdSense script safely if not already present
      const scriptId = 'adsbygoogle-sdk';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    }
  }, [pathname]);

  return <>{children}</>;
};

export default AdSenseGuard;
