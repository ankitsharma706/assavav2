import { Product, Event, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Assava Noir',
    price: 42.00,
    oldPrice: 55.00,
    description: 'A deep, mysterious roast with notes of dark chocolate and midnight jasmine.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Espresso',
    details: ['Pure Arabica', 'Sun-Kissed Robusta', 'Honey Processed Blend', 'Shade-Grown Specialty'],
    label: 'ETHIOPIA / DARK / SINGLE ORIGIN',
    location: 'home',
    prepTime: 'medium',
    rating: 4.9,
    reviews: 128,
    tag: 'Espresso',
    profile: {
      origin: 'Ethiopia',
      roast: 'Dark',
      type: 'Single Origin',
      body: 'Full',
      acidity: 'Bright'
    },
    flavorNotes: ['Dark Chocolate', 'Midnight Jasmine', 'Black Cherry', 'Sweet'],
    brewingMethods: ['Espresso', 'V60', 'Moka Pot'],
    coffeeDetails: [
      {
        title: "Pure Arabica",
        description: "Sourced from the misty slopes of the Chandragiri Hills, where the air is thin and the flavor is dense.",
        origin: "Chandragiri Hills",
        notes: ["Floral", "Citrus", "Jasmine"],
        roast: "Medium-Dark",
        process: "Washed",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Sun-Kissed Robusta",
        description: "Bold and intense, with a thick crema and nutty finish that lingers on the palate.",
        origin: "Wayanad Highlands",
        notes: ["Earthy", "Dark Chocolate", "Nutty"],
        roast: "Dark",
        process: "Natural",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800"
      }
    ],
    faqs: [
      {
        question: "Is this coffee freshly roasted?",
        answer: "Yes, all our coffee is roasted in small 12kg batches within 48 hours of your order."
      },
      {
        question: "Which brew method is best?",
        answer: "Assava Noir is best suited for Espresso and Moka Pot to highlight its rich body."
      },
      {
        question: "How should I store it?",
        answer: "Store in our airtight, nitrogen-sealed bag in a cool, dark place. Never in the fridge."
      }
    ],
    story: {
      title: "The Heart of the Darkness",
      description: "Assava Noir was born from a desire to create the ultimate midnight ritual. We spent three years sourcing the perfect balance of beans that could withstand a deep roast without losing their inherent floral character."
    },
    brewingGuide: [
      { method: "Espresso", grind: "Extra Fine", time: "25-30s" },
      { method: "Moka Pot", grind: "Fine-Medium", time: "3-4 min" },
      { method: "Aeropress", grind: "Fine", time: "2 min" }
    ],
    productDetails: {
      weight: "250g",
      roastLevel: "Dark",
      coffeeType: ["Arabica", "Robusta"],
      grinding: ["Whole Beans", "Custom Grind"],
      shelfLife: "12 Months"
    },
    productReviews: [
      {
        id: 'r1',
        userName: 'Elena Vance',
        userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        text: 'The absolute gold standard for midnight rituals. Clean, bold, and incredibly fresh.',
        rating: 5,
        date: 'March 24, 2026'
      }
    ]
  },
  {
    id: '2',
    name: 'Velvet Ethereal',
    price: 38.00,
    oldPrice: 45.00,
    description: 'Silky smooth texture with a lingering sweetness of toasted hazelnuts.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Brew',
    details: ['Pure Arabica', 'Sun-Kissed Robusta', 'Honey Processed Blend', 'Shade-Grown Specialty'],
    label: 'BRAZIL / MEDIUM / BLEND',
    location: 'office',
    prepTime: 'quick',
    rating: 4.8,
    reviews: 256,
    tag: 'Brew',
    profile: {
      origin: 'Brazil',
      roast: 'Medium',
      type: 'Blend',
      body: 'Medium',
      acidity: 'Balanced'
    },
    flavorNotes: ['Hazelnut', 'Caramel', 'Milk Chocolate', 'Smooth', 'Balanced'],
    brewingMethods: ['V60', 'Chemex', 'Aeropress']
  },
  {
    id: '3',
    name: 'Golden Geisha',
    price: 120.00,
    oldPrice: 150.00,
    description: 'The crown jewel of ASSAVA. Sparkling acidity with peach blossom notes.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Special Reserve',
    details: ['Pure Arabica', 'Sun-Kissed Robusta', 'Honey Processed Blend', 'Shade-Grown Specialty'],
    label: 'PANAMA / LIGHT / SPECIAL RESERVE',
    location: 'cafe',
    prepTime: 'slow',
    rating: 5.0,
    reviews: 64,
    tag: 'Brew',
    profile: {
      origin: 'Panama',
      roast: 'Light',
      type: 'Special Reserve',
      body: 'Light',
      acidity: 'High'
    },
    flavorNotes: ['Peach Blossom', 'Bergamot', 'Honey', 'Floral', 'Bright'],
    brewingMethods: ['V60', 'Chemex', 'Siphon']
  },
  {
    id: '4',
    name: 'Obsidian Mist',
    price: 45.00,
    oldPrice: 52.00,
    description: 'Clean, precise, and uncompromising. A masterclass in minimalist roasting.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    category: 'Artisan',
    details: ['Pure Arabica', 'Sun-Kissed Robusta', 'Honey Processed Blend', 'Shade-Grown Specialty'],
    label: 'COLOMBIA / MEDIUM / ARTISAN',
    location: 'home',
    prepTime: 'medium',
    rating: 4.7,
    reviews: 89,
    tag: 'Instant',
    profile: {
      origin: 'Guatemala',
      roast: 'Medium',
      type: 'Artisan',
      body: 'Medium',
      acidity: 'Balanced'
    },
    flavorNotes: ['Green Apple', 'Almond', 'Cane Sugar', 'Clean', 'Refined'],
    brewingMethods: ['Aeropress', 'V60', 'French Press'],
    coffeeDetails: [
      {
        title: "Pure Arabica",
        description: "The pure essence of high-altitude Guatemalan beans, light-roasted for precision.",
        origin: "Guatemala Highlands",
        notes: ["Apple", "Cane Sugar"],
        roast: "Light-Medium",
        process: "Washed",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800"
      }
    ],
    story: {
      title: "Complexity in Simplicity",
      description: "Obsidian Mist is a masterclass in minimalist roasting. We strip away the smoke and the char to reveal the crystalline acidity and sweetness hidden in every bean."
    },
    productDetails: {
      weight: "250g",
      roastLevel: "Medium",
      coffeeType: ["Arabica"],
      grinding: ["Whole Beans"],
      shelfLife: "12 Months"
    }
  },
  {
    id: '5',
    name: 'Volcanic Ember',
    price: 48.00,
    oldPrice: 58.00,
    description: 'A robust blend with a smoky finish, reminiscent of a volcanic sunrise.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800',
    category: 'Dark Roast',
    details: ['Volcanic Soil Grown', 'Slow Roasted', 'Rich Body', 'Smoky Undertones'],
    label: 'INDONESIA / EXTRA DARK / SINGLE ORIGIN',
    location: 'cafe',
    prepTime: 'slow',
    rating: 4.6,
    reviews: 112,
    tag: 'Brew',
    profile: {
      origin: 'Colombia',
      roast: 'Medium-Dark',
      type: 'Cold Brew',
      body: 'Heavy',
      acidity: 'Low'
    },
    flavorNotes: ['Cocoa', 'Molasses', 'Walnut', 'Rich', 'Smoky'],
    brewingMethods: ['Cold Brew', 'French Press', 'Aeropress']
  },
  {
    id: '6',
    name: 'Celestial Bloom',
    price: 52.00,
    oldPrice: 65.00,
    description: 'Light and airy with floral notes that dance on the palate.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800',
    category: 'Light Roast',
    details: ['High Altitude', 'Washed Process', 'Floral Aroma', 'Crisp Finish'],
    label: 'KENYA / LIGHT / SINGLE ORIGIN',
    location: 'home',
    prepTime: 'quick',
    rating: 4.9,
    reviews: 76,
    tag: 'Espresso',
    profile: {
      origin: 'Costa Rica',
      roast: 'Light-Medium',
      type: 'Experimental'
    },
    flavorNotes: ['Strawberry', 'Floral', 'Honey', 'Berry', 'Juicy'],
    brewingMethods: ['Espresso', 'V60']
  }
];

