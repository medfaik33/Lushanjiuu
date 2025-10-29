
export interface Product {
  id: number;
  name: string;
  images: {
    src: string;
    alt: string;
  }[];
  price: string;
  description: string;
  short_description: string;
  sku?: string;
  stock_status: 'instock' | 'outofstock';
  categories?: {
    name: string;
  }[];
}

export interface Post {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_image_url: string;
}
