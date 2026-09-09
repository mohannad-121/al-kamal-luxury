-- Fix: Clean up all test data and reset today's session
-- Run this in Supabase Dashboard → SQL Editor

-- 1. Delete junk test sales from today's session (2026-09-09)
DELETE FROM public.daily_item_sales
WHERE session_id = '3de5cfb5-6a90-4a1f-818a-25fe1156c5bc';

-- 2. Reopen today's session with clean slate
UPDATE public.daily_sessions
SET 
  is_closed = false,
  closed_at = NULL,
  total_revenue = 0,
  total_items_sold = 0,
  total_sales_entries = 0
WHERE id = '3de5cfb5-6a90-4a1f-818a-25fe1156c5bc';

-- 3. Verify the fix
SELECT id, business_date, is_closed, total_revenue, total_items_sold, total_sales_entries
FROM public.daily_sessions
WHERE business_date >= '2026-09-01'
ORDER BY business_date DESC;
