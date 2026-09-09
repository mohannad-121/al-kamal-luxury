-- Migration: Fix Daily Sales Recording Architecture (Zero Inventory Coupling, Secure RPC)
-- File: supabase/migrations/20260909_fix_daily_sales_rpc.sql

-- 1. Helper function: check if caller is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

-- 2. Secure RPC for recording / undoing daily sales
CREATE OR REPLACE FUNCTION public.record_sale_manual_inventory(
  p_menu_item_id uuid,
  p_delta integer DEFAULT 1
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_active_date date;
  v_session_id uuid;
  v_item record;
  v_unit_price numeric(10,3);
  v_category_id uuid;
  v_current_qty integer := 0;
  v_current_rev numeric(10,3) := 0;
  v_next_qty integer;
  v_next_rev numeric(10,3);
  v_price_delta numeric(10,3);
BEGIN
  -- A. Admin Authorization Check (If signed in as non-admin)
  IF auth.role() = 'authenticated' AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required to record sales.';
  END IF;

  -- B. Validate delta parameter (+1 or -1)
  IF p_delta IS NULL OR p_delta = 0 THEN
    RAISE EXCEPTION 'Invalid delta parameter. Delta must be non-zero.';
  END IF;

  -- C. Validate Menu Item
  SELECT id, name_ar, name_en, category_id, price, discount, is_archived
  INTO v_item
  FROM public.menu_items
  WHERE id = p_menu_item_id;

  IF v_item IS NULL THEN
    RAISE EXCEPTION 'Menu item not found: %', p_menu_item_id;
  END IF;

  IF v_item.is_archived THEN
    RAISE EXCEPTION 'Cannot record sale for archived item: %', v_item.name_en;
  END IF;

  -- Calculate effective unit price
  v_unit_price := GREATEST(0, COALESCE(v_item.price, 0) - COALESCE(v_item.discount, 0));
  v_category_id := v_item.category_id;

  -- D. Get or Create Today's Active Session (Asia/Amman timezone)
  v_active_date := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Amman')::date;

  SELECT id INTO v_session_id
  FROM public.daily_sessions
  WHERE business_date = v_active_date AND is_closed = false
  LIMIT 1;

  IF v_session_id IS NULL THEN
    INSERT INTO public.daily_sessions (
      business_date,
      total_revenue,
      total_items_sold,
      total_sales_entries,
      is_closed
    ) VALUES (
      v_active_date,
      0,
      0,
      0,
      false
    )
    RETURNING id INTO v_session_id;
  END IF;

  -- E. Query existing quantity sold in daily_item_sales
  SELECT quantity_sold, revenue
  INTO v_current_qty, v_current_rev
  FROM public.daily_item_sales
  WHERE session_id = v_session_id AND menu_item_id = p_menu_item_id;

  v_current_qty := COALESCE(v_current_qty, 0);
  v_current_rev := COALESCE(v_current_rev, 0);

  IF p_delta < 0 AND v_current_qty <= 0 THEN
    -- Cannot undo sale if quantity is already 0
    RETURN jsonb_build_object(
      'success', true,
      'session_id', v_session_id,
      'menu_item_id', p_menu_item_id,
      'quantity_sold', 0,
      'revenue', 0
    );
  END IF;

  v_next_qty := GREATEST(0, v_current_qty + p_delta);

  IF p_delta > 0 THEN
    v_price_delta := v_unit_price * p_delta;
  ELSE
    -- Reversing sale
    v_price_delta := -LEAST(v_current_rev, v_unit_price * ABS(p_delta));
  END IF;

  v_next_rev := GREATEST(0, v_current_rev + v_price_delta);

  -- F. Mutate daily_item_sales atomically
  IF v_next_qty > 0 THEN
    INSERT INTO public.daily_item_sales (
      session_id,
      menu_item_id,
      item_name_ar,
      item_name_en,
      category_id,
      unit_price,
      quantity_sold,
      revenue
    ) VALUES (
      v_session_id,
      p_menu_item_id,
      v_item.name_ar,
      v_item.name_en,
      v_category_id,
      v_unit_price,
      v_next_qty,
      v_next_rev
    )
    ON CONFLICT (session_id, menu_item_id)
    DO UPDATE SET
      quantity_sold = EXCLUDED.quantity_sold,
      revenue = EXCLUDED.revenue,
      unit_price = EXCLUDED.unit_price,
      item_name_ar = EXCLUDED.item_name_ar,
      item_name_en = EXCLUDED.item_name_en,
      category_id = COALESCE(EXCLUDED.category_id, daily_item_sales.category_id);
  ELSE
    -- Quantity reached 0: remove row from daily_item_sales
    DELETE FROM public.daily_item_sales
    WHERE session_id = v_session_id AND menu_item_id = p_menu_item_id;
  END IF;

  -- G. Mutate daily_sessions totals atomically
  UPDATE public.daily_sessions
  SET
    total_revenue = GREATEST(0, total_revenue + v_price_delta),
    total_items_sold = GREATEST(0, total_items_sold + p_delta),
    total_sales_entries = GREATEST(0, total_sales_entries + p_delta)
  WHERE id = v_session_id;

  -- H. Return JSON result
  RETURN jsonb_build_object(
    'success', true,
    'session_id', v_session_id,
    'menu_item_id', p_menu_item_id,
    'quantity_sold', v_next_qty,
    'revenue', v_next_rev
  );
END;
$$;

-- Alias: Create record_sale function overload that forwards to record_sale_manual_inventory
CREATE OR REPLACE FUNCTION public.record_sale(
  p_session_id uuid DEFAULT NULL,
  p_menu_item_id uuid DEFAULT NULL,
  p_delta integer DEFAULT 1
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.record_sale_manual_inventory(COALESCE(p_menu_item_id, p_session_id), p_delta);
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_sale_manual_inventory(uuid, integer) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.record_sale(uuid, uuid, integer) TO authenticated, anon;