export const EVENTS: Event[] = [
  {
    id: '1',
    name: 'Midnight Cupping Session',
    date: 'April 12, 2026',
    description: 'An immersive sensory journey through our rarest single-origin beans.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'The Art of the Pour',
    date: 'May 05, 2026',
    description: 'Master the precision of V60 and Chemex brewing with our head roaster.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    userName: 'Elena Vance',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    text: 'The Golden Geisha is unlike anything I have ever tasted. Truly a cinematic experience in a cup. The floral notes are incredibly delicate and the acidity is perfectly balanced.',
    rating: 5,
    date: 'March 14, 2026'
  },
  {
    id: '2',
    userName: 'Marcus Thorne',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    text: 'The Obsidian Mist is my daily ritual. The precision of the roast is unmatched. Clean, bold, and incredibly fresh.',
    rating: 5,
    date: 'February 28, 2026'
  },
  {
    id: '3',
    userName: 'Sarah Jenkins',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    text: 'Perfect for my morning pour-over. The chocolatey undertones of the Assava Noir are divine.',
    rating: 4,
    date: 'April 01, 2026'
  }
];

export const COFFEE_VARIANTS = [
  {
    title: 'Pure Arabica',
    origin: 'Ethiopia Yirgacheffe',
    description: 'High-altitude beans with a clean, floral profile and sparkling acidity.',
    flavorNotes: ['Jasmine', 'Lemon', 'Bergamot'],
    roastLevel: 'Light',
    processing: 'Washed'
  },
  {
    title: 'Sun-Kissed Robusta',
    origin: 'Vietnam Highlands',
    description: 'Bold, high-caffeine beans with a thick crema and nutty finish.',
    flavorNotes: ['Peanut', 'Dark Cocoa', 'Earth'],
    roastLevel: 'Dark',
    processing: 'Natural'
  },
  {
    title: 'Honey Processed Blend',
    origin: 'Costa Rica Tarrazu',
    description: 'A sweet, syrupy blend that balances fruitiness with a creamy body.',
    flavorNotes: ['Golden Raisin', 'Honey', 'Apricot'],
    roastLevel: 'Medium',
    processing: 'Honey'
  },
  {
    title: 'Shade-Grown Specialty',
    origin: 'Guatemala Antigua',
    description: 'Grown under a lush canopy, resulting in a rich, spicy cup with chocolate notes.',
    flavorNotes: ['Nutmeg', 'Baker\'s Chocolate', 'Spice'],
    roastLevel: 'Medium-Dark',
    processing: 'Washed'
  }
];

