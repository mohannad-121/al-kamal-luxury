/**
 * The customer-facing menu supplied by the restaurant.
 *
 * Prices are expressed in Jordanian dinars. An omitted price means that the
 * restaurant confirmed the item is available but did not provide a price.
 */
export interface PublicMenuOption {
  id: string;
  nameAr: string;
  nameEn: string;
  price?: number;
}

export interface PublicMenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  options: PublicMenuOption[];
  featured?: boolean;
}

export interface PublicMenuSection {
  id: string;
  nameAr: string;
  nameEn: string;
  image: string;
  imagePosition?: string;
  items: PublicMenuItem[];
}

export interface FeaturedPublicMenuItem extends PublicMenuItem {
  sectionId: string;
  sectionNameAr: string;
  sectionNameEn: string;
  image: string;
}

type MenuItemNames = [id: string, nameAr: string, nameEn: string];

const sizeOptions = (
  scope: string,
  prices: { small: number; medium?: number; large: number },
): PublicMenuOption[] => {
  const options: PublicMenuOption[] = [
    { id: `${scope}-small`, nameAr: "صغير", nameEn: "Small", price: prices.small },
  ];

  if (prices.medium !== undefined) {
    options.push({
      id: `${scope}-medium`,
      nameAr: "وسط",
      nameEn: "Medium",
      price: prices.medium,
    });
  }

  options.push({ id: `${scope}-large`, nameAr: "كبير", nameEn: "Large", price: prices.large });
  return options;
};

const boxItemNames: MenuItemNames[] = [
  ["hummus", "حمص", "Hummus"],
  ["foul", "فول", "Foul"],
  ["msabbaha", "مسبّحة", "Msabbaha"],
  ["qudsiyeh", "قدسية", "Qudsiyeh"],
];

const boxItems: PublicMenuItem[] = boxItemNames.map(([id, nameAr, nameEn], index) => ({
  id: `box-${id}`,
  nameAr,
  nameEn,
  options: sizeOptions(`box-${id}`, { small: 0.6, medium: 0.8, large: 1 }),
  featured: index === 0,
}));

const plateItemNames: MenuItemNames[] = [
  ["hummus", "حمص", "Hummus"],
  ["foul", "فول", "Foul"],
  ["msabbaha", "مسبّحة", "Msabbaha"],
  ["qudsiyeh", "قدسية", "Qudsiyeh"],
];

const plateItems: PublicMenuItem[] = plateItemNames.map(([id, nameAr, nameEn], index) => ({
  id: `plate-${id}`,
  nameAr,
  nameEn,
  options: sizeOptions(`plate-${id}`, { small: 0.7, large: 1 }),
  featured: index === 1,
}));

const breakfastSandwichItemNames: MenuItemNames[] = [
  ["mfarakeh", "ساندويش مفركة", "Mfarakeh Sandwich"],
  ["sausage-eggs", "ساندويش نقانق وبيض", "Sausage & Egg Sandwich"],
  ["onion-eggs", "ساندويش بيض ببصل", "Onion & Egg Sandwich"],
];

const breakfastSandwichItems: PublicMenuItem[] = breakfastSandwichItemNames.map(
  ([id, nameAr, nameEn], index) => ({
    id: `breakfast-sandwich-${id}`,
    nameAr,
    nameEn,
    options: sizeOptions(`breakfast-sandwich-${id}`, { small: 0.5, large: 1 }),
    featured: index === 0,
  }),
);

const breakfastPlateItemNames: MenuItemNames[] = [
  ["mfarakeh", "صحن مفركة", "Mfarakeh Plate"],
  ["onion-eggs", "صحن بيض ببصل", "Onion & Egg Plate"],
  ["sausage-eggs", "صحن نقانق وبيض", "Sausage & Egg Plate"],
  ["shakshuka", "صحن شكشوكة", "Shakshuka Plate"],
];

const breakfastPlateItems: PublicMenuItem[] = breakfastPlateItemNames.map(
  ([id, nameAr, nameEn], index) => ({
    id: `breakfast-plate-${id}`,
    nameAr,
    nameEn,
    options: sizeOptions(`breakfast-plate-${id}`, { small: 1, large: 1.5 }),
    featured: index === 3,
  }),
);

