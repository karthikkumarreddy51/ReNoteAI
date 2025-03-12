export interface Product {
  id: string;
  name: string;
  image?: string;
  price: number;
  discountedPrice?: number;
  description?: string;
  rating?: number;
  reviewCount?: number;
  status?: string;
}