export const PRODUCT_FAQS = [
  {
    question: 'What grind size should I choose?',
    answer: 'Choose Fine for Espresso, Medium for Drip/Pour-over, and Coarse for French Press or Cold Brew. We recommend grinding at the last possible second for maximum aromatic impact.'
  },
  {
    question: 'Is this coffee freshly roasted?',
    answer: 'Every bag is roasted in small batches and nitrogen-sealed within 4 hours of leaving the drum. We typically ship within 24-48 hours of roasting.'
  },
  {
    question: 'How should I store my coffee?',
    answer: 'Keep it in our airtight, nitrogen-flushed bag or a dedicated vacuum canister. Store in a cool, dark place away from direct sunlight and humidity. Never store in the fridge.'
  },
  {
    question: 'Is it suitable for espresso machines?',
    answer: 'Yes, especially our Espresso and Artisan categories. Our Dark Roasts provide the body and crema ideal for traditional espresso rituals.'
  }
];

export const INSTAGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400'
];
// ============================================================
//  ASSAVA — Story Steps Data
// ============================================================

import { StoryChapter, StoryStep } from './types';

export const STORY_CHAPTERS: StoryChapter[] = [
  { id: "harvest", label: "Chapter 01", title: "The Harvest", subtitle: "Where altitude, soil and patience conspire to build something extraordinary.", accentColor: "#4a7c59" },
  { id: "craft", label: "Chapter 02", title: "The Craft", subtitle: "Precision roasting, brutal quality control, and packaging that preserves every molecule.", accentColor: "#C68E5D" },
  { id: "ritual", label: "Chapter 03", title: "Your Ritual", subtitle: "The tools, water, grind and pour that turn a bean into the perfect cup.", accentColor: "#7aa7c7" },
  { id: "circle", label: "Chapter 04", title: "The Circle", subtitle: "The sensory moment, the community, and the legacy that makes it all worthwhile.", accentColor: "#FFD700" },
];

