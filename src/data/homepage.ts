export interface CTA {
  text: string;
  link: string;
}

export interface Highlight {
  title: string;
  desc: string;
}

export interface FloatingCategoryItem {
  id: string;
  name: string;
  image: string;
  categoryVal: string;
  isSale?: boolean;
}

export interface CollectionItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  categoryVal: string;
}

export interface PromotionBanner {
  subtitle: string;
  title: string;
  buttonText: string;
  image: string;
  categoryVal: string;
}

export interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  details: string[];
}

export interface BenefitItem {
  id: string;
  title: string;
  desc: string;
  iconName: "Truck" | "RotateCcw" | "ShieldCheck" | "HelpCircle";
}

export const secondHeroData = {
  label: "New Collection",
  title: "Elevate Your Everyday Style",
  description: "Discover timeless pieces crafted for comfort, designed for elegance, made for you.",
  ctaPrimary: { text: "Shop Now", link: "#products-section" } as CTA,
  ctaSecondary: { text: "Watch Lookbook", link: "#lookbook-section" } as CTA,
  highlights: [
    { title: "Free Shipping", desc: "On orders over $99" },
    { title: "Easy Returns", desc: "30-day returns" },
    { title: "Secure Payment", desc: "100% protected" }
  ] as Highlight[],
  images: [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
  ],
};

export const floatingCategoriesData: FloatingCategoryItem[] = [
  {
    id: "women",
    name: "Women",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=300&auto=format&fit=crop",
    categoryVal: "Dresses"
  },
  {
    id: "men",
    name: "Men",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=300&auto=format&fit=crop",
    categoryVal: "Jackets"
  },
  {
    id: "dresses",
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300&auto=format&fit=crop",
    categoryVal: "Dresses"
  },
  {
    id: "tops",
    name: "Tops",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=300&auto=format&fit=crop",
    categoryVal: "Dresses"
  },
  {
    id: "shoes",
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop",
    categoryVal: "Shoes"
  },
  {
    id: "bags",
    name: "Bags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop",
    categoryVal: "Accessories"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&auto=format&fit=crop",
    categoryVal: "Accessories"
  },
  {
    id: "sale",
    name: "Sale",
    image: "",
    categoryVal: "all",
    isSale: true
  }
];

export const featuredCollectionsData = {
  subtitle: "Shop By Category",
  title: "Find Your Perfect Style",
  ctaText: "View All Categories",
  ctaLink: "#products-section",
  items: [
    {
      id: "coll1",
      name: "Women's Collection",
      subtitle: "Explore Now",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
      categoryVal: "Dresses"
    },
    {
      id: "coll2",
      name: "Men's Collection",
      subtitle: "Explore Now",
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop",
      categoryVal: "Jackets"
    },
    {
      id: "coll3",
      name: "Dresses",
      subtitle: "Explore Now",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
      categoryVal: "Dresses"
    },
    {
      id: "coll4",
      name: "Accessories",
      subtitle: "Explore Now",
      image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=600&auto=format&fit=crop",
      categoryVal: "Accessories"
    }
  ] as CollectionItem[]
};

export const promotionsData = {
  left: {
    subtitle: "LIMITED TIME OFFER",
    title: "Spring Sale Up to 50% Off",
    buttonText: "Shop The Sale",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    categoryVal: "all"
  } as PromotionBanner,
  right: {
    subtitle: "NEW ARRIVALS",
    title: "Fresh Styles Just Landed",
    buttonText: "Explore New In",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop",
    categoryVal: "all"
  } as PromotionBanner
};

