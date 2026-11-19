# Principal Code Review: AdSense, SEO, Performance, Security & Accessibility

## Executive Summary

**Readiness score: 28/100 — Not ready for AdSense approval or full search indexing.**

The branch has a polished visual identity and substantial editorial/catalog content, but it is a client-rendered Vite SPA that exposes route information through HTTP rewrites and post-render metadata updates. This creates critical indexing, canonicalization, HTTP 404, and structured-data risks. The code also contains a consent gap, duplicate AdSense initialization, payment logic with no visible server verification, an oversized initial bundle, and several accessibility and layout-stability defects.

AdSense approval is blocked until consent, route eligibility, ad sizing, policy pages, 404 behavior, and crawler delivery are corrected. Search indexing is blocked until direct routes receive route-specific server HTML and HTTP status, canonical metadata, and complete public sitemap coverage.

## Architecture & Code Quality Review

**Strengths**
- Clear separation of routes, data, SEO metadata helpers, and reusable JSON-LD components.
- Explicit ad-route allowlist and suppression on transactional, account, and error patterns.
- Static fallback content, `robots.txt`, `ads.txt`, and sitemap assets are present.
- The privacy and terms pages contain substantial legal copy and AdSense disclosures.
- The build and TypeScript checks pass after dependencies are restored.

**Structural bottlenecks**
- The application has no SSR/SSG route rendering boundary; direct requests depend on JavaScript.
- Host configuration rewrites all unknown paths to the app shell with HTTP 200.
- Route metadata, consent, commerce, and payment state are implemented in the browser.
- Three.js, GSAP, Lenis, Razorpay, image effects, and route UI share the main bundle.
- Domain types are not enforced consistently; `any`, localStorage JSON, and route params cross trust boundaries.

**Technical debt observations**
- Duplicate scroll/runtime loops, external media, and 150-mesh WebGL scenes raise runtime cost.
- Plain `<img>` elements and third-party image sources bypass sizing and optimization controls.
- No application error boundary protects routes from render exceptions.
- Security headers are absent from Netlify and Vercel configuration.
- Several forms look interactive but do not collect or submit a real payload.

## Master Issue Index

