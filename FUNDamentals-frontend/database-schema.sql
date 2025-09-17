-- FUNDamentals Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Create custom types
CREATE TYPE quiz_type AS ENUM ('pre', 'post');
CREATE TYPE learning_style AS ENUM ('visual', 'interactive', 'reading');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  goal TEXT,
  confidence INTEGER CHECK (confidence >= 1 AND confidence <= 10),
  learning_style learning_style,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Module progress tracking
CREATE TABLE public.module_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  budgeting_progress INTEGER DEFAULT 0 CHECK (budgeting_progress >= 0 AND budgeting_progress <= 100),
  savings_progress INTEGER DEFAULT 0 CHECK (savings_progress >= 0 AND savings_progress <= 100),
  investing_progress INTEGER DEFAULT 0 CHECK (investing_progress >= 0 AND investing_progress <= 100),
  debt_progress INTEGER DEFAULT 0 CHECK (debt_progress >= 0 AND debt_progress <= 100),
  insurance_progress INTEGER DEFAULT 0 CHECK (insurance_progress >= 0 AND insurance_progress <= 100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Game scores
CREATE TABLE public.game_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  game_name VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  final_value DECIMAL(10,2),
  years_played INTEGER,
  profit_loss DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz results
CREATE TABLE public.quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  module VARCHAR(50) NOT NULL,
  quiz_type quiz_type NOT NULL,
  answers JSONB,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_module_progress_user_id ON public.module_progress(user_id);
CREATE INDEX idx_game_scores_user_id ON public.game_scores(user_id);
CREATE INDEX idx_game_scores_game_name ON public.game_scores(game_name);
CREATE INDEX idx_quiz_results_user_id ON public.quiz_results(user_id);
CREATE INDEX idx_quiz_results_module ON public.quiz_results(module);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- TEMPORARILY DISABLE RLS for user_profiles to allow manual profile creation
-- TODO: Re-enable once the trigger is working properly
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- RLS Policies

-- User profiles: users can only access their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow service role to insert profiles (for manual creation fallback)
CREATE POLICY "Service role can insert profiles" ON public.user_profiles
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to insert their own profile during registration
CREATE POLICY "Users can insert own profile during registration" ON public.user_profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id OR 
    auth.role() = 'service_role'
  );

-- Module progress: users can only access their own progress
CREATE POLICY "Users can view own module progress" ON public.module_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own module progress" ON public.module_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own module progress" ON public.module_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Game scores: users can only access their own scores
CREATE POLICY "Users can view own game scores" ON public.game_scores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game scores" ON public.game_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Quiz results: users can only access their own results
CREATE POLICY "Users can view own quiz results" ON public.quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results" ON public.quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  username_value TEXT;
BEGIN
  -- Extract username from raw_user_meta_data, with fallback
  username_value := COALESCE(
    NEW.raw_user_meta_data->>'username',
    SPLIT_PART(NEW.email, '@', 1),  -- Fallback to email prefix
    'user_' || SUBSTRING(NEW.id::text, 1, 8)  -- Fallback to user_id prefix
  );
  
  -- Insert user profile
  INSERT INTO public.user_profiles (id, username, email)
  VALUES (NEW.id, username_value, NEW.email);
  
  -- Insert module progress
  INSERT INTO public.module_progress (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error (this will appear in Supabase logs)
    RAISE LOG 'Error in handle_new_user trigger: %', SQLERRM;
    RAISE LOG 'User ID: %, Email: %, Meta Data: %', NEW.id, NEW.email, NEW.raw_user_meta_data;
    RETURN NEW;  -- Continue with the transaction
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_module_progress_updated_at
  BEFORE UPDATE ON public.module_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data for testing (optional)
-- INSERT INTO public.user_profiles (id, username, email, onboarding_completed, goal, confidence, learning_style)
-- VALUES (
--   gen_random_uuid(),
--   'demo_user',
--   'demo@example.com',
--   true,
--   'Save for retirement',
--   7,
--   'visual'
-- );
