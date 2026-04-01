import { CategoryDetailData } from '../types';

export const CATEGORY_DATA: Record<string, CategoryDetailData> = {
  'single-origin': {
    id: 'single-origin',
    name: 'Single Origin Collection',
    tagline: 'Crafted from origin. Defined by character.',
    intro: 'A journey through the world\'s most distinctive terroirs. Each bean is a liquid map of its landscape, reflecting the specific soil, altitude, and climate of its birth.',
    story: `The story of Single Origin is the story of unyielding transparency. At ASSAVA, we believe that the best coffees are not shaped by the roast alone, but by the earth they were born from. Our collection stems from a deep obsession with terroir—the unique environmental factors that give a coffee its soul. Every bean in this collection carries the narrative of its land—from the misty, high-altitude slopes of the Eastern Ghats to the sun-drenched, volcanic plantations of Coorg. These are not just coffees; they are expressions of geography, culture, and time. We work directly with farmers who see their coffee trees as an extension of the forest, preserving biodiversity while pushing the boundaries of precision processing. When you brew a cup from our Single Origin collection, you are not just tasting a beverage; you are experiencing a moment in time from a specific coordinate on the planet. Whether it is the bright, citrusy acidity of an Ethiopian heirloom or the deep, chocolatey body of a honey-processed Indian micro-lot, the character is unmistakable. This is coffee in its purest form—unblended, unapologetic, and undeniably ASSAVA.`,
    heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=85&w=2400',
    highlights: [
      {
        title: 'Micro-Lot Precision',
        description: 'Sourced from specific sections of the estate to ensure absolute flavor profile consistency.',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=85&w=800'
      },
      {
        title: 'Direct Trade Ritual',
        description: 'We cut the noise, working directly with growers to ensure fair pay and shared innovation.',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=85&w=800'
      },
      {
        title: 'Seasonal Narrative',
        description: 'Our collection rotates with the harvest cycles, ensuring you only drink what is at its peak.',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=85&w=800'
      }
    ],
    origin: {
      title: 'The Terroir Philosophy',
      description: 'From the shade-grown canopies of Araku to the legendary hills of Sidamo, our origins are selected for their ability to challenge and delight the modern palate.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=85&w=1200'
    },
    gallery: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=85&w=800',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=85&w=800',
      'https://images.unsplash.com/photo-1497933322477-941fb4327440?auto=format&fit=crop&q=85&w=800',
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=85&w=800'
    ],
    testimonials: [
      {
        text: "The Ghats roast redefined my understanding of Indian coffee. It's complex, floral, and deeply soul-filling.",
        author: "Vikram S."
      },
      {
        text: "ASSAVA doesn't sell beans; they provide a gateway to the lands where they grow. Exceptional curation.",
        author: "Sarah L."
      }
    ]
  },
  'rare-finds': {
    id: 'rare-finds',
    name: 'Rare Finds & Micro-lots',
    tagline: 'Limited expressions. Extraordinary character.',
    intro: 'Disappearing varietals and experimental lots that exist only for a moment. These are the rarest expressions of coffee we have ever encountered.',
    story: `The Rare Finds collection is the pinnacle of the ASSAVA ritual. It is a curated selection of coffees that represent the absolute edge of what is possible in viticulture and processing. We hunt for the outliers—the trees that survived a century, the farmers who gambled on a 96-hour anaerobic fermentation, the seeds that yield only a few bags per year. This is not coffee for the casual observer. This is for the seekers, the obsessives, and those who understand that rarity is its own form of beauty. Each micro-lot is chosen for its specific sensory disruption—flavors that shouldn't exist in coffee, but do. Notes of vintage wine, tropical fermentations, and delicate jasmine that vanish as quickly as they appear. To drink a Rare Find is to participate in an exclusive chapter of coffee history. Once these lots are gone, they are rarely replicated. They are ephemeral, precious, and represent our ultimate commitment to the specialty movement. From Geshas that hum with floral intensity to wild Arabicas found in high-altitude forests, this is the frontier of flavor.`,
    heroImage: 'https://images.unsplash.com/photo-1497933322477-941fb4327440?auto=format&fit=crop&q=80&w=2400',
    highlights: [],
    origin: {
      title: 'Hidden Territories',
      description: 'Sourced from the most remote corners of the coffee belt, where coffee still grows wild and untouched.',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=85&w=1200'
    },
    gallery: [],
    testimonials: []
  },
  'brewing-gear': {
    id: 'brewing-gear',
    name: 'Precision Brewing Gear',
    tagline: 'The tools of precision. Built for the master.',
    intro: 'Engineered instruments designed to translate bean character into liquid ritual. From hand-crafted drippers to precision grinders.',
    story: `At ASSAVA, we believe that the vessel and the tool are as important as the bean. A masterpiece deserves a perfect stage. Our brewing collection is a curated selection of instruments that prioritize precision, durability, and tactile beauty. We have selected gear that empowers the manual extraction process. Whether you are chasing the crystal clarity of a Chemex brew or the concentrated intensity of a manual lever machine, our gear is chosen for its ability to give the ritualist absolute control. Every click of a grinder, every degree of water temperature, and every second of extraction matters. These are not just appliances; they are the artifacts of a daily devotion. Designed for those who find joy in the measurement and peace in the process. From specialty filters that clarify flavor to kettles that provide the perfect flow, this is the hardware of the ASSAVA lifestyle.`,
    heroImage: 'https://images.unsplash.com/photo-1544787210-2213d84ad96b?auto=format&fit=crop&q=80&w=2400',
    highlights: [],
    origin: {
      title: 'Precision Engineering',
      description: 'Our partners are artisans from around the globe who share our obsession with design and functionality.',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=85&w=1200'
    },
    gallery: [],
    testimonials: []
  },
  'house-blends': {
    id: 'house-blends',
    name: 'House Blends Registry',
    tagline: 'The alchemy of balance. Orchestrated for the daily ritual.',
    intro: 'Our signature orchestrations, designed for the discerning palate. A consistent, daily devotion to balance and body.',
    story: `The House Blend is the ultimate challenge for the master roaster. While single origins celebrate the singular voice of a terroir, a blend is a symphony. It requires a deep understanding of how different beans interact—how the bright acidity of an East African bean can lean into the deep, chocolatey structure of a South American lot. At ASSAVA, our blends are not stationary artifacts. They are living compositions that we adjust with every seasonal shift to maintain a consistent emotional profile. We roast each component separately to its own peak before bringing them together in a final, harmonious union. This is the coffee we drink every morning at the roastery—a reliable, complex, and comforting ritual that never fails to center the soul.`,
    heroImage: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=2400',
    highlights: [],
    origin: {
      title: 'Global Orchestration',
      description: 'Sourcing components from across the coffee belt to create a profile that is greater than the sum of its parts.',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=85&w=1200'
    },
    gallery: [],
    testimonials: []
  },
  'coffee-spaces': {
    id: 'coffee-spaces',
    name: 'Curated Coffee Spaces',
    tagline: 'Environment as ingredient. Elevate your sanctuary.',
    intro: 'Elements designed to transform your physical space into a sanctuary of stillness and devotion.',
    story: `We believe that coffee is as much about where you are as what you drink. The environment is the final ingredient in the ritual of extraction. Our Coffee Spaces collection is a curated selection of elements—from artisanal ceramics to sensory lighting—designed to help you build your own corner of stillness in a chaotic world. These are artifacts chosen for their tactile beauty and their ability to encourage mindfulness. We work with artisans who understand that a mug should feel like an extension of the hand, and that a tray is not just a carrier, but a stage. This is the hardware of the slow-living movement, selected for those who take their rituals seriously.`,
    heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2400',
    highlights: [],
    origin: {
      title: 'Artisanal Sourcing',
      description: 'Handcrafted elements from global studios that share our devotion to minimalist utility and raw aesthetic.',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=1200'
    },
    gallery: [],
    testimonials: []
  },
  'workshops': {
    id: 'workshops',
    name: 'Extraction Workshops',
    tagline: 'Knowledge refined. The science and soul of the cup.',
    intro: 'Immersive sessions focused on mastering the manual extraction process. Learn to translate character into liquid.',
    story: `The journey from bean to cup is a series of variables. Our workshops are designed to help you master those variables. From sensory cupping sessions to precision brewing technique, we provide the environment and the knowledge to help you refine your daily ritual. Led by our master roasters and ritualists, these sessions go beyond the basics. We explore the chemistry of water, the physics of grind size, and the art of sensory descriptors. Whether you are a beginner looking to understand the fundamentals or an enthusiast chasing the perfect extraction, our workshops are a space for shared devotion and discovery.`,
    heroImage: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=2400',
    highlights: [],
    origin: {
      title: 'Academy of Ritual',
      description: 'Our flagship roastery in Bhubaneswar serves as the crucible for our educational sessions.',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=85&w=1200'
    },
    gallery: [],
    testimonials: []
  }
};
