/**
 * Central restaurant configuration. Contact information remains editable data
 * once the production CMS is connected.
 */
export const restaurant = {
  nameAr: "مطعم الكمال",
  nameEn: "Al Kamal Restaurant",
  sloganAr: "فطور شعبي طازج كل يوم.",
  sloganEn: "Fresh Jordanian breakfast every day.",
  headlineAr: "فطور شعبي على أصوله",
  phone: "+962 7 76461172",
  whatsapp: "https://wa.me/962776461172",
  addressAr: "الرصيفة، الزرقاء، الأردن",
  addressEn: "Russeifa, Zarqa, Jordan",
  mapsUrl: "https://maps.app.goo.gl/iQJGggKsrK5r3Txm9",
  talabatUrl:
    "https://www.talabat.com/jordan/%D9%85%D8%B7%D8%B9%D9%85-%D8%A7%D9%84%D9%83%D9%85%D8%A7%D9%84",
  myThingsUrl: "https://mythings.app/share/Vendor/Jordan/Al-Kamal-Restaurant",
  currencyAr: "د.أ",
  currencyEn: "JOD",
  deliveryFeeDefault: 1.5,
  demoDiscount: 0.5,
  social: {
    instagram: "https://www.instagram.com/almotasemhamdan",
    facebook: "https://www.facebook.com/profile.php?id=61593352971224",
    tiktok: "https://www.tiktok.com/2lm3t9m",
  },
  hours: [
    {
      daysAr: "السبت – الخميس",
      daysEn: "Saturday – Thursday",
      timeAr: "٧:٠٠ ص – ١٢:٠٠ م",
      timeEn: "7:00 AM – 12:00 AM",
    },
    {
      daysAr: "الجمعة",
      daysEn: "Friday",
      timeAr: "٨:٠٠ ص – ١٢:٠٠ م",
      timeEn: "8:00 AM – 12:00 AM",
    },
  ],
} as const;

export type Restaurant = typeof restaurant;
