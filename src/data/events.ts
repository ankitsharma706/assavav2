import { CoffeeEvent } from '../types';

export const EVENTS: CoffeeEvent[] = [
  {
    id: 'kora-kulture',
    title: 'KORA KULTURE',
    tagline: 'Brew, Bites & Beats',
    category: 'Cultural',
    date: 'March 21, 2026',
    time: '4:00 PM – 7:00 PM',
    location: 'Kulture Coffee, Kolkata',
    description: 'Bringing Eastern India together in a cup. A cultural celebration of specialty Ghats coffee roasted by Assava.',
    story: 'Kulture turns one. The evening comes alive with live music, a curated brewing session of specialty Eastern Ghats coffee roasted and curated by Assava, and an exclusive first look at partner merchandise.',
    heroImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=85&w=1200',
    highlights: [
      {
        title: 'Live Brewing Session',
        description: 'V60 and AeroPress masterclass with Assava head roasters.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=85&w=800',
        icon: '☕'
      },
      {
        title: 'Specialty Coffee Showcase',
        description: 'Exotic micro-lots rarely seen in the wild.',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=85&w=800',
        icon: '✨'
      },
      {
        title: 'Cultural Music',
        description: 'Atmospheric beats inspired by the coffee-growing highlands.',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=85&w=800',
        icon: '🎵'
      }
    ],
    timeline: [
      { time: '4:00 PM', activity: 'Welcome Brew & Guest Registry' },
      { time: '5:00 PM', activity: 'The Ghats Brewing Masterclass' },
      { time: '6:00 PM', activity: 'Live Acoustic Performance' },
      { time: '6:30 PM', activity: 'Merchandise Drop & Socializing' }
    ],
    audience: ['Coffee Enthusiasts', 'Culture Lovers', 'Creators', 'Entrepreneurs'],
    learning: ['Brewing techniques', 'Flavor profiling', 'Coffee origins'],
    speakers: [
      { name: 'Rohan Sharma', role: 'Head Roaster, Assava', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=85&w=200' }
    ],
    partners: [
      { name: 'Assava' },
      { name: 'Kappi Machines' },
      { name: 'Kulture' }
    ],
    reviews: [
      { userName: 'Amit K.', text: 'The most authentic coffee experience in Kolkata. The Ghats roast was exceptional.', rating: 5 }
    ],
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=85&w=1200'
    ],
    ticketTypes: [
      { 
        name: 'General Access', 
        description: 'Perfect for first-time ritualists.',
        price: 299, 
        features: ['Welcome Coffee', 'Music Performance', 'Brewing Demo'], 
        spotsLeft: 12 
      },
      { 
        name: 'Premium Experience', 
        description: 'The complete immersion.',
        price: 999, 
        features: ['VIP Front Seating', 'Limited Roast Kit', 'Workshop Access', 'Meet the Roasters'], 
        spotsLeft: 5 
      }
    ],
    capacity: 100,
    booked: 83,
    entryType: 'Paid Entry',
    socialFeed: {
      platform: "instagram",
      handle: "@assava_coffee",
      hashtags: ["#AssavaEvents", "#KoraKulture"]
    }
  },
  {
    id: 'midnight-cupping',
    title: 'DARK RITUALS',
    tagline: 'Midnight Cupping Session',
    category: 'Workshop',
    date: 'April 12, 2026',
    time: '11:00 PM – 1:00 AM',
    location: 'Assava Lab, HQ',
    description: 'A sensory journey through the dark heart of roasting. Minimal light, maximum focus.',
    story: 'In the stillness of the night, when the world is silent, the palate wakes up.',
    heroImage: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=85&w=1200',
    highlights: [
      {
        title: 'Blind Cupping',
        description: 'Score rare lots without visual bias.',
        icon: '🫣'
      },
      {
        title: 'Roasting Theory',
        description: 'Understanding First Crack and the Maillard reaction.',
        icon: '🔥'
      }
    ],
    ticketTypes: [
      {
        name: 'Cupping Pass',
        description: 'Entry to the dark room.',
        price: 499,
        features: ['Score sheets', 'Cupping spoon', 'Sample kit'],
        spotsLeft: 8
      },
      {
        name: 'Master Ritualist',
        description: 'One-on-one with the Head Roaster.',
        price: 1499,
        features: ['Private Q&A', 'Take-home Micro-lot', 'Lab Certification'],
        spotsLeft: 3
      }
    ],
    capacity: 20,
    booked: 9,
    audience: ['Professional cuppers', 'Night owls', 'Flavor hunters'],
    partners: [
      { name: 'Assava' },
      { name: 'SCA Certified Lab' }
    ],
    images: [
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=85&w=1200'
    ],
    entryType: 'Invite Only',
    socialFeed: {
      platform: "instagram",
      handle: "@assava_coffee",
      hashtags: ["#MidnightCupping", "#AssavaHQ"]
    }
  }
];
