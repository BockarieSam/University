export interface ProgramFeature {
  title: string;
  description: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  tagline: string;
  description: string;
  duration: string;
  format: string;
  image: string;
  gallery: { src: string; caption: string }[];
  whatYouLearn: string[];
  practicalTraining: string;
  careerPaths: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  program: string;
  role: string;
  quote: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface SiteSettings {
  address: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  whatsappNumber: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
}
