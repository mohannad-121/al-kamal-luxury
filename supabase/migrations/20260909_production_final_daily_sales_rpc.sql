-- Production Final Daily Sales RPC Migration (Zero Inventory Coupling, Secure Admin RPC)
-- File: supabase/migrations/20260909_production_final_daily_sales_rpc.sql

-- 1. CREATE OR REPLACE HARDENED is_admin() FUNCTION FIRST
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Unconditionally return false for unauthenticated callers
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE id = auth.uid()
  );
END;
$$;

-- 2. CREATE OR REPLACE SECURE record_sale_manual_inventory() FUNCTION
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
  -- A. UNCONDITIONAL ADMIN AUTHORIZATION CHECK
  IF auth.uid() IS NULL OR NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required to record sales.';
  END IF;

  -- B. STRICT DELTA VALIDATION (-1 OR 1 ONLY)
  IF p_delta IS NULL OR p_delta NOT IN (-1, 1) THEN
    RAISE EXCEPTION 'Invalid delta parameter. Delta must be either 1 or -1.';
  END IF;

  -- C. VALIDATE MENU ITEM
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

  -- Calculate effective unit price from database values
  v_unit_price := GREATEST(0, COALESCE(v_item.price, 0) - COALESCE(v_item.discount, 0));
  v_category_id := v_item.category_id;

  -- D. GET OR CREATE TODAY'S ACTIVE SESSION (Asia/Amman TIMEZONE, CONCURRENCY SAFE)
  v_active_date := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Amman')::date;

  SELECT id INTO v_session_id
  FROM public.daily_sessions
  WHERE business_date = v_active_date AND is_closed = false
  FOR UPDATE
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
    ON CONFLICT (business_date) WHERE (is_closed = false)
    DO UPDATE SET total_sales_entries = daily_sessions.total_sales_entries
    RETURNING id INTO v_session_id;

    IF v_session_id IS NULL THEN
      SELECT id INTO v_session_id
      FROM public.daily_sessions
      WHERE business_date = v_active_date AND is_closed = false
      FOR UPDATE
      LIMIT 1;
    END IF;
  END IF;

  -- E. QUERY EXISTING ITEM SALE WITH ROW LOCK (FOR UPDATE)
  SELECT quantity_sold, revenue
  INTO v_current_qty, v_current_rev
  FROM public.daily_item_sales
  WHERE session_id = v_session_id AND menu_item_id = p_menu_item_id
  FOR UPDATE;

  v_current_qty := COALESCE(v_current_qty, 0);
  v_current_rev := COALESCE(v_current_rev, 0);

  IF p_delta < 0 AND v_current_qty <= 0 THEN
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
    v_price_delta := -LEAST(v_current_rev, v_unit_price * ABS(p_delta));
  END IF;

  v_next_rev := GREATEST(0, v_current_rev + v_price_delta);

  -- F. ATOMIC ITEM SALES MUTATION
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
    DELETE FROM public.daily_item_sales
    WHERE session_id = v_session_id AND menu_item_id = p_menu_item_id;
  END IF;

  -- G. ATOMIC SESSION TOTALS MUTATION
  UPDATE public.daily_sessions
  SET
    total_revenue = GREATEST(0, total_revenue + v_price_delta),
    total_items_sold = GREATEST(0, total_items_sold + p_delta),
    total_sales_entries = GREATEST(0, total_sales_entries + p_delta)
  WHERE id = v_session_id;

  -- H. RETURN STRUCTURED RESULT
  RETURN jsonb_build_object(
    'success', true,
    'session_id', v_session_id,
    'menu_item_id', p_menu_item_id,
    'quantity_sold', v_next_qty,
    'revenue', v_next_rev
  );
END;
$$;

-- 3. CREATE OR REPLACE RECORD_SALE ALIAS OVERLOAD
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

-- 4. EXPLICIT PRIVILEGE REVOCATIONS & GRANTS (RUN AFTER CREATING FUNCTIONS)
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin() FROM anon;

REVOKE ALL ON FUNCTION public.record_sale_manual_inventory(uuid, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.record_sale_manual_inventory(uuid, integer) FROM anon;

REVOKE ALL ON FUNCTION public.record_sale(uuid, uuid, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.record_sale(uuid, uuid, integer) FROM anon;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_sale_manual_inventory(uuid, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_sale(uuid, uuid, integer) TO authenticated;

-- 5. RELOAD POSTGREST SCHEMA CACHE
NOTIFY pgrst, 'reload schema';
