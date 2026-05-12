export type ProductCategory =
  | "grooming"
  | "walking"
  | "feeding"
  | "cleaning";

export type Product = {
  id: string;
  nameEn: string;
  nameZh: string;
  category: ProductCategory;
  priceCad: number;
  images: string[];
  specs: Record<string, string>;
  descriptionEn: string;
  descriptionZh: string;
  tags: string[];
  featured: boolean;
};

export const catalogConfig = {
  brandName: "Vancouver Pet Picks",
  whatsappNumber: "16045550123",
  currency: "CAD",
  city: "Vancouver",
} as const;

export const categoryLabels: Record<
  ProductCategory | "all",
  { en: string; zh: string }
> = {
  all: { en: "All", zh: "全部" },
  grooming: { en: "Grooming", zh: "美容工具" },
  walking: { en: "Walking", zh: "出行用品" },
  feeding: { en: "Feeding", zh: "喂食用品" },
  cleaning: { en: "Cleaning", zh: "清洁耗材" },
};

export const products: Product[] = [
  {
    id: "slicker-brush",
    nameEn: "Soft Pin Slicker Brush",
    nameZh: "软针开结梳",
    category: "grooming",
    priceCad: 18.5,
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85",
    ],
    specs: {
      Material: "Stainless steel pins, beech handle",
      Size: "Small / Medium coats",
      "Best for": "Doodles, poodles, double coats",
    },
    descriptionEn:
      "A gentle daily brush for removing loose coat and finding small tangles before bath day.",
    descriptionZh: "适合日常梳毛和洗澡前检查小结，手柄稳定，针面柔和。",
    tags: ["Groomer pick", "Daily care"],
    featured: true,
  },
  {
    id: "quick-dry-towel",
    nameEn: "Quick-Dry Pet Towel",
    nameZh: "宠物速干毛巾",
    category: "grooming",
    priceCad: 16.9,
    images: [
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=900&q=85",
    ],
    specs: {
      Material: "Microfiber",
      Size: "70 x 100 cm",
      "Best for": "Baths, rainy walks, travel",
    },
    descriptionEn:
      "Absorbent microfiber towel sized for bath days and post-walk cleanups.",
    descriptionZh: "吸水快、容易拧干，适合洗澡、雨天遛狗和外出备用。",
    tags: ["Bath day", "Fast dry"],
    featured: true,
  },
  {
    id: "silicone-feeding-mat",
    nameEn: "Silicone Feeding Mat",
    nameZh: "硅胶喂食垫",
    category: "feeding",
    priceCad: 14.9,
    images: [
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=900&q=85",
    ],
    specs: {
      Material: "Food-grade silicone",
      Size: "48 x 30 cm",
      "Best for": "Bowls, wet food, water spills",
    },
    descriptionEn:
      "A flexible mat with a raised lip to keep food and water mess contained.",
    descriptionZh: "边缘加高，减少水碗和湿粮弄脏地面，清洗方便。",
    tags: ["Easy clean", "Food grade"],
    featured: false,
  },
  {
    id: "slow-feeder-bowl",
    nameEn: "Slow Feeder Bowl",
    nameZh: "慢食碗",
    category: "feeding",
    priceCad: 22,
    images: [
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?auto=format&fit=crop&w=900&q=85",
    ],
    specs: {
      Material: "BPA-free plastic",
      Size: "2 cup capacity",
      "Best for": "Fast eaters, medium dogs",
    },
    descriptionEn:
      "A non-slip bowl that helps dogs slow down during meals without making cleanup hard.",
    descriptionZh: "适合吃饭太快的狗狗，底部防滑，结构不复杂，方便清洗。",
    tags: ["BPA-free", "Non-slip"],
    featured: false,
  },
  {
    id: "poop-bag-rolls",
    nameEn: "Leak-Resistant Poop Bags",
    nameZh: "加厚拾便袋",
    category: "cleaning",
    priceCad: 12.9,
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=85",
    ],
    specs: {
      Material: "Plant-based blend",
      Size: "15 rolls / 225 bags",
      "Best for": "Daily walks",
    },
    descriptionEn:
      "Compact rolls for leash bags and coat pockets, with a thicker feel for daily walks.",
    descriptionZh: "适合日常遛狗，卷装方便携带，袋身加厚更安心。",
    tags: ["Daily refill", "Value pack"],
    featured: true,
  },
  {
    id: "adjustable-harness",
    nameEn: "Adjustable Comfort Harness",
    nameZh: "可调节舒适胸背",
    category: "walking",
    priceCad: 29,
    images: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=85",
    ],
    specs: {
      Material: "Nylon webbing, padded mesh",
      Size: "XS to L",
      "Best for": "Everyday walks",
    },
    descriptionEn:
      "Lightweight padded harness with simple adjustment points for a cleaner everyday fit.",
    descriptionZh: "轻量透气，多个调节点，适合日常散步和美容后搭配推荐。",
    tags: ["Adjustable", "Padded"],
    featured: false,
  },
];

export function formatCad(price: number) {
  return `C$${price.toFixed(2)}`;
}
