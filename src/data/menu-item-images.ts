import type { Product } from "@/types";

const menuImage = (folder: string, file: string) =>
  `/menu-items/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

const folderImages = {
  boxes: {
    hummus: menuImage("takeawayboxes", "علبة حمص.jpg"),
    foul: menuImage("takeawayboxes", "علبة فول.jpg"),
    qudsiyeh: menuImage("takeawayboxes", "علبة قدسية.png"),
    msabbaha: menuImage("takeawayboxes", "علبة مسبحة.png"),
  },
  plates: {
    hummus: menuImage("Plates", "صحن حمص.png"),
    foul: menuImage("Plates", "صحن فول.png"),
    qudsiyeh: menuImage("Plates", "صحن قدسية.jpg"),
    msabbaha: menuImage("Plates", "صحن مسبحة.jpg"),
  },
  sandwiches: {
    falafelShrak: menuImage("Sandwiches", "ساندويش فلافل خبز شراك.jpg"),
    falafelHammam: menuImage("Sandwiches", "ساندويش فلافل خبز حمام.jpg"),
    falafel: menuImage("Sandwiches", "ساندويش فلافل خبز حمام.jpg"),
    foul: menuImage("Sandwiches", "ساندويش فول.jpg"),
    fajita: menuImage("Sandwiches", "ساندويش فاهيتا.png"),
    escalope: menuImage("Sandwiches", "ساندويش سكالوب.png"),
    zinger: menuImage("Sandwiches", "ساندويش زنجر.png"),
    potato: menuImage("Sandwiches", "ساندويش بطاطا بالمايونيز والكاتشب.jpg"),
    burger: menuImage("Sandwiches", "ساندويش برغر.jpg"),
  },
  falafel: {
    classic: menuImage("Falafel", "falafel.jpg"),
    cheese: menuImage("Falafel", "فلافل محشو جبنة.jpg"),
    chilli: menuImage("Falafel", "فلافل محشو بالشطة.jpg"),
  },
  breakfast: {
    scrambled: menuImage("Breakfast & Eggs", "صحن بيض مخفوق.jpg"),
    shakshuka: menuImage("Breakfast & Eggs", "صحن قلاية بندورة.jpg"),
    sausagePlate: menuImage("Breakfast & Eggs", "صحن نقانق مع بيض.jpg"),
    onionPlate: menuImage("Breakfast & Eggs", "صحن بيض بالبصل.jpg"),
    mfarakehPlate: menuImage("Breakfast & Eggs", "صحن مفركة بطاطا.jpg"),
    sausageSandwich: menuImage("Breakfast & Eggs", "ساندويش بيض مع نقانق.jpg"),
    onionSandwich: menuImage("Breakfast & Eggs", "ساندويش بيض بالبصل.jpg"),
    mfarakehSandwich: menuImage("Breakfast & Eggs", "ساندويش مفركة.jpg"),
  },
  drinks: {
    water: menuImage("Drinks", "زجاجة ماء صغيرة.png"),
    orange: menuImage("Drinks", "علبة ماتركس برتقال.png"),
    lemon: menuImage("Drinks", "علبة ماتركس ليمون.png"),
    cola: menuImage("Drinks", "علبة ماتركس كولا.png"),
  },
};

/** Returns the supplied photo for every item stored in menuitemsphotos. */
export function getMenuItemImage(
  product: Pick<Product, "categoryId" | "nameAr" | "nameEn" | "image">,
) {
  const name = `${product.nameAr} ${product.nameEn}`.toLocaleLowerCase();

  switch (product.categoryId) {
    case "boxes":
    case "plates": {
      const image = folderImages[product.categoryId];
      if (name.includes("حمص") || name.includes("hummus")) return image.hummus;
      if (name.includes("فول") || name.includes("foul")) return image.foul;
      if (name.includes("قدسية") || name.includes("qudsiyeh")) return image.qudsiyeh;
      if (name.includes("مسبحة") || name.includes("msabbaha")) return image.msabbaha;
      return product.image;
    }
    case "fatteh":
      return menuImage("Fatteh", "صحن فتة.jpg");
    case "potatoes":
      return menuImage("Potatoes", "علبة بطاطا.jpg");
    case "sandwiches":
      if (name.includes("زنجر") || name.includes("zinger")) return folderImages.sandwiches.zinger;
      if (name.includes("فاهيتا") || name.includes("fajita")) return folderImages.sandwiches.fajita;
      if (name.includes("سكالوب") || name.includes("escalope"))
        return folderImages.sandwiches.escalope;
      if (name.includes("برغر") || name.includes("burger")) return folderImages.sandwiches.burger;
      if (name.includes("بطاطا") || name.includes("potato")) return folderImages.sandwiches.potato;
      if (name.includes("فول") || name.includes("foul")) return folderImages.sandwiches.foul;
      if (name.includes("شراك") || name.includes("shrak"))
        return folderImages.sandwiches.falafelShrak;
      if (name.includes("فلافل") || name.includes("falafel"))
        return folderImages.sandwiches.falafelHammam;
      return product.image;
    case "falafel":
      if (name.includes("جبنة") || name.includes("cheese")) return folderImages.falafel.cheese;
      if (name.includes("شطة") || name.includes("chilli") || name.includes("chili"))
        return folderImages.falafel.chilli;
      return folderImages.falafel.classic;
    case "breakfast-eggs":
      if (name.includes("مخفوق") || name.includes("scrambled"))
        return folderImages.breakfast.scrambled;
      if (name.includes("شكشوكة") || name.includes("shakshuka"))
        return folderImages.breakfast.shakshuka;
      if (name.includes("مفركة") || name.includes("mfarakeh"))
        return name.includes("ساندويش") || name.includes("sandwich")
          ? folderImages.breakfast.mfarakehSandwich
          : folderImages.breakfast.mfarakehPlate;
      if (name.includes("نقانق") || name.includes("sausage"))
        return name.includes("ساندويش") || name.includes("sandwich")
          ? folderImages.breakfast.sausageSandwich
          : folderImages.breakfast.sausagePlate;
      if (name.includes("بصل") || name.includes("onion"))
        return name.includes("ساندويش") || name.includes("sandwich")
          ? folderImages.breakfast.onionSandwich
          : folderImages.breakfast.onionPlate;
      return product.image;
    case "drinks":
      if (name.includes("ماء") || name.includes("water")) return folderImages.drinks.water;
      if (name.includes("برتقال") || name.includes("orange")) return folderImages.drinks.orange;
      if (name.includes("ليمون") || name.includes("lemon")) return folderImages.drinks.lemon;
      if (name.includes("كولا") || name.includes("cola")) return folderImages.drinks.cola;
      return product.image;
    default:
      return product.image;
  }
}

export function getMenuItemPhoto(
  categoryId: string,
  nameAr: string,
  nameEn: string,
  fallbackImage: string,
) {
  return getMenuItemImage({ categoryId, nameAr, nameEn, image: fallbackImage });
}

export const menuCategoryImages = {
  boxes: folderImages.boxes.hummus,
  plates: folderImages.plates.hummus,
  fatteh: menuImage("Fatteh", "صحن فتة.jpg"),
  sandwiches: folderImages.sandwiches.falafelHammam,
  falafel: folderImages.falafel.classic,
  potatoes: menuImage("Potatoes", "علبة بطاطا.jpg"),
  "breakfast-eggs": folderImages.breakfast.scrambled,
  drinks: folderImages.drinks.orange,
} as const;
