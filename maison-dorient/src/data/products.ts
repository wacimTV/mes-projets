export type Category = "Baklava" | "Cornes de Gazelle" | "Makrout" | "Zlabia" | "Loukoums" | "Pâtisseries au Miel" | "Coffrets Cadeaux";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  rating: number;
  reviewsCount: number;
  image: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "baklava-pistache-royale",
    name: "Baklava Pistache Royale",
    description: "Fines feuilles de pâte filo croustillantes, généreusement garnies de pistaches d'Alep concassées et nappées d'un sirop léger au miel et à l'eau de rose.",
    price: 38,
    category: "Baklava",
    rating: 4.9,
    reviewsCount: 124,
    image: "/images/baklava.png",
    tags: ["Pistache", "Miel", "Signature"]
  },
  {
    id: "baklava-noix-cannelle",
    name: "Baklava Noix & Cannelle",
    description: "L'alliance parfaite de la noix et de la cannelle, enveloppée dans notre pâte filo artisanale et dorée au four.",
    price: 34,
    category: "Baklava",
    rating: 4.8,
    reviewsCount: 89,
    image: "/images/baklava.png", // Reusing image
    tags: ["Noix", "Cannelle"]
  },
  {
    id: "corne-gazelle-tradition",
    name: "Corne de Gazelle Tradition",
    description: "L'authentique pâtisserie marocaine. Une pâte fine et fondante renfermant un cœur moelleux d'amandes parfumées à l'eau de fleur d'oranger.",
    price: 24,
    category: "Cornes de Gazelle",
    rating: 5.0,
    reviewsCount: 210,
    image: "/images/gazelle_horns.png",
    tags: ["Amande", "Fleur d'oranger", "Tradition"]
  },
  {
    id: "corne-gazelle-sucre",
    name: "Corne de Gazelle Glacée",
    description: "Notre corne de gazelle traditionnelle délicatement enrobée d'un glaçage au sucre glace pour une touche de gourmandise supplémentaire.",
    price: 26,
    category: "Cornes de Gazelle",
    rating: 4.7,
    reviewsCount: 156,
    image: "/images/gazelle_horns.png", // Reusing image
    tags: ["Amande", "Sucre glace"]
  },
  {
    id: "makrout-miel-dattes",
    name: "Makrout aux Dattes & Miel",
    description: "Losanges de semoule dorés, fourrés d'une pâte de dattes fondante, frits et plongés dans un bain de miel parfumé.",
    price: 28,
    category: "Makrout",
    rating: 4.9,
    reviewsCount: 178,
    image: "/images/makrout.png",
    tags: ["Dattes", "Semoule", "Miel"]
  },
  {
    id: "makrout-amandes-four",
    name: "Makrout aux Amandes (Au Four)",
    description: "Une version plus légère de notre grand classique, cuit au four et fourré aux amandes concassées.",
    price: 30,
    category: "Makrout",
    rating: 4.6,
    reviewsCount: 92,
    image: "/images/makrout.png", // Reusing image
    tags: ["Amande", "Léger", "Miel"]
  },
  {
    id: "zlabia-fleur-oranger",
    name: "Zlabia Dorée",
    description: "Spirales croustillantes et aérées, imprégnées d'un sirop onctueux au miel et à la fleur d'oranger.",
    price: 22,
    category: "Zlabia",
    rating: 4.8,
    reviewsCount: 312,
    image: "/images/zlabia.png",
    tags: ["Croustillant", "Miel", "Fleur d'oranger"]
  },
  {
    id: "loukoum-rose-pistache",
    name: "Loukoums Rose & Pistache",
    description: "Cubes moelleux de délice turc à la délicate saveur de rose, incrustés de pistaches croquantes et poudrés de sucre glace.",
    price: 25,
    category: "Loukoums",
    rating: 4.7,
    reviewsCount: 145,
    image: "/images/zlabia.png", // Placeholder/fallback
    tags: ["Rose", "Pistache", "Moelleux"]
  },
  {
    id: "loukoum-grenade",
    name: "Loukoums à la Grenade",
    description: "Une création acidulée et sucrée à base de jus de grenade frais, parsemée d'éclats de noix.",
    price: 26,
    category: "Loukoums",
    rating: 4.9,
    reviewsCount: 88,
    image: "/images/zlabia.png", // Placeholder/fallback
    tags: ["Grenade", "Noix"]
  },
  {
    id: "chebakia-royale",
    name: "Chebakia Royale",
    description: "Entrelacs de pâte parfumée à l'anis, cannelle et safran, dorés puis enrobés de miel et de graines de sésame grillées.",
    price: 29,
    category: "Pâtisseries au Miel",
    rating: 5.0,
    reviewsCount: 420,
    image: "/images/makrout.png", // Placeholder/fallback
    tags: ["Sésame", "Miel", "Épices"]
  },
  {
    id: "coffret-prestige",
    name: "Le Coffret Prestige",
    description: "Un assortiment luxueux de nos plus belles créations. Idéal pour offrir ou pour découvrir l'étendue de notre savoir-faire.",
    price: 85,
    category: "Coffrets Cadeaux",
    rating: 5.0,
    reviewsCount: 512,
    image: "/images/baklava.png", // Placeholder/fallback
    tags: ["Assortiment", "Cadeau", "Luxe"]
  },
  {
    id: "coffret-decouverte",
    name: "Coffret Découverte",
    description: "Une sélection soigneusement choisie pour vous initier aux saveurs envoûtantes de l'Orient.",
    price: 45,
    category: "Coffrets Cadeaux",
    rating: 4.8,
    reviewsCount: 234,
    image: "/images/gazelle_horns.png", // Placeholder/fallback
    tags: ["Découverte", "Assortiment"]
  }
];

export const categories: Category[] = [
  "Baklava",
  "Cornes de Gazelle",
  "Makrout",
  "Zlabia",
  "Loukoums",
  "Pâtisseries au Miel",
  "Coffrets Cadeaux"
];
