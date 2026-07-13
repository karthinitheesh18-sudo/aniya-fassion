export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  isBestseller?: boolean;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  details: string[];
}

export interface CartItem {
  id: string; // unique combination of product ID, size, and color
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}
