export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  color: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
