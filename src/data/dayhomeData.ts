export interface NavItem {
  label: string;
  href: string;
}

export interface CarePillar {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  tag: string;
}

export interface SpaceGalleryItem {
  id: string;
  title: string;
  category: "all" | "playroom" | "learning" | "creative" | "books";
  categoryLabel: string;
  description: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  relation: string;
  location: string;
  content: string;
  isSample: true;
  rating: number;
}

export interface BlogItem {
  id: string;
  title: string;
  readTime: string;
  category: string;
  summary: string;
  date: string;
  isSample: true;
}

export const BUSINESS_INFO = {
  name: "EarlySteps Dayhome",
  tagline: "Little steps. Big beginnings.",
  mainMessage:
    "A caring home away from home where little ones feel safe, make friends, discover new things, and grow through play.",
  ageGroup: "1–5 years",
  location: {
    neighborhood: "Whitehorn",
    city: "Calgary",
    province: "Alberta",
    country: "Canada",
    fullAddress: "Whitehorn, Calgary, Alberta, Canada",
  },
  contact: {
    phone: "403-467-8895",
    phoneDisplay: "403-467-8895",
    phoneTel: "tel:4034678895",
    email: "EarlySteps786dayhome@gmail.com",
    emailMailto: "mailto:EarlySteps786dayhome@gmail.com",
    instagramHandle: "@dayhomeearlysteps",
    instagramUrl: "https://instagram.com/dayhomeearlysteps",
  },
  founder: {
    name: "Indu Bala",
    title: "Founder & Level 3 Early Childhood Educator",
    origin: "Originally from New Delhi, India",
    family: "Proud mother of three",
    experienceYears: "9 years of childcare experience",
    startedYear: 2017,
    certifications: [
      {
        year: "2021",
        title: "Level 2 Certification",
        institution: "Red Deer Polytechnic",
        description: "Comprehensive foundation in early childhood learning environments.",
      },
      {
        year: "2025",
        title: "Level 3 Certification",
        institution: "Alberta Child Care Credential",
        description: "Alberta's highest Early Childhood Educator qualification.",
      },
      {
        year: "Active",
        title: "Standard First Aid & CPR",
        institution: "Canadian Red Cross / Certified",
        description: "Comprehensive pediatric and child first aid readiness.",
      },
      {
        year: "Verified",
        title: "Police Information Clearance",
        institution: "Calgary Police Service",
        description: "Full background and vulnerable sector check completed.",
      },
    ],
    bio: [
      "Welcome to EarlySteps! I'm Indu Bala, a mother of three and a certified Level 3 Early Childhood Educator with 9 years of dedicated childcare experience in Calgary. Originally from New Delhi, India, I founded EarlySteps Dayhome to give families what every parent dreams of: a warm, secure, home-away-from-home where young children can take their very first steps into lifelong learning.",
      "My childcare journey began in 2017. Guided by a genuine love for early development, I earned my Level 2 certification through Red Deer Polytechnic in 2021 and achieved my Level 3 certification in 2025. With full First Aid training and police clearance, safety is always first—followed closely by warmth, giggles, wholesome home-cooked meals, and imaginative play.",
    ],
  },
  enrollmentNote:
    "We are currently welcoming enrollment enquiries for children aged 1–5. Because spaces are limited to ensure personalized, attentive care, we invite you to contact Indu directly for current availability, hours, fees, and to arrange a warm in-person visit.",
};

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Care", href: "/our-care" },
  { label: "Our Space", href: "/space" },
  { label: "Enrollment", href: "/enrollment" },
];

