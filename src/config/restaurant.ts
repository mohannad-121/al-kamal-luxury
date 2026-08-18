/**
 * Central restaurant configuration — DEMO values.
 * Replace with real values / backend data later.
 */
export const restaurant = {
  nameAr: "مطعم الكمال",
  nameEn: "Al Kamal Restaurant",
  sloganAr: "أكل شعبي... بطعم الكمال",
  sloganEn: "Homestyle food, perfected daily",
  headlineAr: "نكهة الكمال",
  phone: "+962 7 9000 0000",
  whatsapp: "962790000000",
  addressAr: "شارع الملكة رانيا، خلدا — عمّان، الأردن",
  addressEn: "Queen Rania St, Khalda — Amman, Jordan",
  mapsUrl: "https://maps.google.com/?q=Amman+Jordan",
  currencyAr: "د.أ",
  currencyEn: "JOD",
  deliveryFeeDefault: 1.5,
  demoDiscount: 0.5,
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
  hours: [
    { daysAr: "السبت – الخميس", daysEn: "Saturday – Thursday", timeAr: "٧:٠٠ ص – ١٢:٠٠ م", timeEn: "7:00 AM – 12:00 AM" },
    { daysAr: "الجمعة", daysEn: "Friday", timeAr: "٨:٠٠ ص – ١٢:٠٠ م", timeEn: "8:00 AM – 12:00 AM" },
  ],
  adminDemoPassword: "alkamal@2026",
} as const;

export type Restaurant = typeof restaurant;
