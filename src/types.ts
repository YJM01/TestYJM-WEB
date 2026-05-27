export interface WebPackage {
  id: string;
  name: string;
  priceLKR: string;
  priceRange: string;
  idealFor: string;
  deliveryDays: string;
  features: string[];
  recommended?: boolean;
}

export interface MaintenancePlan {
  name: string;
  priceLKR: string;
  features: string[];
  tierName: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  badge: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  website?: string;
  content: string;
  rating: number;
}

export interface DemoProject {
  title: string;
  category: string;
  description: string;
  imageAlt: string;
  techStack: string[];
  mockupUrl: string; // We can use elegant custom-designed SVG or Unsplash previews
}

export interface EstimateSelection {
  businessType: string;
  customDetails: string;
  selectedTier: string;
  features: string[];
  maintenance: string;
  clientName: string;
  clientContact: string; 
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}