export const bestSellersData = {
  subtitle: "Best Sellers",
  title: "Our Most Loved Picks",
  ctaText: "View All Products",
  ctaLink: "#products-section",
  products: [
    {
      id: "bs1",
      name: "Linen Blend Blazer",
      category: "Jackets",
      price: 89.99,
      originalPrice: 120.0,
      rating: 5,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=500&auto=format&fit=crop",
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Cream Beige", hex: "#E8D8C8" },
        { name: "Charcoal", hex: "#2E3033" }
      ],
      description: "A tailored linen blend blazer designed for a regular, comfortable fit. Featues notched lapels, two front button closures, and front flap pockets.",
      details: ["Linen/viscose blend", "Lightweight lining in sleeves", "Dry clean only"]
    },
    {
      id: "bs2",
      name: "Ribbed Knit Top",
      category: "Dresses",
      price: 29.99,
      rating: 5,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500&auto=format&fit=crop",
      sizes: ["XS", "S", "M", "L"],
      colors: [{ name: "Midnight Black", hex: "#121212" }],
      description: "Fine knit ribbed crew neck top in high-grade organic cotton. Snug fitting silhouette with elegant short sleeves.",
      details: ["100% organic cotton", "Machine wash cold", "Imported"]
    },
    {
      id: "bs3",
      name: "Wide Leg Trousers",
      category: "Dresses",
      price: 58.99,
      originalPrice: 79.99,
      rating: 5,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=500&auto=format&fit=crop",
      sizes: ["S", "M", "L"],
      colors: [{ name: "Ivory White", hex: "#FAF9F6" }],
      description: "High waist wide leg trousers made from structural drape fabric. Front pleats, side slip pockets, and back welt pockets.",
      details: ["Polyester blend drape fabric", "Concealed hook and zip fastening", "Cool iron if needed"]
    },
    {
      id: "bs4",
      name: "Leather Shoulder Bag",
      category: "Accessories",
      price: 79.99,
      rating: 5,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop",
      sizes: ["One Size"],
      colors: [{ name: "Tan Brown", hex: "#A0522D" }],
      description: "Grained leather shoulder bag with adjustable handle and top zip closure. Internal zippered pocket and elegant gold hardware.",
      details: ["100% genuine calfskin leather", "Polyester lining", "Size: 25cm x 15cm x 7cm"]
    },
    {
      id: "bs5",
      name: "Minimal Strappy Heels",
      category: "Shoes",
      price: 49.99,
      rating: 5,
      reviews: 84,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=500&auto=format&fit=crop",
      sizes: ["37", "38", "39", "40", "41"],
      colors: [{ name: "Obsidian Black", hex: "#121212" }],
      description: "Elegant strappy heels with a minimal silhouette, slim ankle buckle strap, and square toe bed. Perfect for day-to-night styling.",
      details: ["Vegan faux-leather straps", "Padded footbed for comfort", "Heel height: 7.5cm"]
    },
    {
      id: "bs6",
      name: "Oversized Sunglasses",
      category: "Accessories",
      price: 19.99,
      rating: 5,
      reviews: 33,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500&auto=format&fit=crop",
      sizes: ["One Size"],
      colors: [{ name: "Amber Tortoise", hex: "#8B5A2B" }],
      description: "Classic oversized sunglasses with UV400 protective dark lenses, premium cellulose acetate frame, and gold branding details.",
      details: ["100% UVA/UVB protection", "Acetate frames", "Hard case and cleaning cloth included"]
    }
  ] as FeaturedProduct[]
};

export const benefitsData: BenefitItem[] = [
  {
    id: "b1",
    title: "Free Shipping",
    desc: "On orders over $99",
    iconName: "Truck"
  },
  {
    id: "b2",
    title: "Easy Returns",
    desc: "30-day returns",
    iconName: "RotateCcw"
  },
  {
    id: "b3",
    title: "Secure Payment",
    desc: "100% protected",
    iconName: "ShieldCheck"
  },
  {
    id: "b4",
    title: "24/7 Support",
    desc: "We're here to help",
    iconName: "HelpCircle"
  }
];

export const newsletterData = {
  subtitle: "GET 10% OFF YOUR FIRST ORDER",
  title: "Join Our Style List",
  description: "Sign up for exclusive offers, new arrivals, and style inspiration.",
  image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
  successMessage: "Welcome to the family. Your 10% discount code is on the way!"
};
