-- ============================================
-- CLEANUP: Remove 2025 demo data before 2026 event
-- Run this to clear all seeded demo data
-- ============================================

-- Delete 2025 demo data
DELETE FROM golfers WHERE event_year = 2025;
DELETE FROM volunteers WHERE event_year = 2025;
DELETE FROM raffle_items WHERE event_year = 2025;

-- Verify cleanup
SELECT 'golfers' as table_name, COUNT(*) as remaining FROM golfers
UNION ALL SELECT 'volunteers', COUNT(*) FROM volunteers
UNION ALL SELECT 'raffle_items', COUNT(*) FROM raffle_items;

-- ============================================
-- OPTIONAL: Drop tables entirely if not needed
-- ============================================
-- DROP TABLE IF EXISTS golfers;
-- DROP TABLE IF EXISTS volunteers;
-- DROP TABLE IF EXISTS raffle_items;
