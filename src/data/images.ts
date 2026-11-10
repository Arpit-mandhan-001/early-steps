/**
 * EarlySteps Dayhome Image Assets
 * 
 * NOTE FOR CUSTOMIZATION:
 * You can easily update any image path below.
 * Images currently map to the verified dayhome photographs in /images/dayhome/.
 * If you have new photographs or wish to update paths, change them right here.
 */

export const IMAGES = {
  // Hero Section
  hero: {
    main: "/images/dayhome/dayhome-1.jpeg",
    accent1: "/images/dayhome/dayhome-3.jpeg",
    accent2: "/images/dayhome/dayhome-4.jpeg",
    badge: "/images/dayhome/dayhome-5.jpeg",
  },

  // About Founder Section
  about: {
    founder: "/images/dayhome/dayhome-2.jpeg",
    classroom: "/images/dayhome/dayhome-6.jpeg",
  },

  // Care Highlights
  care: {
    homeCare: "/images/dayhome/dayhome-7.jpeg",
    playLearning: "/images/dayhome/dayhome-8.jpeg",
    mealsSnacks: "/images/dayhome/dayhome-9.jpeg",
    bilingual: "/images/dayhome/dayhome-10.jpeg",
    creativeArts: "/images/dayhome/dayhome-11.jpeg",
    outdoorPlay: "/images/dayhome/dayhome-12.jpeg",
    booksToys: "/images/dayhome/dayhome-13.jpeg",
  },

  // Space Gallery Showcase
  gallery: [
    {
      id: "sp-1",
      title: "Spacious & Bright Playroom",
      category: "playroom" as const,
      categoryLabel: "Playroom",
      description: "Sunlit open play area equipped with child-safe soft mats, learning carpets, and imaginative play sets.",
      image: "/images/dayhome/dayhome-1.jpeg",
    },
    {
      id: "sp-2",
      title: "Interactive Learning & Activity Stations",
      category: "learning" as const,
      categoryLabel: "Learning Areas",
      description: "Low-height shelves organized with Montessori-inspired puzzles, sorting trays, and early counting tools.",
      image: "/images/dayhome/dayhome-4.jpeg",
    },
    {
      id: "sp-3",
      title: "Creative Arts & Sensory Corner",
      category: "creative" as const,
      categoryLabel: "Creative Corner",
      description: "Dedicated crafting station for painting, clay modeling, tactile exploration, and daily motor-skill exercises.",
      image: "/images/dayhome/dayhome-7.jpeg",
    },
    {
      id: "sp-4",
      title: "Cozy Storytime & Reading Nook",
      category: "books" as const,
      categoryLabel: "Books & Toys",
      description: "Comfortable soft seating with an accessible library of vibrant picture books in English and Hindi.",
      image: "/images/dayhome/dayhome-10.jpeg",
    },
    {
      id: "sp-5",
      title: "Imaginative Building & Blocks Area",
      category: "books" as const,
      categoryLabel: "Books & Toys",
      description: "Safe wooden blocks, train tracks, and building sets that nurture spatial reasoning and collaborative fun.",
      image: "/images/dayhome/dayhome-13.jpeg",
    },
    {
      id: "sp-6",
      title: "Wholesome Dining & Gathering Space",
      category: "playroom" as const,
      categoryLabel: "Playroom",
      description: "Clean, hygienic dining area where children enjoy fresh daily lunches and two healthy snacks together.",
      image: "/images/dayhome/dayhome-16.jpeg",
    },
    {
      id: "sp-7",
      title: "Early Cognitive & Shape Discovery Station",
      category: "learning" as const,
      categoryLabel: "Learning Areas",
      description: "Color recognition games, animal sorting, and alphabet discovery tools designed for 1–5 year olds.",
      image: "/images/dayhome/dayhome-18.jpeg",
    },
    {
      id: "sp-8",
      title: "Fine Motor & Craft Play Desk",
      category: "creative" as const,
      categoryLabel: "Creative Corner",
      description: "Chalkboards, coloring materials, and safe tactile scissors for guided preschool preparation.",
      image: "/images/dayhome/dayhome-21.jpeg",
    },
  ],

  // Enrollment & Tour Visuals
  enrollment: {
    banner: "/images/dayhome/dayhome-14.jpeg",
    visitPreview: "/images/dayhome/dayhome-15.jpeg",
  },
};