export const STORY_STEPS: StoryStep[] = [
  {
    id: "step-01",
    stepNumber: 1,
    tag: "Step 01",
    chapterId: "harvest",
    isChapterStart: true,
    icon: "🌱",
    image: "https://coffeelounge.delonghi.com/wp-content/uploads/2023/04/Hero-Image.jpg",
    imageAlt: "Lush green coffee farm on a hillside with mountains in the background",
    badge: "Direct Trade",
    stat: "1,400m+",
    statLabel: "Min. Altitude",
    title: "The Origin",
    desc: "Sourced from high-altitude volcanic soils where the air is thin and the flavor is dense.",
    detail: "Our green beans are handpicked from farms sitting above 1,400 meters. At this altitude, coffee cherries ripen slowly — building sugars, complexity, and a flavor that lower-altitude beans simply cannot replicate. We visit every farm personally before signing any sourcing agreement. No middlemen, no compromises.",
    region: "Ethiopia · Colombia · Yemen",
    process: "Altitude Farming",
    impact: "100% Farm-Direct",
  },

  {
    id: "step-02",
    stepNumber: 2,
    tag: "Step 02",
    chapterId: "harvest",
    isChapterStart: false,
    icon: "🍯",
    image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Close-up of wet coffee cherries during natural processing fermentation",
    badge: "Natural Process",
    stat: "72 hrs",
    statLabel: "Avg. Fermentation",
    title: "The Fermentation",
    desc: "A controlled rest that unlocks fruity complexity hidden deep within the cherry.",
    detail: "Natural and honey processed coffees spend days fermenting inside their own fruit skin. This controlled microbial process converts sugars and acids, layering the bean with wine-like complexity, tropical fruit notes, and a syrupy body you simply cannot achieve any other way. We monitor temperature and humidity hourly throughout this phase — small deviations create very different cups.",
    region: "Farm Level Processing",
    process: "Natural & Honey",
    impact: "Zero Chemical Input",
  },
  {
    id: "step-03",
    stepNumber: 3,
    tag: "Step 03",
    chapterId: "harvest",
    isChapterStart: false,
    icon: "☀️",
    image: "https://bruleriedesmonts.com/wp-content/uploads/2022/09/shutterstock_1647136123-H.jpg",
    imageAlt: "Coffee beans spread evenly on raised African drying beds under bright sun",
    badge: "Sun Dried",
    stat: "21 days",
    statLabel: "Avg. Drying Time",
    title: "The Drying",
    desc: "Sun-dried on raised beds, slow and even — patience that pays off in the cup.",
    detail: "After processing, beans are spread on raised African drying beds in thin, even layers. Workers turn them every 2 hours to ensure uniform drying and prevent mold. This phase takes 2–6 weeks depending on weather and humidity. Rushing it destroys the complexity built during fermentation. Every extra day of patience translates directly into sweetness in the cup.",
    region: "Raised African Beds",
    process: "Solar Drying",
    impact: "2–6 Week Patience",
  },
  {
    id: "step-04",
    stepNumber: 4,
    tag: "Step 04",
    chapterId: "harvest",
    isChapterStart: false,
    icon: "🫘",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Hands carefully sorting green coffee beans at a quality inspection table",
    badge: "Cupped & Scored",
    stat: "85+",
    statLabel: "SCA Score Minimum",
    title: "The Selection",
    desc: "Not every cherry makes the cut. Only the ripest, densest beans survive our sorting process.",
    detail: "Before roasting even begins, every batch goes through triple sorting — first by hand at the farm level, then by density float tanks that reject hollow or underdeveloped beans, and finally by our in-house quality team who cup and score every lot on the SCA scale. A lot that scores below 85 is rejected regardless of how strong the farm relationship is. Quality is non-negotiable. Always.",
    region: "Quality Control Lab",
    process: "Triple Sorting",
    impact: "~15% Rejection Rate",
  },
  {
    id: "step-05",
    stepNumber: 5,
    tag: "Step 05",
    chapterId: "craft",
    isChapterStart: true,
    icon: "🔥",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Drum roaster with warm orange glow as coffee beans reach first crack",
    badge: "Small Batch",
    stat: "12 kg",
    statLabel: "Batch Size",
    title: "The Roast",
    desc: "Precision heat reveals hidden aromatic profiles, turning green beans into liquid gold.",
    detail: "We roast in small 12kg drum batches — never automated, always hand-monitored. Our light-to-medium roast philosophy is intentional: it preserves the origin character of each bean instead of masking it behind dark roast bitterness. Every roast profile is developed over weeks of testing, then logged, tasted, and approved before the first bag ships.",
    region: "In-House Roastery",
    process: "Drum Roasting",
    impact: "Roasted to Order",
  },
  {
    id: "step-06",
    stepNumber: 6,
    tag: "Step 06",
    chapterId: "craft",
    isChapterStart: false,
    icon: "👅",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Professional cupping table with white ceramic bowls and cupping spoons",
    badge: "Blind Tasted",
    stat: "8",
    statLabel: "Cupping Criteria",
    title: "The Cupping",
    desc: "Every lot is tasted blind before approval. Our palates are the final filter.",
    detail: "Cupping is the coffee industry's version of wine tasting — standardized, disciplined, and brutally honest. We cup every single lot blind, scoring it across eight dimensions: fragrance, aroma, flavor, aftertaste, acidity, body, balance, and overall impression. A lot that scores below 85 is rejected regardless of how good the farm relationship is. This process repeats after every roast batch, not just at origin.",
    region: "ASSAVA Tasting Lab",
    process: "SCA Cupping Protocol",
    impact: "Zero Compromise",
  },
  {
    id: "step-07",
    stepNumber: 7,
    tag: "Step 07",
    chapterId: "craft",
    isChapterStart: false,
    icon: "📦",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Sealed premium matte black coffee bag with one-way valve, close-up detail",
    badge: "Nitrogen Sealed",
    stat: "4 hrs",
    statLabel: "Roast to Seal",
    title: "The Packaging",
    desc: "Sealed within hours of roasting. Every detail designed to preserve peak freshness.",
    detail: "Oxygen is coffee's worst enemy. Within 4 hours of roasting, every batch is sealed in nitrogen-flushed, one-way valve bags that allow CO₂ to escape without letting oxygen in. Our packaging is resealable, fully biodegradable, and engineered to maintain peak flavor for up to 90 days. In practice, most bags are empty long before that.",
    region: "ASSAVA Fulfillment",
    process: "Nitrogen Flush",
    impact: "90-Day Freshness",
  },
  {
    id: "step-08",
    stepNumber: 8,
    tag: "Step 08",
    chapterId: "craft",
    isChapterStart: false,
    icon: "⏳",
    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Coffee bags resting on a wooden shelf in a dimly lit roastery warehouse",
    badge: "Degassed",
    stat: "48–96 hrs",
    statLabel: "Rest Before Dispatch",
    title: "The Rest",
    desc: "Freshly roasted isn't always best. The bean needs time to exhale before it sings.",
    detail: "Counter-intuitively, coffee roasted today is not at its best today. CO₂ trapped during roasting needs 48–96 hours to off-gas before water can properly extract the full flavor spectrum. Brewing too early produces hollow, gassy, underdeveloped cups. We rest every batch a minimum of 48 hours before dispatch. Some of our lightest roasts rest for up to 5 days. The wait is always worth it.",
    region: "Degassing Chamber",
    process: "Controlled Rest",
    impact: "Full Flavor Unlock",
  },
  {
    id: "step-09",
    stepNumber: 9,
    tag: "Step 09",
    chapterId: "ritual",
    isChapterStart: true,
    icon: "💧",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Crystal clear water pouring from a gooseneck kettle in slow motion",
    badge: "TDS Optimised",
    stat: "98%",
    statLabel: "Water in Your Cup",
    title: "The Water",
    desc: "Coffee is 98% water. What's dissolved in it changes everything.",
    detail: "Filtered water with a TDS (total dissolved solids) between 75–150 ppm is ideal for coffee extraction. Too pure — like distilled water — and it over-extracts, pulling bitter compounds. Too hard — high in calcium and magnesium — and it under-extracts, tasting flat and chalky. A simple Brita or Zerowater filter is the cheapest upgrade with the single biggest impact on your cup. Start here before buying anything else.",
    region: "Your Kitchen",
    process: "Water Chemistry",
    impact: "75–150 ppm TDS",
  },
  {
    id: "step-10",
    stepNumber: 10,
    tag: "Step 10",
    chapterId: "ritual",
    isChapterStart: false,
    icon: "🫖",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Elegant flat-lay of brewing equipment: gooseneck kettle, pour-over dripper, digital scale, and timer",
    badge: "Ritual Ready",
    stat: "3",
    statLabel: "Essential Tools",
    title: "The Ritual Setup",
    desc: "Your tools matter as much as your beans. A great cup starts before the water boils.",
    detail: "Three tools transform your brewing from inconsistent to repeatable: a gooseneck kettle for pour control, a burr grinder for uniform particle size, and a digital scale for dose precision. That's it — you don't need a $2,000 espresso machine to taste the difference between our beans and everything else you've had. We publish a free Ritual Guide for every member covering exactly how to use all three.",
    region: "Your Kitchen",
    process: "Home Brewing",
    impact: "3 Tools = Transformation",
  },
  {
    id: "step-11",
    stepNumber: 11,
    tag: "Step 11",
    chapterId: "ritual",
    isChapterStart: false,
    icon: "⚙️",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Close-up of a burr grinder with freshly ground coffee cascading from the chute",
    badge: "Precision Milled",
    stat: "±50 μm",
    statLabel: "Grind Precision",
    title: "The Grind",
    desc: "Uniform particles for perfect extraction — grind size is the most underestimated variable in coffee.",
    detail: "Too coarse and water rushes through, leaving flavor behind in an under-extracted, sour cup. Too fine and it chokes, over-extracting into a bitter, harsh one. We calibrate our café grinders daily and match published grind profiles to each bean's density and moisture content. Our Ritual Guide includes specific grind settings for every product we sell, for every popular home grinder on the market.",
    region: "Your Grinder",
    process: "Burr Grinding",
    impact: "Consistency = Flavor",
  },
  {
    id: "step-12",
    stepNumber: 12,
    tag: "Step 12",
    chapterId: "ritual",
    isChapterStart: false,
    icon: "☕",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Slow-motion pour of hot water over a V60 dripper with bloom rising from fresh coffee grounds",
    badge: "Ritual Brew",
    stat: "92°C",
    statLabel: "Brew Temperature",
    title: "The Brew",
    desc: "92°C water meets the soul of the bean in a delicate dance of chemistry.",
    detail: "Water temperature, pour rate, and bloom time each change the cup. At 92°C, water is hot enough to extract the oils and sugars that carry flavor, but gentle enough not to scorch the delicate aromatics. Begin with a 30-second bloom: a slow, circular pour that saturates the grounds and releases trapped CO₂ from the fresh roast. This single step — often skipped — unlocks the full aromatic potential before the main extraction begins.",
    region: "Pour Over · Espresso · French Press",
    process: "Controlled Extraction",
    impact: "92°C · 30s Bloom",
  },
  {
    id: "step-13",
    stepNumber: 13,
    tag: "Step 13",
    chapterId: "circle",
    isChapterStart: true,
    icon: "✨",
    image: "https://images.unsplash.com/photo-1457301353672-324d6d14f471?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Close-up of a black coffee in a white ceramic cup with steam rising, held in two hands",
    badge: "Pure Experience",
    stat: "5",
    statLabel: "Sensory Stages",
    title: "The Moment",
    desc: "A sensory journey in every single sip. The pure essence of everything that came before.",
    detail: "This is what every previous step was building toward. The aroma that reaches you before the cup reaches your lips. The first sip that silences everything else. The finish that lingers long after you've set it down. Tasting notes aren't marketing copy — they are the geography of a farm, the care of a farmer, the precision of a roaster, and the attention of a brewer, all dissolved into liquid form and waiting for you to notice.",
    region: "Wherever You Are",
    process: "Full Sensory Engagement",
    impact: "Every Sip Tells a Story",
  },
  {
    id: "step-14",
    stepNumber: 14,
    tag: "Step 14",
    chapterId: "circle",
    isChapterStart: false,
    icon: "🤝",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Group of people laughing and sharing coffee around a wooden table in warm light",
    badge: "Members Only",
    stat: "3,200+",
    statLabel: "Ritual Members",
    title: "The Community",
    desc: "Coffee tastes better when shared. The Ritual Club is where obsessives find each other.",
    detail: "Over 3,200 members receive monthly drops, exclusive single-origin releases unavailable to the public, and early access to limited harvests. Members share brewing notes, grind settings, and cup scores in our private community. Some of our best sourcing leads have come from members who spotted something special during their own travels. This is a genuine two-way relationship — not a mailing list.",
    region: "Global Community",
    process: "Monthly Membership",
    impact: "3,200+ Active Members",
  },
  {
    id: "step-15",
    stepNumber: 15,
    tag: "Step 15",
    chapterId: "circle",
    isChapterStart: false,
    icon: "🌍",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=85&w=1200",
    imageAlt: "Young farmer planting a coffee seedling in rich volcanic soil, lush forest in background",
    badge: "1% for the Planet",
    stat: "14,000+",
    statLabel: "Trees Planted",
    title: "The Legacy",
    desc: "Every cup funds the next generation of farmers. Sustainability is the foundation, not the feature.",
    detail: "5% of every ASSAVA order goes directly into our Farm Future Fund — financing equipment upgrades, school fees for farmers' children, and reforestation projects on and around our partner farms. Since 2021, we have planted over 14,000 shade trees and funded education for 38 children across Ethiopia, Colombia, and Sumatra. The cup you drink today plants the forest of tomorrow. This isn't charity — it's the only way to keep sourcing extraordinary coffee for the next 50 years.",
    region: "Ethiopia · Colombia · Sumatra",
    process: "Farm Future Fund",
    impact: "5% of Revenue Reinvested",
  },
];