export const CARE_PILLARS: CarePillar[] = [
  {
    id: "home-care",
    title: "Warm Home-Based Childcare",
    shortDesc: "A safe, nurturing home setting where every child is seen, valued, and comforted.",
    fullDesc:
      "A gentle home-based environment provides emotional security and a relaxed daily rhythm, making the transition away from parents peaceful and reassuring for toddlers and preschoolers.",
    iconName: "Home",
    tag: "Safe & Cozy",
  },
  {
    id: "play-learning",
    title: "Play-Based Learning",
    shortDesc: "Age-appropriate activities designed to spark natural curiosity and creativity.",
    fullDesc:
      "Children learn best when they are actively discovering. Through sensory stations, building blocks, and guided games, children develop critical thinking, problem-solving, and coordination.",
    iconName: "Sparkles",
    tag: "Ages 1–5",
  },
  {
    id: "meals-snacks",
    title: "Healthy Lunch & Two Snacks Daily",
    shortDesc: "Nutritious, freshly prepared meals that fuel active minds and growing bodies.",
    fullDesc:
      "Every full day includes a wholesome lunch and two nutritious snacks. We focus on clean, balanced ingredients and encourage healthy table manners and social sharing.",
    iconName: "Apple",
    tag: "Nutritious Daily",
  },
  {
    id: "bilingual-comm",
    title: "English & Hindi Communication",
    shortDesc: "Bilingual immersion and conversational comfort for multicultural families.",
    fullDesc:
      "We communicate fluently in both English and Hindi, supporting language acquisition, cultural connection, and giving children confidence in dual-language environments.",
    iconName: "Languages",
    tag: "Bilingual Care",
  },
  {
    id: "creative-arts",
    title: "Art, Crafts & Creative Activities",
    shortDesc: "Hands-on exploration with finger paints, playdough, cutting, and coloring.",
    fullDesc:
      "Daily creative craft time helps develop fine motor coordination, hand-eye dexterity, color recognition, and creative self-expression in a joyful, mess-friendly environment.",
    iconName: "Palette",
    tag: "Fine Motor Skills",
  },
  {
    id: "outdoor-play",
    title: "Outdoor Play & Physical Movement",
    shortDesc: "Fresh air, gross motor games, and movement to build energy and coordination.",
    fullDesc:
      "Weather-appropriate outdoor play and structured physical movement keep little ones active, happy, and connected to the natural world while developing balance and strength.",
    iconName: "Sun",
    tag: "Fresh Air & Fun",
  },
  {
    id: "books-toys",
    title: "Books, Imaginative Play & Toys",
    shortDesc: "Rich storybooks, pretend play corners, and hands-on tactile toys.",
    fullDesc:
      "A cozy book corner fosters early literacy and language comprehension, while dress-up clothes, dolls, cars, and blocks encourage rich social pretend play and imagination.",
    iconName: "BookOpen",
    tag: "Early Literacy",
  },
];

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "sample-1",
    author: "Priya & Raj K.",
    relation: "Parents of a 2-year-old",
    location: "Whitehorn, Calgary",
    content:
      "Finding a dayhome that feels like family was our highest priority. Indu's Level 3 knowledge and the warm home atmosphere made our transition so gentle. Our daughter loves the art projects and asks for Miss Indu on weekends!",
    isSample: true,
    rating: 5,
  },
  {
    id: "sample-2",
    author: "Sarah M.",
    relation: "Mother of a 3-year-old boy",
    location: "NE Calgary",
    content:
      "The combination of fresh home-cooked meals, bilingual English & Hindi exposure, and structured play is amazing. Indu shares thoughtful updates, and my son has developed so much confidence and vocabulary.",
    isSample: true,
    rating: 5,
  },
  {
    id: "sample-3",
    author: "Aman & Harpreet S.",
    relation: "Parents of a 4-year-old",
    location: "Calgary, AB",
    content:
      "The clean, bright playroom and outdoor time give our son the perfect balance. You can tell Indu has 9 years of dedicated experience and genuine love for children. Highly recommended for parents looking for a safe space in Whitehorn.",
    isSample: true,
    rating: 5,
  },
];

export const SAMPLE_BLOGS: BlogItem[] = [
  {
    id: "sample-blog-1",
    title: "Why Play-Based Learning Builds Strong Foundations for Ages 1–5",
    readTime: "4 min read",
    category: "Early Learning",
    summary:
      "Discover how open-ended play, sensory bins, and block building wire early cognitive pathways more effectively than early worksheets for toddlers and preschoolers.",
    date: "November 2026",
    isSample: true,
  },
  {
    id: "sample-blog-2",
    title: "Nurturing Bilingual Confidence: The Benefits of English & Hindi",
    readTime: "3 min read",
    category: "Child Development",
    summary:
      "How hearing and speaking both English and Hindi at a young age boosts executive function, cultural appreciation, and cognitive adaptability.",
    date: "November 2026",
    isSample: true,
  },
  {
    id: "sample-blog-3",
    title: "A Gentle Transition: Preparing Your Toddler for Their First Dayhome Days",
    readTime: "5 min read",
    category: "Parenting Tips",
    summary:
      "Practical strategies from a Level 3 Educator and mother of three on easing separation anxiety and establishing a reassuring daily morning routine.",
    date: "November 2026",
    isSample: true,
  },
];

