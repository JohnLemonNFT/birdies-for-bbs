-- Birdies for BBS Database Schema
-- Run this in Supabase SQL Editor (supabase.com > your project > SQL Editor)

-- ============================================
-- CONTACTS TABLE (Email List - Core Asset)
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  company TEXT,
  type TEXT DEFAULT 'other', -- 'golfer', 'sponsor', 'donor', 'volunteer', 'raffle_donor', 'other'
  source TEXT DEFAULT 'manual', -- 'website_signup', 'tournament_2024', 'tournament_2025', 'manual'
  notes TEXT,
  opted_in BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- BUSINESSES TABLE (CRM Sponsor Outreach)
-- ============================================
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT, -- 'auto', 'bank', 'insurance', 'construction', etc.
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  notes TEXT,
  status TEXT DEFAULT 'not_contacted', -- 'not_contacted', 'reached_out', 'follow_up', 'committed', 'declined'
  tier TEXT, -- 'title', 'eagle', 'birdie', 'hole', 'cart', 'inkind'
  amount INTEGER DEFAULT 0,
  contact_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to do everything
CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view businesses"
  ON businesses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert businesses"
  ON businesses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update businesses"
  ON businesses FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete businesses"
  ON businesses FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_type ON contacts(type);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