| # | Issue | Category | Severity | File Path |
|---|-------|----------|----------|------------|
| [#5](https://github.com/ankitsharma706/assavav2/issues/5) | [AdSense] Duplicate AdSense SDK loads from index and route guard | AdSense | High | `index.html`; `src/components/AdSense/AdSenseGuard.tsx` |
| [#6](https://github.com/ankitsharma706/assavav2/issues/6) | [AdSense] Default ad slot ID can submit placeholder inventory | AdSense | High | `src/components/AdSense/AdUnit.tsx` |
| [#7](https://github.com/ankitsharma706/assavav2/issues/7) | [AdSense] Fixed ad reserved height plus responsive ads can cause CLS | AdSense | High | `src/components/AdSense/AdUnit.tsx` |
| [#8](https://github.com/ankitsharma706/assavav2/issues/8) | [AdSense] No consent mode or cookie banner is implemented | AdSense | Critical | `src/App.tsx`; `src/pages/PrivacyPolicy.tsx` |
| [#9](https://github.com/ankitsharma706/assavav2/issues/9) | [AdSense] Legal and privacy pages carry ad units near sensitive disclosures | AdSense | Medium | `src/pages/PrivacyPolicy.tsx`; `src/pages/TermsPage.tsx` |
| [#10](https://github.com/ankitsharma706/assavav2/issues/10) | [AdSense] Publisher ID is duplicated as a hardcoded value | AdSense | High | `index.html`; `src/components/AdSense/AdSenseGuard.tsx`; `public/ads.txt` |
| [#11](https://github.com/ankitsharma706/assavav2/issues/11) | [SEO] Root canonical points to maxcnfront instead of repository production domain | SEO | High | `index.html`; `src/lib/seo.ts` |
| [#12](https://github.com/ankitsharma706/assavav2/issues/12) | [SEO] Vite SPA serves only the root HTML shell for unknown routes | SEO | Critical | `netlify.toml`; `vercel.json`; `index.html` |
| [#13](https://github.com/ankitsharma706/assavav2/issues/13) | [SEO] Catch-all route can return HTTP 200 for 404 pages | SEO | Critical | `netlify.toml`; `vercel.json`; `src/App.tsx` |
| [#14](https://github.com/ankitsharma706/assavav2/issues/14) | [SEO] NotFound metadata is added only after client-side rendering | SEO | High | `src/pages/NotFound.tsx` |
| [#15](https://github.com/ankitsharma706/assavav2/issues/15) | [SEO] Product route silently substitutes the first product for invalid IDs | SEO | High | `src/pages/ProductDetail.tsx` |
| [#16](https://github.com/ankitsharma706/assavav2/issues/16) | [SEO] Category route renders an empty shell for unknown slugs | SEO | High | `src/pages/CategoryDetail.tsx` |
| [#17](https://github.com/ankitsharma706/assavav2/issues/17) | [SEO] Most public routes have no route-level metadata | SEO | Critical | `src/App.tsx` |
| [#18](https://github.com/ankitsharma706/assavav2/issues/18) | [SEO] Static fallback metadata is only a home-page description | SEO | High | `index.html` |
| [#19](https://github.com/ankitsharma706/assavav2/issues/19) | [SEO] Shop and shopping routes use duplicate URLs without canonical differentiation | SEO | High | `src/App.tsx`; `scripts/generate-sitemap.mjs` |
| [#20](https://github.com/ankitsharma706/assavav2/issues/20) | [SEO] Sitemap omits public routes that exist in the router | SEO | High | `scripts/generate-sitemap.mjs`; `src/App.tsx` |
| [#21](https://github.com/ankitsharma706/assavav2/issues/21) | [SEO] Robots allows Mediapartners-Google across all paths | SEO | Medium | `public/robots.txt` |
| [#22](https://github.com/ankitsharma706/assavav2/issues/22) | [SEO] Sitemap and browser routes do not include all event detail URLs | SEO | Medium | `scripts/generate-sitemap.mjs`; `src/data/events.ts` |
| [#23](https://github.com/ankitsharma706/assavav2/issues/23) | [Structured Data] WebSite SearchAction target points to a client-only route | Structured Data | High | `src/lib/schema.ts`; `src/App.tsx` |
| [#24](https://github.com/ankitsharma706/assavav2/issues/24) | [Structured Data] Product schema prices omit merchant-level shipping and return context | Structured Data | Medium | `src/lib/schema.ts`; `src/constants.ts` |
| [#25](https://github.com/ankitsharma706/assavav2/issues/25) | [Structured Data] Product schema price currency does not match visible checkout currency | Structured Data | High | `src/lib/schema.ts`; `src/pages/Payment.tsx` |
| [#26](https://github.com/ankitsharma706/assavav2/issues/26) | [Content] Terms and shipping/returns routes point to the FAQ page | Content | High | `src/App.tsx` |
| [#27](https://github.com/ankitsharma706/assavav2/issues/27) | [Content] No cookie consent and CCPA/region controls exist | Content | Critical | `src/App.tsx`; `src/pages/PrivacyPolicy.tsx` |
| [#28](https://github.com/ankitsharma706/assavav2/issues/28) | [Content] Payment and account states contain demo or fake personal data | Content | High | `src/pages/Payment.tsx` |
| [#29](https://github.com/ankitsharma706/assavav2/issues/29) | [Content] Contact form simulates submission without sending data | Content | High | `src/pages/Contact.tsx` |
| [#30](https://github.com/ankitsharma706/assavav2/issues/30) | [Performance] Production bundle is 1.92 MB and exceeds chunk warning threshold | Performance | High | `package.json`; `vite.config.ts` |
| [#31](https://github.com/ankitsharma706/assavav2/issues/31) | [Performance] Lenis smooth scrolling initializes twice | Performance | Medium | `src/App.tsx`; `src/pages/Home.tsx` |
| [#32](https://github.com/ankitsharma706/assavav2/issues/32) | [Performance] Three.js product scene is eagerly bundled and renders 150 meshes | Performance | High | `src/pages/ProductDetail.tsx`; `src/components/ThreeScene.tsx` |
| [#33](https://github.com/ankitsharma706/assavav2/issues/33) | [Performance] Video and external audio autoload on the home page | Performance | Medium | `src/components/HomeSections.tsx` |
| [#34](https://github.com/ankitsharma706/assavav2/issues/34) | [Performance] Large images are plain img elements without intrinsic dimensions | Performance | High | `src/pages/About.tsx`; `src/pages/CategoryDetail.tsx` |
| [#35](https://github.com/ankitsharma706/assavav2/issues/35) | [Performance] External Unsplash and random image sources are not optimized or local | Performance | Medium | `src/constants.ts`; `src/pages/Contact.tsx` |
| [#36](https://github.com/ankitsharma706/assavav2/issues/36) | [Performance] No React Error Boundary wraps route failures | Performance | High | `src/App.tsx`; `src/main.tsx` |
| [#37](https://github.com/ankitsharma706/assavav2/issues/37) | [Accessibility] Contact map iframe has no accessible title | Accessibility | Medium | `src/pages/Contact.tsx` |
| [#38](https://github.com/ankitsharma706/assavav2/issues/38) | [Accessibility] Contact inputs are labels but not associated with controls | Accessibility | High | `src/pages/Contact.tsx` |
| [#39](https://github.com/ankitsharma706/assavav2/issues/39) | [Accessibility] Canvas-based 3D scenes have no fallback text or aria label | Accessibility | Medium | `src/pages/ProductDetail.tsx`; `src/components/ThreeScene.tsx` |
| [#40](https://github.com/ankitsharma706/assavav2/issues/40) | [Accessibility] Decorative and thematic images omit alt text | Accessibility | Medium | `src/components/CoffeeComponents.tsx`; `src/components/EventComponents.tsx` |
| [#41](https://github.com/ankitsharma706/assavav2/issues/41) | [Accessibility] Icon-only controls lack accessible names | Accessibility | High | `src/pages/CategoryDetail.tsx`; `src/components/CoffeeComponents.tsx` |
| [#42](https://github.com/ankitsharma706/assavav2/issues/42) | [Security] Security headers are missing in hosting configuration | Security | Critical | `netlify.toml`; `vercel.json` |
| [#43](https://github.com/ankitsharma706/assavav2/issues/43) | [Security] Razorpay key and payment flow are not server-verified | Security | Critical | `src/pages/Payment.tsx` |
| [#44](https://github.com/ankitsharma706/assavav2/issues/44) | [Security] Cart and wishlist JSON from localStorage is parsed without validation | Security | High | `src/App.tsx` |
| [#45](https://github.com/ankitsharma706/assavav2/issues/45) | [Security] Selected route and external image URLs accept untrusted data | Security | Medium | `src/pages/ProductDetail.tsx`; `src/pages/CategoryDetail.tsx` |
| [#46](https://github.com/ankitsharma706/assavav2/issues/46) | [Code Quality] Extensive any escapes and implicit untyped props | Code Quality | Medium | `src/App.tsx`; `src/pages/CategoryDetail.tsx`; `src/pages/CinematicEventDetail.tsx` |
| [#47](https://github.com/ankitsharma706/assavav2/issues/47) | [Code Quality] 150+ modules are included in a 1.92 MB production chunk | Code Quality | High | `package.json`; `vite.config.ts` |
| [#48](https://github.com/ankitsharma706/assavav2/issues/48) | [Code Quality] Contact form controls lack state binding and submission names | Code Quality | Medium | `src/pages/Contact.tsx` |
| [#49](https://github.com/ankitsharma706/assavav2/issues/49) | [Architecture] No server API routes or backend order/payment boundary exists | Architecture | Critical | `src/App.tsx`; `src/pages/Payment.tsx` |

## Remediation Roadmap

### Phase 1: AdSense Policy & Indexing Blockers
1. Add region-aware consent and preference controls.
2. Serve route-specific SSR/SSG output and real 404 statuses.
3. Consolidate canonical domains, metadata, sitemap, and robots behavior.
4. Complete shipping/refund/legal pages and remove contradictory routing.
5. Correct AdSense script and slot initialization and reserve stable ad geometry.

### Phase 2: Core Web Vitals & Structured Data
1. Split routes and heavy Three.js/GSAP dependencies into bounded chunks.
2. Add intrinsic dimensions and optimized loading for LCP and editorial images.
3. Remove duplicate smooth-scroll RAF loops and bound WebGL/mobile animation work.
4. Align Product and Organization JSON-LD with verified, consistent merchant data.
5. Generate route-specific metadata and dynamic sitemap entries from canonical data.

### Phase 3: Security & Code Hygiene
1. Add CSP, frame, referrer, permissions, and HSTS deployment headers.
2. Move Razorpay order creation and signature verification to an authenticated backend.
3. Validate localStorage, route parameters, forms, and external content before use.
4. Replace broad `any` types and add route/application error boundaries.
5. Implement real contact, account, order, refund, and payment workflows.
