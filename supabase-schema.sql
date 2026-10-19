-- =========================================================================
-- E-Cell MITAOE Database Schema for Supabase
-- Run this in the Supabase SQL Editor to initialize all tables & policies.
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  date TEXT NOT NULL,
  end_date TEXT,
  venue TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  attendees_count INTEGER DEFAULT 0,
  highlights TEXT[] DEFAULT '{}',
  outcomes TEXT[] DEFAULT '{}',
  registration_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  metric TEXT,
  metric_label TEXT,
  image TEXT,
  attribution TEXT,
  link TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Gallery Albums Table
CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Gallery Images Table
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_id UUID REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT NOT NULL,
  event_name TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  is_core BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Contact Enquiries Table
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Join Applications Table
CREATE TABLE IF NOT EXISTS public.join_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  prn TEXT NOT NULL,
  branch TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  primary_domain TEXT NOT NULL,
  secondary_domain TEXT NOT NULL,
  portfolio_url TEXT,
  statement_of_purpose TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'shortlisted', 'contacted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.join_applications ENABLE ROW LEVEL SECURITY;

-- Public READ policies for public content
CREATE POLICY "Public events can be read by everyone" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public achievements can be read by everyone" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public albums can be read by everyone" ON public.gallery_albums FOR SELECT USING (true);
CREATE POLICY "Public images can be read by everyone" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Public team members can be read by everyone" ON public.team_members FOR SELECT USING (true);

-- Public INSERT policies for enquiry and join forms
CREATE POLICY "Anyone can submit a contact enquiry" ON public.contact_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Students can submit recruitment applications" ON public.join_applications FOR INSERT WITH CHECK (true);

-- Authenticated Admin policies
CREATE POLICY "Admins have full access to events" ON public.events FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to achievements" ON public.achievements FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to gallery" ON public.gallery_albums FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to gallery_images" ON public.gallery_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to team" ON public.team_members FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to enquiries" ON public.contact_enquiries FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to applications" ON public.join_applications FOR ALL TO authenticated USING (true);
