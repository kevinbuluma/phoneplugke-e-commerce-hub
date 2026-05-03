export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  condition: "New" | "Refurbished";
  storage?: string;
  specs: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 189999,
    originalPrice: 209999,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop",
    category: "Smartphones",
    condition: "New",
    storage: "256GB",
    specs: ["A17 Pro chip", "48MP Camera", "Titanium Design", "USB-C"],
    inStock: true,
    rating: 4.9,
    reviews: 234,
    badge: "🔥 Hot Deal",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 174999,
    originalPrice: 194999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
    category: "Smartphones",
    condition: "New",
    storage: "256GB",
    specs: ["Snapdragon 8 Gen 3", "200MP Camera", "S Pen", "AI Features"],
    inStock: true,
    rating: 4.8,
    reviews: 189,
    badge: "⭐ Best Seller",
  },
  {
    id: "3",
    name: "Tecno Camon 30 Pro",
    brand: "Tecno",
    price: 34999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    category: "Smartphones",
    condition: "New",
    storage: "256GB",
    specs: ["MediaTek Dimensity 8200", "50MP Camera", "5000mAh", "AMOLED"],
    inStock: true,
    rating: 4.5,
    reviews: 78,
  },
  {
    id: "4",
    name: "Infinix Note 40 Pro",
    brand: "Infinix",
    price: 29999,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop",
    category: "Smartphones",
    condition: "New",
    storage: "128GB",
    specs: ["Helio G99", "108MP Camera", "5000mAh", "68W Charge"],
    inStock: true,
    rating: 4.4,
    reviews: 56,
  },
  {
    id: "5",
    name: "iPhone 13 (Refurbished)",
    brand: "Apple",
    price: 59999,
    originalPrice: 89999,
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&h=500&fit=crop",
    category: "Refurbished",
    condition: "Refurbished",
    storage: "128GB",
    specs: ["A15 Bionic", "Dual Camera", "Grade A Condition", "6 Month Warranty"],
    inStock: true,
    rating: 4.3,
    reviews: 45,
    badge: "💰 Value Pick",
  },
  {
    id: "6",
    name: "AirPods Pro 2nd Gen",
    brand: "Apple",
    price: 34999,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=500&fit=crop",
    category: "Accessories",
    condition: "New",
    specs: ["Active Noise Cancellation", "USB-C", "Adaptive Audio", "6hr Battery"],
    inStock: true,
    rating: 4.8,
    reviews: 312,
  },
  {
    id: "7",
    name: "Samsung Galaxy Buds FE",
    brand: "Samsung",
    price: 12999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&h=500&fit=crop",
    category: "Accessories",
    condition: "New",
    specs: ["ANC", "30hr Battery", "IPX2", "Galaxy Wearable"],
    inStock: true,
    rating: 4.4,
    reviews: 98,
  },
  {
    id: "8",
    name: "65W Fast Charger Kit",
    brand: "PhonePlugKE",
    price: 2999,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&h=500&fit=crop",
    category: "Accessories",
    condition: "New",
    specs: ["65W GaN", "USB-C + USB-A", "Universal", "Cable Included"],
    inStock: true,
    rating: 4.6,
    reviews: 201,
    badge: "🔌 Essential",
  },
];

export const categories = [
  { name: "Smartphones", icon: "📱", count: 45 },
  { name: "Accessories", icon: "🎧", count: 120 },
  { name: "Deals & Offers", icon: "🔥", count: 18 },
  { name: "Refurbished", icon: "♻️", count: 32 },
];

export const brands = ["All", "Apple", "Samsung", "Tecno", "Infinix", "PhonePlugKE"];
export const conditions = ["All", "New", "Refurbished"];
export const storageOptions = ["All", "64GB", "128GB", "256GB", "512GB", "1TB"];