export const StoryStepDetails = STORY_STEPS;

/** Get all steps for a given chapter */
export function getStepsByChapter(chapterId: string): StoryStep[] {
  return STORY_STEPS.filter(s => s.chapterId === chapterId);
}

/** Get a chapter object by ID */
export function getChapter(chapterId: string): StoryChapter | undefined {
  return STORY_CHAPTERS.find(c => c.id === chapterId);
}

/** Get the chapter a step belongs to */
export function getChapterForStep(step: StoryStep): StoryChapter | undefined {
  return getChapter(step.chapterId);
}

/** Total steps */
export const TOTAL_STEPS = STORY_STEPS.length; // 15

export const FALLBACK_IMAGES: Record<string, string> = {
  "step-01": "https://picsum.photos/seed/coffeefarm/1200/900",
  "step-02": "https://picsum.photos/seed/cherries/1200/900",
  "step-03": "https://picsum.photos/seed/sundry/1200/900",
  "step-04": "https://picsum.photos/seed/sorting/1200/900",
  "step-05": "https://picsum.photos/seed/roasting/1200/900",
  "step-06": "https://picsum.photos/seed/cupping/1200/900",
  "step-07": "https://picsum.photos/seed/packaging/1200/900",
  "step-08": "https://picsum.photos/seed/warehouse/1200/900",
  "step-09": "https://picsum.photos/seed/water/1200/900",
  "step-10": "https://picsum.photos/seed/brewsetup/1200/900",
  "step-11": "https://picsum.photos/seed/grinder/1200/900",
  "step-12": "https://picsum.photos/seed/pourover/1200/900",
  "step-13": "https://picsum.photos/seed/coffeecup/1200/900",
  "step-14": "https://picsum.photos/seed/community/1200/900",
  "step-15": "https://picsum.photos/seed/planting/1200/900",
  "default": "https://picsum.photos/seed/coffee/1200/900",
};

