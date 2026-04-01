export interface CoffeeVariant {
  title: string;
  description: string;
  origin: string;
  notes: string[];
  roast: string;
  process: string;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BrewingGuide {
  method: string;
  grind: string;
  time: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  images?: string[];
  coverImages?: string[];
  category: string;
  details: string[];
  label: string;
  location?: 'cafe' | 'home' | 'office' | string;
  prepTime?: 'quick' | 'medium' | 'slow' | string;
  rating?: number;
  reviews?: number;
  tag?: string;
  profile?: {
    origin: string;
    roast: string;
    type: string;
    body?: string;
    acidity?: string;
  };
  flavorNotes?: string[];
  brewingMethods?: string[];
  
  // Premium storytelling layer
  coffeeDetails?: CoffeeVariant[];
  faqs?: FAQ[];
  story?: {
    title: string;
    description: string;
  };
  brewingGuide?: BrewingGuide[];
  productDetails?: {
    weight: string;
    roastLevel: string;
    coffeeType: string[];
    grinding: string[];
    shelfLife: string;
  };
  productReviews?: Review[];
}

export interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  userImage: string;
  text: string;
  rating: number;
  date?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoryChapter {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  accentColor: string;
}

export interface StoryStep {
  id: string;
  stepNumber: number;
  tag: string;
  chapterId: string;
  isChapterStart: boolean;
  icon: string;
  image: string;
  imageAlt: string;
  badge: string;
  stat: string;
  statLabel: string;
  title: string;
  desc: string;
  detail: string;
  region: string;
  process: string;
  impact: string;
}

export interface CoffeeEvent {
  id: string;
  title: string;
  tagline: string;
  category: 'Cultural' | 'Workshop' | 'Community' | 'Launch' | 'Pop-up' | string;
  date: string;
  time: string;
  location: string;
  description: string;
  story: string;
  heroImage: string;
  highlights: {
    title: string;
    description: string;
    image?: string;
    icon?: string;
  }[];
  timeline?: {
    time: string;
    activity: string;
  }[];
  ticketTypes?: {
    name: string;
    description: string;
    price: number;
    features: string[];
    spotsLeft?: number;
  }[];
  capacity: number;
  booked: number;
  audience: string[];
  learning?: string[];
  speakers?: {
    name: string;
    role: string;
    image: string;
  }[];
  partners: {
    name: string;
    logo?: string;
  }[];
  reviews?: {
    userName: string;
    text: string;
    rating: number;
  }[];
  images: string[];
  entryType: 'Free' | 'Paid' | 'Invite Only' | string;
  socialFeed?: {
    platform: string;
    handle: string;
    hashtags: string[];
  };
}

export interface CategoryDetailData {
  id: string;
  name: string;
  tagline: string;
  intro: string;
  story: string;
  heroImage: string;
  highlights: {
    title: string;
    description: string;
    image: string;
  }[];
  origin: {
    title: string;
    description: string;
    image: string;
  };
  gallery: string[];
  testimonials: {
    text: string;
    author: string;
  }[];
}