export const publicMenuSections: PublicMenuSection[] = [
  {
    id: "boxes",
    nameAr: "العلب",
    nameEn: "Takeaway Boxes",
    image: "/images/levantine-bowls-premium.jpg",
    imagePosition: "50% 54%",
    items: boxItems,
  },
  {
    id: "plates",
    nameAr: "الصحون",
    nameEn: "Plates",
    image: "/images/levantine-bowls-premium.jpg",
    imagePosition: "50% 62%",
    items: plateItems,
  },
  {
    id: "fatteh",
    nameAr: "الفتّة",
    nameEn: "Fatteh",
    image: "/images/fatteh-premium.jpg",
    imagePosition: "50% 54%",
    items: [
      {
        id: "fatteh",
        nameAr: "فتّة",
        nameEn: "Fatteh",
        featured: true,
        options: sizeOptions("fatteh", { small: 2, large: 3 }),
      },
    ],
  },
  {
    id: "sandwiches",
    nameAr: "الساندويشات",
    nameEn: "Sandwiches",
    image: "/images/falafel-wrap.jpg",
    imagePosition: "50% 50%",
    items: [
      {
        id: "sandwich-falafel",
        nameAr: "ساندويش فلافل",
        nameEn: "Falafel Sandwich",
        featured: true,
        options: [
          { id: "sandwich-falafel-regular", nameAr: "عادي", nameEn: "Regular", price: 0.35 },
          {
            id: "sandwich-falafel-hammam",
            nameAr: "خبز حمّام",
            nameEn: "Hammam Bread",
            price: 0.35,
          },
          { id: "sandwich-falafel-kaak", nameAr: "كعك", nameEn: "Ka'ak", price: 0.5 },
          { id: "sandwich-falafel-shrak", nameAr: "شراك", nameEn: "Shrak", price: 0.6 },
        ],
      },
      {
        id: "sandwich-potato",
        nameAr: "ساندويش بطاطا",
        nameEn: "Potato Sandwich",
        options: [
          { id: "sandwich-potato-hammam", nameAr: "خبز حمّام", nameEn: "Hammam Bread", price: 0.3 },
          { id: "sandwich-potato-kaak", nameAr: "كعك", nameEn: "Ka'ak", price: 0.6 },
        ],
      },
      {
        id: "sandwich-foul",
        nameAr: "ساندويش فول",
        nameEn: "Foul Sandwich",
        options: [
          { id: "sandwich-foul-regular", nameAr: "عادي", nameEn: "Regular", price: 0.35 },
          { id: "sandwich-foul-hammam", nameAr: "خبز حمّام", nameEn: "Hammam Bread", price: 0.35 },
          { id: "sandwich-foul-kaak", nameAr: "كعك", nameEn: "Ka'ak", price: 0.5 },
        ],
      },
      {
        id: "sandwich-burger",
        nameAr: "ساندويش برغر",
        nameEn: "Burger Sandwich",
        options: [
          { id: "sandwich-burger-regular", nameAr: "عادي", nameEn: "Regular", price: 0.6 },
          { id: "sandwich-burger-large", nameAr: "كبير", nameEn: "Large", price: 1 },
        ],
      },
      {
        id: "sandwich-escalope",
        nameAr: "ساندويش سكالوب",
        nameEn: "Escalope Sandwich",
        options: [
          { id: "sandwich-escalope-regular", nameAr: "عادي", nameEn: "Regular", price: 0.6 },
          { id: "sandwich-escalope-large", nameAr: "كبير", nameEn: "Large", price: 1 },
        ],
      },
      {
        id: "sandwich-fajita",
        nameAr: "ساندويش فاهيتا",
        nameEn: "Fajita Sandwich",
        options: [
          { id: "sandwich-fajita-regular", nameAr: "ساندويش", nameEn: "Sandwich", price: 1 },
        ],
      },
      {
        id: "sandwich-zinger",
        nameAr: "ساندويش زنجر",
        nameEn: "Zinger Sandwich",
        featured: true,
        options: [
          { id: "sandwich-zinger-regular", nameAr: "ساندويش", nameEn: "Sandwich", price: 1 },
        ],
      },
    ],
  },
  {
    id: "falafel",
    nameAr: "الفلافل",
    nameEn: "Falafel",
    image: "/images/falafel.jpg",
    imagePosition: "50% 46%",
    items: [
      {
        id: "falafel-classic",
        nameAr: "فلافل عادي",
        nameEn: "Classic Falafel",
        featured: true,
        options: [
          { id: "falafel-classic-three", nameAr: "٣ حبات", nameEn: "3 pieces", price: 0.05 },
        ],
      },
      {
        id: "falafel-chilli",
        nameAr: "فلافل محشي شطّة",
        nameEn: "Chilli-stuffed Falafel",
        options: [{ id: "falafel-chilli-one", nameAr: "حبة واحدة", nameEn: "1 piece", price: 0.1 }],
      },
      {
        id: "falafel-cheese",
        nameAr: "فلافل محشي جبنة",
        nameEn: "Cheese-stuffed Falafel",
        options: [
          { id: "falafel-cheese-one", nameAr: "حبة واحدة", nameEn: "1 piece", price: 0.15 },
        ],
      },
    ],
  },
  {
    id: "potatoes",
    nameAr: "البطاطا",
    nameEn: "Potatoes",
    image: "/images/potato-box-premium.jpg",
    imagePosition: "50% 54%",
    items: [
      {
        id: "potato-box",
        nameAr: "علبة بطاطا",
        nameEn: "Potato Box",
        featured: true,
        options: sizeOptions("potato-box", { small: 0.5, large: 0.75 }),
      },
    ],
  },
  {
    id: "breakfast-eggs",
    nameAr: "الفطور والبيض",
    nameEn: "Breakfast & Eggs",
    image: "/images/breakfast-skillets-premium.jpg",
    imagePosition: "50% 52%",
    items: [
      ...breakfastSandwichItems,
      ...breakfastPlateItems,
      {
        id: "breakfast-plate-scrambled-eggs",
        nameAr: "صحن بيض مخفوق",
        nameEn: "Scrambled Egg Plate",
        options: sizeOptions("breakfast-plate-scrambled-eggs", { small: 0.5, large: 1 }),
      },
    ],
  },
  {
    id: "drinks",
    nameAr: "المشروبات",
    nameEn: "Drinks",
    image: "/images/matrix-drinks-premium-v2.jpg",
    imagePosition: "50% 50%",
    items: [
      {
        id: "matrix-cola",
        nameAr: "ماتركس كولا",
        nameEn: "Matrix Cola",
        featured: true,
        options: [{ id: "matrix-cola-can", nameAr: "عبوة", nameEn: "Can", price: 0.3 }],
      },
      {
        id: "matrix-lemon",
        nameAr: "ماتركس ليمون",
        nameEn: "Matrix Lemon",
        options: [{ id: "matrix-lemon-can", nameAr: "عبوة", nameEn: "Can", price: 0.3 }],
      },
      {
        id: "matrix-orange",
        nameAr: "ماتركس برتقال",
        nameEn: "Matrix Orange",
        options: [{ id: "matrix-orange-can", nameAr: "عبوة", nameEn: "Can", price: 0.3 }],
      },
      {
        id: "water-small",
        nameAr: "زجاجة ماء صغيرة",
        nameEn: "Small Water Bottle",
        options: [{ id: "water-small-bottle", nameAr: "صغيرة", nameEn: "Small" }],
      },
    ],
  },
];

export const publicMenuOptionCount = publicMenuSections.reduce(
  (sectionTotal, section) =>
    sectionTotal + section.items.reduce((itemTotal, item) => itemTotal + item.options.length, 0),
  0,
);

export const featuredPublicMenuItems: FeaturedPublicMenuItem[] = publicMenuSections.flatMap(
  (section) =>
    section.items
      .filter((item) => item.featured)
      .map((item) => ({
        ...item,
        sectionId: section.id,
        sectionNameAr: section.nameAr,
        sectionNameEn: section.nameEn,
        image: section.image,
      })),
);

/** Short alias for home-page consumers. */
export const featuredMenuItems = featuredPublicMenuItems;

export function getFeaturedPublicMenuItems(limit = featuredPublicMenuItems.length) {
  return featuredPublicMenuItems.slice(0, Math.max(0, limit));
}

export function getPublicMenuSection(sectionId: string) {
  return publicMenuSections.find((section) => section.id === sectionId);
}

export function getPublicMenuItem(itemId: string) {
  for (const section of publicMenuSections) {
    const item = section.items.find((candidate) => candidate.id === itemId);
    if (item) return item;
  }

  return undefined;
}