export const COFFEE_COLLECTIONS = [
  {
    name: "Single Origin",
    icon: "🌍",
    count: 24,
    flavours: ["Fruity", "Floral", "Citrus", "Berry", "Winey", "Sweet", "Balanced", "Juicy", "Bright", "Complex"]
  },
  {
    name: "House Blends",
    icon: "🏠",
    count: 12,
    flavours: ["Chocolate", "Nutty", "caramel", "Sweet", "Smooth", "Balanced", "Toffee", "Cocoa", "Creamy", "Rich"]
  },
  {
    name: "Rare Finds",
    icon: "💎",
    count: 5,
    flavours: ["Exotic", "Spicy", "Floral", "Winey", "Herbal", "Funky", "Tropical", "Fermented", "Wild", "Unique"]
  },
  {
    name: "Brewing Gear",
    icon: "⚖️",
    count: 18,
    flavours: ["Neutral", "Precision", "Clean", "Consistent", "Balanced", "Smooth", "Pure", "Refined", "Controlled", "Technical"]
  },
  {
    name: "Coffee Spaces",
    icon: "🏢",
    count: 8,
    flavours: ["Ambience", "Relaxing", "Social", "Cozy", "Modern", "Aesthetic", "Quiet", "Lively", "Premium", "Casual"]
  },
  {
    name: "Workshops",
    icon: "🎓",
    count: 4,
    flavours: ["Learning", "Hands-on", "Interactive", "Skill-based", "Guided", "Beginner", "Advanced", "Expert", "Fun", "Educational"]
  }
];