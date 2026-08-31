import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type PublicReview = {
  id: string;
  name: string;
  textAr: string | null;
  textEn: string | null;
  rating: number;
  cityAr: string | null;
  cityEn: string | null;
};

type ReviewRow = {
  id: string;
  customer_name: string;
  review_ar: string | null;
  review_en: string | null;
  rating: number;
  city_ar: string | null;
  city_en: string | null;
};

export function useReviews() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("id, customer_name, review_ar, review_en, rating, city_ar, city_en")
      .order("created_at", { ascending: false })
      .limit(6);

    if (!error) {
      setReviews(
        ((data ?? []) as ReviewRow[]).map((review) => ({
          id: review.id,
          name: review.customer_name,
          textAr: review.review_ar,
          textEn: review.review_en,
          rating: Number(review.rating),
          cityAr: review.city_ar,
          cityEn: review.city_en,
        })),
      );
    }
    setLoading(false);
  }, []);

  const addReview = useCallback((review: PublicReview) => {
    setReviews((current) =>
      [review, ...current.filter((item) => item.id !== review.id)].slice(0, 6),
    );
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { reviews, loading, refresh, addReview };
}
