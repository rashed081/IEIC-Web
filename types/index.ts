// types/index.ts

export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    origin: string;
    packaging: string;
    shipping: string;
    moq: string;
    certifications: string[];
    images: string[];
  }
  
  export interface Client {
    id: string;
    name: string;
    logo: string;
    createdAt: any;
  }
  
  export interface Review {
    id: string;
    clientName: string;
    companyName: string;
    review: string;
    createdAt: any;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }