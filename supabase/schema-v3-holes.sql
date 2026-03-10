-- Birdies for BBS Schema V3 - Hole Assignments
-- Adds missing features from spreadsheet analysis

-- ============================================
-- 1. ADD HOLE ASSIGNMENT TO GOLFERS
-- For shotgun start: assigns team to starting hole (1A, 1B, 18A, etc.)
-- ============================================
ALTER TABLE golfers ADD COLUMN IF NOT EXISTS hole_assignment TEXT;
ALTER TABLE golfers ADD COLUMN IF NOT EXISTS emailed BOOLEAN DEFAULT false;
ALTER TABLE golfers ADD COLUMN IF NOT EXISTS follow_up BOOLEAN DEFAULT false;

-- ============================================
-- 2. ADD HOLE ASSIGNMENT TO BUSINESSES (SPONSORS)
-- For sponsor holes: which hole they're sponsoring
-- ============================================
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS hole_assignment TEXT;

-- ============================================
-- 3. CREATE HOLE SPONSORS TABLE
-- Maps holes to sponsors/games for event day
-- ============================================
CREATE TABLE IF NOT EXISTS hole_sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hole_number TEXT NOT NULL, -- '1', '2', '3'... '18'
  sponsor_name TEXT, -- Company name or game name
  sponsor_type TEXT DEFAULT 'sponsor', -- 'sponsor', 'game', 'contest'
  game_description TEXT, -- 'Closest to Pin Men', 'Longest Drive Women', etc.
  business_id UUID REFERENCES businesses(id), -- Link to sponsor if applicable
  notes TEXT,
  event_year INTEGER DEFAULT 2026,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for hole_sponsors
ALTER TABLE hole_sponsors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can manage hole_sponsors"
  ON hole_sponsors FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================
-- SEED: 18 HOLES with sponsor data from 2025
-- ============================================
INSERT INTO hole_sponsors (hole_number, sponsor_name, game_description, sponsor_type, event_year) VALUES
('1', 'Apple Creek Logo', NULL, 'sponsor', 2025),
('2', NULL, 'Closest to Pin in 2 (Women)', 'contest', 2025),
('3', 'Bayer Builders / Wyatt Bayer Builders', NULL, 'sponsor', 2025),
('4', NULL, 'Closest to Pin (Men)', 'contest', 2025),
('5', 'Bel Air Growth Partners', NULL, 'sponsor', 2025),
('6', 'Pearce Family', NULL, 'sponsor', 2025),
('7', NULL, 'Longest Drive (Women)', 'contest', 2025),
('8', 'Nicolet Bank', 'Tent and sponsor sign', 'sponsor', 2025),
('9', NULL, 'Longest Putt (Men)', 'contest', 2025),
('10', 'Two Lakes Family Foundation', NULL, 'sponsor', 2025),
('11', 'Thermach', NULL, 'sponsor', 2025),
('12', NULL, 'Closest to Pin (Women)', 'contest', 2025),
('13', 'Spang Family', NULL, 'sponsor', 2025),
('14', NULL, 'Longest Drive (Men)', 'contest', 2025),
('15', 'Baye and Vanden Heuvel Dentistry', 'Tent/hole game and sign', 'sponsor', 2025),
('16', 'RA Engel & Associates', NULL, 'sponsor', 2025),
('17', NULL, 'Closest to Pin in 2 (Men)', 'contest', 2025),
('18', NULL, 'Longest Putt (Women)', 'contest', 2025);

-- Update existing golfers with emailed/follow_up from spreadsheet
UPDATE golfers SET emailed = true, follow_up = false WHERE logo_received = true;

-- Verify
SELECT 'hole_sponsors' as table_name, COUNT(*) as count FROM hole_sponsors;
