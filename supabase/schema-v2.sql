-- Birdies for BBS Database Schema V2
-- NEW TABLES: golfers, raffle_items, volunteers
-- Run this in Supabase SQL Editor

-- Create update_updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- GOLFERS TABLE (Tournament Registrations)
-- ============================================
CREATE TABLE IF NOT EXISTS golfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  team_name TEXT,
  num_players INTEGER DEFAULT 1,
  amount DECIMAL(10,2) DEFAULT 0,
  paid BOOLEAN DEFAULT false,
  logo_received BOOLEAN DEFAULT false,
  players_confirmed BOOLEAN DEFAULT false,
  notes TEXT,
  event_year INTEGER DEFAULT 2026,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RAFFLE_ITEMS TABLE (Donated Raffle Prizes)
-- ============================================
CREATE TABLE IF NOT EXISTS raffle_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item TEXT NOT NULL,
  donor TEXT,
  value DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'pending', 'received', 'used'
  notes TEXT,
  event_year INTEGER DEFAULT 2026,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- VOLUNTEERS TABLE (Event Helpers)
-- ============================================
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  assignment TEXT,
  confirmed BOOLEAN DEFAULT false,
  is_returning BOOLEAN DEFAULT false,
  notes TEXT,
  event_year INTEGER DEFAULT 2026,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE golfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE raffle_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- Golfers policies
CREATE POLICY "Authenticated users can view golfers"
  ON golfers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert golfers"
  ON golfers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update golfers"
  ON golfers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete golfers"
  ON golfers FOR DELETE TO authenticated USING (true);

-- Raffle items policies
CREATE POLICY "Authenticated users can view raffle_items"
  ON raffle_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert raffle_items"
  ON raffle_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update raffle_items"
  ON raffle_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete raffle_items"
  ON raffle_items FOR DELETE TO authenticated USING (true);

-- Volunteers policies
CREATE POLICY "Authenticated users can view volunteers"
  ON volunteers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert volunteers"
  ON volunteers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update volunteers"
  ON volunteers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete volunteers"
  ON volunteers FOR DELETE TO authenticated USING (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_golfers_event_year ON golfers(event_year);
CREATE INDEX IF NOT EXISTS idx_golfers_paid ON golfers(paid);
CREATE INDEX IF NOT EXISTS idx_raffle_items_event_year ON raffle_items(event_year);
CREATE INDEX IF NOT EXISTS idx_volunteers_event_year ON volunteers(event_year);

-- ============================================
-- UPDATED_AT TRIGGERS
-- ============================================
CREATE TRIGGER golfers_updated_at
  BEFORE UPDATE ON golfers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER raffle_items_updated_at
  BEFORE UPDATE ON raffle_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER volunteers_updated_at
  BEFORE UPDATE ON volunteers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
