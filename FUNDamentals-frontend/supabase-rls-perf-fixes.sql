-- RLS initplan performance fixes
-- Replace auth.uid() calls with scalar subselects to avoid per-row re-evaluation
-- Run this in the Supabase SQL editor

-- Helper to update a policy's USING and/or WITH CHECK expressions if the policy exists
-- Args set inline for each policy

-- user_profiles (uses column id)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='user_profiles' AND policyname='Users can view own profile'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can view own profile" ON public.user_profiles USING ((select auth.uid()) = id)';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='user_profiles' AND policyname='Users can insert own profile'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can insert own profile" ON public.user_profiles WITH CHECK ((select auth.uid()) = id)';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='user_profiles' AND policyname='Users can update own profile'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can update own profile" ON public.user_profiles USING ((select auth.uid()) = id) WITH CHECK ((select auth.uid()) = id)';
  END IF;
END$$;

-- module_progress (uses column user_id)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='module_progress' AND policyname='Users can view own module progress'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can view own module progress" ON public.module_progress USING ((select auth.uid()) = user_id)';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='module_progress' AND policyname='Users can insert own module progress'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can insert own module progress" ON public.module_progress WITH CHECK ((select auth.uid()) = user_id)';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='module_progress' AND policyname='Users can update own module progress'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can update own module progress" ON public.module_progress USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id)';
  END IF;
END$$;

-- game_scores (uses column user_id)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='game_scores' AND policyname='Users can view own game scores'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can view own game scores" ON public.game_scores USING ((select auth.uid()) = user_id)';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='game_scores' AND policyname='Users can insert own game scores'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can insert own game scores" ON public.game_scores WITH CHECK ((select auth.uid()) = user_id)';
  END IF;
END$$;

-- quiz_results (uses column user_id)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='quiz_results' AND policyname='Users can view own quiz results'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can view own quiz results" ON public.quiz_results USING ((select auth.uid()) = user_id)';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='quiz_results' AND policyname='Users can insert own quiz results'
  ) THEN
    EXECUTE 'ALTER POLICY "Users can insert own quiz results" ON public.quiz_results WITH CHECK ((select auth.uid()) = user_id)';
  END IF;
END$$;
