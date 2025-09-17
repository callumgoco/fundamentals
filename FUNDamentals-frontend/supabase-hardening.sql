-- Supabase Security Hardening
-- Run this in the Supabase SQL editor for your project

-- 1) Enable RLS on public.user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 2) Policies: allow users to manage only their own profile
-- Adjust column names if your schema differs
DO $$
BEGIN
  -- Select own profile
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_profiles' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile"
      ON public.user_profiles
      FOR SELECT
      USING ( auth.uid() = id );
  END IF;

  -- Insert own profile
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_profiles' AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile"
      ON public.user_profiles
      FOR INSERT
      WITH CHECK ( auth.uid() = id );
  END IF;

  -- Update own profile
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON public.user_profiles
      FOR UPDATE
      USING ( auth.uid() = id )
      WITH CHECK ( auth.uid() = id );
  END IF;
END$$;

-- 3) Fix function search_path warnings without changing function bodies
-- Note: If your functions take arguments, adjust the signatures accordingly
DO $$
BEGIN
  BEGIN
    EXECUTE 'ALTER FUNCTION public.handle_new_user() SET search_path = public, extensions';
  EXCEPTION WHEN undefined_function THEN
    RAISE NOTICE 'Function public.handle_new_user() not found. Skipping.';
  END;

  BEGIN
    EXECUTE 'ALTER FUNCTION public.update_updated_at_column() SET search_path = public, extensions';
  EXCEPTION WHEN undefined_function THEN
    RAISE NOTICE 'Function public.update_updated_at_column() not found. Skipping.';
  END;
END$$;

-- 4) Optional: Ensure a trigger creates a profile after signup
-- If you rely on automatic profile creation, ensure this exists.
-- This assumes user_profiles.id is UUID = auth.users.id
-- Uncomment and adjust if needed.
-- CREATE OR REPLACE FUNCTION public.handle_new_user()
-- RETURNS trigger
-- LANGUAGE plpgsql
-- SECURITY DEFINER
-- SET search_path = public, extensions
-- AS $$
-- BEGIN
--   INSERT INTO public.user_profiles (id, email, username)
--   VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'username', ''))
--   ON CONFLICT (id) DO NOTHING;
--   RETURN NEW;
-- END;
-- $$;
--
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5) Review Auth settings in Supabase dashboard:
-- - Reduce OTP expiry to <= 3600 seconds
-- - Enable Leaked Password Protection
-- - Consider upgrading Postgres version from Database > Settings
