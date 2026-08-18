import type { Category } from "@/types";
import falafel from "@/assets/falafel.jpg.asset.json";
import hummus from "@/assets/hummus-meat.jpg.asset.json";
import foul from "@/assets/foul.jpg.asset.json";
import wrap from "@/assets/falafel-wrap.jpg.asset.json";
import sujuk from "@/assets/sujuk-egg-sandwich.jpg.asset.json";
import galayet from "@/assets/galayet.jpg.asset.json";
import potato from "@/assets/potato-egg-sandwich.jpg.asset.json";
import chef from "@/assets/chef.jpg.asset.json";

export const categories: Category[] = [
  { id: "falafel", nameAr: "فلافل", nameEn: "Falafel", image: falafel.url, active: true, order: 1 },
  { id: "hummus", nameAr: "حمص", nameEn: "Hummus", image: hummus.url, active: true, order: 2 },
  { id: "foul", nameAr: "فول", nameEn: "Foul", image: foul.url, active: true, order: 3 },
  { id: "sandwiches", nameAr: "سندويشات", nameEn: "Sandwiches", image: wrap.url, active: true, order: 4 },
  { id: "eggs", nameAr: "بيض", nameEn: "Eggs", image: sujuk.url, active: true, order: 5 },
  { id: "galayet", nameAr: "قلايات", nameEn: "Skillets", image: galayet.url, active: true, order: 6 },
  { id: "breakfast", nameAr: "فطور", nameEn: "Breakfast", image: potato.url, active: true, order: 7 },
  { id: "extras", nameAr: "إضافات", nameEn: "Extras", image: chef.url, active: true, order: 8 },
];
