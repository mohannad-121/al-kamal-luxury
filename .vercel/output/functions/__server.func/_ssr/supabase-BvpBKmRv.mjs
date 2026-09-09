import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-BvpBKmRv.js
var menuImage = (folder, file) => `/menu-items/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
var folderImages = {
	boxes: {
		hummus: menuImage("takeawayboxes", "علبة حمص.jpg"),
		foul: menuImage("takeawayboxes", "علبة فول.jpg"),
		qudsiyeh: menuImage("takeawayboxes", "علبة قدسية.png"),
		msabbaha: menuImage("takeawayboxes", "علبة مسبحة.png")
	},
	plates: {
		hummus: menuImage("Plates", "صحن حمص.png"),
		foul: menuImage("Plates", "صحن فول.png"),
		qudsiyeh: menuImage("Plates", "صحن قدسية.jpg"),
		msabbaha: menuImage("Plates", "صحن مسبحة.jpg")
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
		burger: menuImage("Sandwiches", "ساندويش برغر.jpg")
	},
	falafel: {
		classic: menuImage("Falafel", "falafel.jpg"),
		cheese: menuImage("Falafel", "فلافل محشو جبنة.jpg"),
		chilli: menuImage("Falafel", "فلافل محشو بالشطة.jpg")
	},
	breakfast: {
		scrambled: menuImage("Breakfast & Eggs", "صحن بيض مخفوق.jpg"),
		shakshuka: menuImage("Breakfast & Eggs", "صحن قلاية بندورة.jpg"),
		sausagePlate: menuImage("Breakfast & Eggs", "صحن نقانق مع بيض.jpg"),
		onionPlate: menuImage("Breakfast & Eggs", "صحن بيض بالبصل.jpg"),
		mfarakehPlate: menuImage("Breakfast & Eggs", "صحن مفركة بطاطا.jpg"),
		sausageSandwich: menuImage("Breakfast & Eggs", "ساندويش بيض مع نقانق.jpg"),
		onionSandwich: menuImage("Breakfast & Eggs", "ساندويش بيض بالبصل.jpg"),
		mfarakehSandwich: menuImage("Breakfast & Eggs", "ساندويش مفركة.jpg")
	},
	drinks: {
		water: menuImage("Drinks", "زجاجة ماء صغيرة.png"),
		orange: menuImage("Drinks", "علبة ماتركس برتقال.png"),
		lemon: menuImage("Drinks", "علبة ماتركس ليمون.png"),
		cola: menuImage("Drinks", "علبة ماتركس كولا.png")
	},
	familyMeals: {
		family: menuImage("Family meals", "عيلة الكمال.jpg"),
		largeFamily: menuImage("Family meals", "عيلة الكمال الكبيرة.jpg"),
		feast: menuImage("Family meals", "عزومة الكمال.png")
	},
	offers: {
		falafel: menuImage("Offers", "عرض ابو الفلافل.jpg"),
		popularBreakfast: menuImage("Offers", "عرض الفطور الشعبي.jpg"),
		royalBreakfast: menuImage("Offers", "عرض الفطور الملكي.jpg"),
		galayeh: menuImage("Offers", "عرض القلاية.jpg"),
		hungry: menuImage("Offers", "عرض الجوعان.jpg")
	}
};
/** Returns the supplied photo for every item stored in menuitemsphotos. */
function getMenuItemImage(product) {
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
		case "fatteh": return menuImage("Fatteh", "صحن فتة.jpg");
		case "potatoes": return menuImage("Potatoes", "علبة بطاطا.jpg");
		case "sandwiches":
			if (name.includes("زنجر") || name.includes("zinger")) return folderImages.sandwiches.zinger;
			if (name.includes("فاهيتا") || name.includes("fajita")) return folderImages.sandwiches.fajita;
			if (name.includes("سكالوب") || name.includes("escalope")) return folderImages.sandwiches.escalope;
			if (name.includes("برغر") || name.includes("burger")) return folderImages.sandwiches.burger;
			if (name.includes("بطاطا") || name.includes("potato")) return folderImages.sandwiches.potato;
			if (name.includes("فول") || name.includes("foul")) return folderImages.sandwiches.foul;
			if (name.includes("شراك") || name.includes("shrak")) return folderImages.sandwiches.falafelShrak;
			if (name.includes("فلافل") || name.includes("falafel")) return folderImages.sandwiches.falafelHammam;
			return product.image;
		case "falafel":
			if (name.includes("جبنة") || name.includes("cheese")) return folderImages.falafel.cheese;
			if (name.includes("شطة") || name.includes("chilli") || name.includes("chili")) return folderImages.falafel.chilli;
			return folderImages.falafel.classic;
		case "breakfast-eggs":
			if (name.includes("مخفوق") || name.includes("scrambled")) return folderImages.breakfast.scrambled;
			if (name.includes("شكشوكة") || name.includes("shakshuka")) return folderImages.breakfast.shakshuka;
			if (name.includes("مفركة") || name.includes("mfarakeh")) return name.includes("ساندويش") || name.includes("sandwich") ? folderImages.breakfast.mfarakehSandwich : folderImages.breakfast.mfarakehPlate;
			if (name.includes("نقانق") || name.includes("sausage")) return name.includes("ساندويش") || name.includes("sandwich") ? folderImages.breakfast.sausageSandwich : folderImages.breakfast.sausagePlate;
			if (name.includes("بصل") || name.includes("onion")) return name.includes("ساندويش") || name.includes("sandwich") ? folderImages.breakfast.onionSandwich : folderImages.breakfast.onionPlate;
			return product.image;
		case "drinks":
			if (name.includes("ماء") || name.includes("water")) return folderImages.drinks.water;
			if (name.includes("برتقال") || name.includes("orange")) return folderImages.drinks.orange;
			if (name.includes("ليمون") || name.includes("lemon")) return folderImages.drinks.lemon;
			if (name.includes("كولا") || name.includes("cola")) return folderImages.drinks.cola;
			return product.image;
		case "family-meals":
			if (name.includes("الكبيرة") || name.includes("large family")) return folderImages.familyMeals.largeFamily;
			if (name.includes("عزومة") || name.includes("feast")) return folderImages.familyMeals.feast;
			return folderImages.familyMeals.family;
		case "offers":
			if (name.includes("الملكي") || name.includes("royal")) return folderImages.offers.royalBreakfast;
			if (name.includes("الشعبي") || name.includes("popular")) return folderImages.offers.popularBreakfast;
			if (name.includes("القلاية") || name.includes("galayeh")) return folderImages.offers.galayeh;
			if (name.includes("الجوعان") || name.includes("hungry")) return folderImages.offers.hungry;
			return folderImages.offers.falafel;
		default: return product.image;
	}
}
function getMenuItemPhoto(categoryId, nameAr, nameEn, fallbackImage) {
	return getMenuItemImage({
		categoryId,
		nameAr,
		nameEn,
		image: fallbackImage
	});
}
var menuCategoryImages = {
	boxes: folderImages.boxes.hummus,
	plates: folderImages.plates.hummus,
	fatteh: menuImage("Fatteh", "صحن فتة.jpg"),
	sandwiches: folderImages.sandwiches.falafelHammam,
	falafel: folderImages.falafel.classic,
	potatoes: menuImage("Potatoes", "علبة بطاطا.jpg"),
	"breakfast-eggs": folderImages.breakfast.scrambled,
	drinks: folderImages.drinks.orange,
	"family-meals": folderImages.familyMeals.family,
	offers: folderImages.offers.falafel
};
var sizeOptions = (scope, prices) => {
	const options = [{
		id: `${scope}-small`,
		nameAr: "صغير",
		nameEn: "Small",
		price: prices.small
	}];
	if (prices.medium !== void 0) options.push({
		id: `${scope}-medium`,
		nameAr: "وسط",
		nameEn: "Medium",
		price: prices.medium
	});
	options.push({
		id: `${scope}-large`,
		nameAr: "كبير",
		nameEn: "Large",
		price: prices.large
	});
	return options;
};
var boxItems = [
	[
		"hummus",
		"حمص",
		"Hummus"
	],
	[
		"foul",
		"فول",
		"Foul"
	],
	[
		"msabbaha",
		"مسبّحة",
		"Msabbaha"
	],
	[
		"qudsiyeh",
		"قدسية",
		"Qudsiyeh"
	]
].map(([id, nameAr, nameEn], index) => ({
	id: `box-${id}`,
	nameAr,
	nameEn,
	options: sizeOptions(`box-${id}`, {
		small: .6,
		medium: .8,
		large: 1
	}),
	featured: index === 0
}));
var plateItems = [
	[
		"hummus",
		"حمص",
		"Hummus"
	],
	[
		"foul",
		"فول",
		"Foul"
	],
	[
		"msabbaha",
		"مسبّحة",
		"Msabbaha"
	],
	[
		"qudsiyeh",
		"قدسية",
		"Qudsiyeh"
	]
].map(([id, nameAr, nameEn], index) => ({
	id: `plate-${id}`,
	nameAr,
	nameEn,
	options: sizeOptions(`plate-${id}`, {
		small: .7,
		large: 1
	}),
	featured: index === 1
}));
var breakfastSandwichItems = [
	[
		"mfarakeh",
		"ساندويش مفركة",
		"Mfarakeh Sandwich"
	],
	[
		"sausage-eggs",
		"ساندويش نقانق وبيض",
		"Sausage & Egg Sandwich"
	],
	[
		"onion-eggs",
		"ساندويش بيض ببصل",
		"Onion & Egg Sandwich"
	]
].map(([id, nameAr, nameEn], index) => ({
	id: `breakfast-sandwich-${id}`,
	nameAr,
	nameEn,
	options: sizeOptions(`breakfast-sandwich-${id}`, {
		small: .5,
		large: 1
	}),
	featured: index === 0
}));
var breakfastPlateItems = [
	[
		"mfarakeh",
		"صحن مفركة",
		"Mfarakeh Plate"
	],
	[
		"onion-eggs",
		"صحن بيض ببصل",
		"Onion & Egg Plate"
	],
	[
		"sausage-eggs",
		"صحن نقانق وبيض",
		"Sausage & Egg Plate"
	],
	[
		"shakshuka",
		"صحن شكشوكة",
		"Shakshuka Plate"
	]
].map(([id, nameAr, nameEn], index) => ({
	id: `breakfast-plate-${id}`,
	nameAr,
	nameEn,
	options: sizeOptions(`breakfast-plate-${id}`, {
		small: 1,
		large: 1.5
	}),
	featured: index === 3
}));
var publicMenuSections = [
	{
		id: "offers",
		nameAr: "العروض",
		nameEn: "Offers",
		image: menuCategoryImages.offers,
		imagePosition: "50% 50%",
		items: [
			{
				id: "offer-abu-al-falafel",
				nameAr: "عرض أبو الفلافل",
				nameEn: "Abu Al Falafel Offer",
				featured: true,
				options: [{
					id: "offer-abu-al-falafel-meal",
					nameAr: "3 ساندويشات فلافل + بطاطا",
					nameEn: "3 falafel sandwiches + fries",
					price: 1.5
				}]
			},
			{
				id: "offer-popular-breakfast",
				nameAr: "عرض الفطور الشعبي",
				nameEn: "Popular Breakfast Offer",
				options: [{
					id: "offer-popular-breakfast-meal",
					nameAr: "1 صحن حمص صغير + 1 صحن فول صغير + 10 حبات فلافل + 6 قطع خبز",
					nameEn: "1 small hummus plate + 1 small foul plate + 10 falafel pieces + 6 pieces of bread",
					price: 1.75
				}]
			},
			{
				id: "offer-royal-breakfast",
				nameAr: "عرض الفطور الملكي",
				nameEn: "Royal Breakfast Offer",
				featured: true,
				options: [{
					id: "offer-royal-breakfast-meal",
					nameAr: "1 صحن حمص كبير + 1 صحن فول كبير + 20 حبة فلافل + بطاطا + 8 قطع خبز",
					nameEn: "1 large hummus plate + 1 large foul plate + 20 falafel pieces + fries + 8 pieces of bread",
					price: 3
				}]
			},
			{
				id: "offer-galayeh",
				nameAr: "عرض القلاية",
				nameEn: "Galayeh Offer",
				options: [{
					id: "offer-galayeh-meal",
					nameAr: "1 صحن شكشوكة + بطاطا + 6 قطع خبز",
					nameEn: "1 shakshuka plate + fries + 6 pieces of bread",
					price: 1.75
				}]
			},
			{
				id: "offer-hungry",
				nameAr: "عرض الجوعان",
				nameEn: "Hungry Offer",
				options: [{
					id: "offer-hungry-meal",
					nameAr: "1 ساندويش حسب الاختيار (زنجر أو فاهيتا أو برغر أو سكالوب) + بطاطا كبيرة + مشروب",
					nameEn: "1 sandwich of your choice (zinger, fajita, burger, or escalope) + 1 large fries + drink",
					price: 2
				}]
			},
			{
				id: "offer-falafel-sandwiches",
				nameAr: "عروض ساندويش الفلافل",
				nameEn: "Falafel Sandwich Offers",
				options: [
					{
						id: "offer-falafel-sandwich-one",
						nameAr: "ساندويش فلافل واحد",
						nameEn: "1 falafel sandwich",
						price: .3
					},
					{
						id: "offer-falafel-sandwich-three",
						nameAr: "3 ساندويشات فلافل",
						nameEn: "3 falafel sandwiches",
						price: .8
					},
					{
						id: "offer-falafel-sandwich-five",
						nameAr: "5 ساندويشات فلافل",
						nameEn: "5 falafel sandwiches",
						price: 1.25
					}
				]
			}
		]
	},
	{
		id: "family-meals",
		nameAr: "الوجبات العائلية",
		nameEn: "Family Meals",
		image: menuCategoryImages["family-meals"],
		imagePosition: "50% 50%",
		items: [
			{
				id: "family-al-kamal",
				nameAr: "عيلة الكمال",
				nameEn: "Al Kamal Family",
				featured: true,
				options: [{
					id: "family-al-kamal-meal",
					nameAr: "1 صحن حمص صغير + 1 صحن فول صغير + 15 حبة فلافل + بطاطا + 6 قطع خبز",
					nameEn: "1 small hummus plate + 1 small foul plate + 15 falafel pieces + fries + 6 pieces of bread",
					price: 2.5
				}]
			},
			{
				id: "family-al-kamal-large",
				nameAr: "عيلة الكمال الكبيرة",
				nameEn: "Al Kamal Large Family",
				featured: true,
				options: [{
					id: "family-al-kamal-large-meal",
					nameAr: "1 صحن حمص كبير + 1 صحن فول كبير + 20 حبة فلافل + بطاطا + 8 قطع خبز + صحن شكشوكة",
					nameEn: "1 large hummus plate + 1 large foul plate + 20 falafel pieces + fries + 8 pieces of bread + shakshuka plate",
					price: 4
				}]
			},
			{
				id: "family-al-kamal-feast",
				nameAr: "عزومة الكمال",
				nameEn: "Al Kamal Feast",
				options: [{
					id: "family-al-kamal-feast-meal",
					nameAr: "1 صحن حمص كبير + 1 صحن فول كبير + 30 حبة فلافل + بطاطا + 12 قطعة خبز + صحن شكشوكة + ساندويشان حسب الاختيار (برغر أو فاهيتا أو سكالوب أو زنجر)",
					nameEn: "1 large hummus plate + 1 large foul plate + 30 falafel pieces + fries + 12 pieces of bread + shakshuka plate + 2 sandwiches of your choice (burger, fajita, escalope, or zinger)",
					price: 6.5
				}]
			}
		]
	},
	{
		id: "boxes",
		nameAr: "العلب",
		nameEn: "Takeaway Boxes",
		image: menuCategoryImages.boxes,
		imagePosition: "50% 54%",
		items: boxItems
	},
	{
		id: "plates",
		nameAr: "الصحون",
		nameEn: "Plates",
		image: menuCategoryImages.plates,
		imagePosition: "50% 62%",
		items: plateItems
	},
	{
		id: "fatteh",
		nameAr: "الفتّة",
		nameEn: "Fatteh",
		image: menuCategoryImages.fatteh,
		imagePosition: "50% 54%",
		items: [{
			id: "fatteh",
			nameAr: "فتّة",
			nameEn: "Fatteh",
			featured: true,
			options: sizeOptions("fatteh", {
				small: 2,
				large: 3
			})
		}]
	},
	{
		id: "sandwiches",
		nameAr: "الساندويشات",
		nameEn: "Sandwiches",
		image: menuCategoryImages.sandwiches,
		imagePosition: "50% 50%",
		items: [
			{
				id: "sandwich-falafel",
				nameAr: "ساندويش فلافل",
				nameEn: "Falafel Sandwich",
				featured: true,
				options: [
					{
						id: "sandwich-falafel-regular",
						nameAr: "عادي",
						nameEn: "Regular",
						price: .35
					},
					{
						id: "sandwich-falafel-hammam",
						nameAr: "خبز حمّام",
						nameEn: "Hammam Bread",
						price: .35
					},
					{
						id: "sandwich-falafel-kaak",
						nameAr: "كعك",
						nameEn: "Ka'ak",
						price: .5
					},
					{
						id: "sandwich-falafel-shrak",
						nameAr: "شراك",
						nameEn: "Shrak",
						price: .6
					}
				]
			},
			{
				id: "sandwich-potato",
				nameAr: "ساندويش بطاطا",
				nameEn: "Potato Sandwich",
				options: [{
					id: "sandwich-potato-hammam",
					nameAr: "خبز حمّام",
					nameEn: "Hammam Bread",
					price: .3
				}, {
					id: "sandwich-potato-kaak",
					nameAr: "كعك",
					nameEn: "Ka'ak",
					price: .6
				}]
			},
			{
				id: "sandwich-foul",
				nameAr: "ساندويش فول",
				nameEn: "Foul Sandwich",
				options: [
					{
						id: "sandwich-foul-regular",
						nameAr: "عادي",
						nameEn: "Regular",
						price: .35
					},
					{
						id: "sandwich-foul-hammam",
						nameAr: "خبز حمّام",
						nameEn: "Hammam Bread",
						price: .35
					},
					{
						id: "sandwich-foul-kaak",
						nameAr: "كعك",
						nameEn: "Ka'ak",
						price: .5
					}
				]
			},
			{
				id: "sandwich-burger",
				nameAr: "ساندويش برغر",
				nameEn: "Burger Sandwich",
				options: [{
					id: "sandwich-burger-regular",
					nameAr: "عادي",
					nameEn: "Regular",
					price: .6
				}, {
					id: "sandwich-burger-large",
					nameAr: "كبير",
					nameEn: "Large",
					price: 1
				}]
			},
			{
				id: "sandwich-escalope",
				nameAr: "ساندويش سكالوب",
				nameEn: "Escalope Sandwich",
				options: [{
					id: "sandwich-escalope-regular",
					nameAr: "عادي",
					nameEn: "Regular",
					price: .6
				}, {
					id: "sandwich-escalope-large",
					nameAr: "كبير",
					nameEn: "Large",
					price: 1
				}]
			},
			{
				id: "sandwich-fajita",
				nameAr: "ساندويش فاهيتا",
				nameEn: "Fajita Sandwich",
				options: [{
					id: "sandwich-fajita-regular",
					nameAr: "ساندويش",
					nameEn: "Sandwich",
					price: 1
				}]
			},
			{
				id: "sandwich-zinger",
				nameAr: "ساندويش زنجر",
				nameEn: "Zinger Sandwich",
				featured: true,
				options: [{
					id: "sandwich-zinger-regular",
					nameAr: "ساندويش",
					nameEn: "Sandwich",
					price: 1
				}]
			}
		]
	},
	{
		id: "falafel",
		nameAr: "الفلافل",
		nameEn: "Falafel",
		image: menuCategoryImages.falafel,
		imagePosition: "50% 46%",
		items: [
			{
				id: "falafel-classic",
				nameAr: "فلافل عادي",
				nameEn: "Classic Falafel",
				featured: true,
				options: [{
					id: "falafel-classic-three",
					nameAr: "٣ حبات",
					nameEn: "3 pieces",
					price: .05
				}]
			},
			{
				id: "falafel-chilli",
				nameAr: "فلافل محشي شطّة",
				nameEn: "Chilli-stuffed Falafel",
				options: [{
					id: "falafel-chilli-one",
					nameAr: "حبة واحدة",
					nameEn: "1 piece",
					price: .1
				}]
			},
			{
				id: "falafel-cheese",
				nameAr: "فلافل محشي جبنة",
				nameEn: "Cheese-stuffed Falafel",
				options: [{
					id: "falafel-cheese-one",
					nameAr: "حبة واحدة",
					nameEn: "1 piece",
					price: .15
				}]
			}
		]
	},
	{
		id: "potatoes",
		nameAr: "البطاطا",
		nameEn: "Potatoes",
		image: menuCategoryImages.potatoes,
		imagePosition: "50% 54%",
		items: [{
			id: "potato-box",
			nameAr: "علبة بطاطا",
			nameEn: "Potato Box",
			featured: true,
			options: sizeOptions("potato-box", {
				small: .5,
				large: .75
			})
		}]
	},
	{
		id: "breakfast-eggs",
		nameAr: "الفطور والبيض",
		nameEn: "Breakfast & Eggs",
		image: menuCategoryImages["breakfast-eggs"],
		imagePosition: "50% 52%",
		items: [
			...breakfastSandwichItems,
			...breakfastPlateItems,
			{
				id: "breakfast-plate-scrambled-eggs",
				nameAr: "صحن بيض مخفوق",
				nameEn: "Scrambled Egg Plate",
				options: sizeOptions("breakfast-plate-scrambled-eggs", {
					small: .5,
					large: 1
				})
			}
		]
	},
	{
		id: "drinks",
		nameAr: "المشروبات",
		nameEn: "Drinks",
		image: menuCategoryImages.drinks,
		imagePosition: "50% 50%",
		items: [
			{
				id: "matrix-cola",
				nameAr: "ماتركس كولا",
				nameEn: "Matrix Cola",
				featured: true,
				options: [{
					id: "matrix-cola-can",
					nameAr: "عبوة",
					nameEn: "Can",
					price: .3
				}]
			},
			{
				id: "matrix-lemon",
				nameAr: "ماتركس ليمون",
				nameEn: "Matrix Lemon",
				options: [{
					id: "matrix-lemon-can",
					nameAr: "عبوة",
					nameEn: "Can",
					price: .3
				}]
			},
			{
				id: "matrix-orange",
				nameAr: "ماتركس برتقال",
				nameEn: "Matrix Orange",
				options: [{
					id: "matrix-orange-can",
					nameAr: "عبوة",
					nameEn: "Can",
					price: .3
				}]
			},
			{
				id: "water-small",
				nameAr: "زجاجة ماء صغيرة",
				nameEn: "Small Water Bottle",
				options: [{
					id: "water-small-bottle",
					nameAr: "صغيرة",
					nameEn: "Small"
				}]
			}
		]
	}
];
var publicMenuOptionCount = publicMenuSections.reduce((sectionTotal, section) => sectionTotal + section.items.reduce((itemTotal, item) => itemTotal + item.options.length, 0), 0);
publicMenuSections.flatMap((section) => section.items.filter((item) => item.featured).map((item) => ({
	...item,
	sectionId: section.id,
	sectionNameAr: section.nameAr,
	sectionNameEn: section.nameEn,
	image: section.image
})));
var supabase = createClient("https://rkvkjvbrgevgcvgjyjwy.supabase.co", "sb_publishable_mXrB2aQB6vHIpkEGrsoJMg_zps2OMYB", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true
} });
//#endregion
export { supabase as a, publicMenuSections as i, getMenuItemPhoto as n, publicMenuOptionCount as r, getMenuItemImage as t };
