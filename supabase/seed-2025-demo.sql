-- ============================================
-- SEED DATA FROM 2025 SPREADSHEET
-- NOTE: This is demo data - delete before 2026 event
-- ============================================

-- GOLFERS (from Online Registrations 2025)
INSERT INTO golfers (name, email, company, team_name, num_players, amount, paid, logo_received, players_confirmed, notes, event_year) VALUES
('Josh Vanden Heuvel', 'josh.vandenheuveldds@gmail.com', 'Baye and Van Dentistry', NULL, 4, 1022.8, true, true, true, NULL, 2025),
('Jason Spang', 'jasonspang945@gmail.com', 'Spang Family', NULL, 1, 1022.8, true, true, false, NULL, 2025),
('Timothy VandenHeuvel', 'timvandenheuvel@thermach.com', 'Thermach LLC', NULL, 4, 1005.0, true, true, true, NULL, 2025),
('Patrick Kelly', 'pdonovankelly@gmail.com', 'Apple Creek Oral Surgery', NULL, 4, 1022.8, true, true, true, NULL, 2025),
('Kurt Van Dyn Hoven', 'vdhhomeacct@gmail.com', NULL, NULL, 4, 1000.0, true, true, true, NULL, 2025),
('Jim Tomassetti', 'dr_t@applecreekortho.com', 'Apple Creek Orthodontics', NULL, 4, 1022.8, true, true, false, NULL, 2025),
('Thomas Boogard', 'tboogaard@sbcglobal.net', NULL, NULL, 4, 562.68, true, false, true, NULL, 2025),
('Vicki VandenHeuvel', 'vtheuvel@yahoo.com', NULL, NULL, 4, 562.68, true, false, true, NULL, 2025),
('Sharon Baken', 'sbaken65@gmail.com', NULL, NULL, 4, 562.68, true, false, true, NULL, 2025),
('Courtney Knuts', 'courtneyknuts@gmail.com', NULL, NULL, 4, 562.68, true, false, true, NULL, 2025),
('Holly Neale', 'hollyneale64@gmail.com', NULL, NULL, 4, 554.4, true, false, true, NULL, 2025),
('William Jansen', 'billmary88@gmail.com', NULL, NULL, 4, 569.95, true, false, true, NULL, 2025),
('Craig Eichinger', NULL, NULL, NULL, 4, 550.0, true, false, true, 'check in hand', 2025),
('Paul Schulz', NULL, NULL, NULL, 4, 550.0, true, false, true, 'check in hand', 2025),
('Alex Young', NULL, NULL, NULL, 4, 550.0, true, false, true, NULL, 2025),
('Patty VerVort', 'vegat8@hotmail.com', NULL, NULL, 4, 550.0, true, false, true, NULL, 2025),
('John Torres', 'Johnktorres@gmail.com', NULL, NULL, 4, 562.68, true, false, true, NULL, 2025),
('Aunt Julie team', NULL, NULL, NULL, 4, 550.0, true, false, true, 'check in hand', 2025),
('Tyler Tesch team', 't.tesch1155@gmail.com', NULL, NULL, 4, 550.0, true, false, true, NULL, 2025),
('John Engelbert', 'jenglebert@bayland.net', NULL, NULL, 4, 550.0, true, false, true, NULL, 2025),
('Shane Bahr', NULL, NULL, NULL, 4, 0, true, false, true, 'Day of', 2025),
('Girls team Bahr', NULL, NULL, NULL, 4, 0, true, false, true, 'Day of', 2025),
('Michael Dejno', 'healthcare@tpa-net.com', NULL, NULL, 4, 569.95, true, false, true, NULL, 2025),
('Christopher Hiltgen', 'chris.hiltgen@gmail.com', NULL, NULL, 4, 550.0, true, false, true, NULL, 2025),
('Max Westphal', NULL, NULL, NULL, 4, 550.0, true, false, true, 'day of', 2025),
('Anne Wettstein', 'Anne@hrconsultingpartners.net', NULL, NULL, 4, 550.0, true, false, true, NULL, 2025),
('Mitch Bergen', 'MBergen@Michels.US', NULL, NULL, 4, 0, true, false, true, 'day of', 2025),
('Steve Eichinger', NULL, NULL, NULL, 4, 620.0, true, false, true, 'day of', 2025),
('Stephen Laczniak', 'stevel@belairgrowth.com', NULL, NULL, 1, 613.65, true, false, false, NULL, 2025),
('Benjamin Uphoof', 'buphoff1@gmail.com', NULL, NULL, 1, 150.0, true, false, true, NULL, 2025),
('Donna Green', 'donnaney74@gmail.com', NULL, NULL, 1, 150.0, true, false, true, NULL, 2025),
('William Jansen', 'billmary88@gmail.com', NULL, NULL, 1, 600.0, true, false, true, NULL, 2025),
('Lona Bayer', NULL, NULL, NULL, 1, 600.0, false, false, true, NULL, 2025);

-- VOLUNTEERS
INSERT INTO volunteers (name, email, phone, assignment, confirmed, is_returning, notes, event_year) VALUES
('Brenda Vanden heuvel', NULL, NULL, 'Putting game', false, false, NULL, 2025),
('Brittany Vanden Heuvel', NULL, NULL, 'Putting game', false, false, NULL, 2025),
('Lacey Vanden Heuvel', NULL, NULL, NULL, false, false, NULL, 2025),
('Emma Pearce', NULL, NULL, 'floater raffle watch kids', false, false, NULL, 2025),
('Maggie Pearce', NULL, NULL, 'floater raffle watch kids', false, false, NULL, 2025),
('Cathy Young', NULL, NULL, 'chuck a ball game -break during golf', false, false, NULL, 2025),
('Maria Kosmerchock-VanderBloomen', NULL, NULL, 'Chuck a ball game - break during golf', false, false, NULL, 2025),
('Michelle Beil', NULL, NULL, 'raffle', false, false, NULL, 2025),
('Melissa', NULL, NULL, 'registration', false, false, NULL, 2025),
('Steph Morris', NULL, NULL, 'registration', false, false, NULL, 2025),
('Kaylee Pullen', NULL, NULL, 'registration', false, false, NULL, 2025),
('Alicia Novak', NULL, NULL, 'registration', false, false, NULL, 2025),
('Amber Bahr', NULL, NULL, '50/50', false, false, NULL, 2025),
('Anna Keller', NULL, NULL, '50/50', false, false, NULL, 2025);

-- RAFFLE ITEMS (sample data - spreadsheet was empty)
INSERT INTO raffle_items (item, donor, value, status, notes, event_year) VALUES
('Titleist Pro V1 Golf Balls (Dozen)', 'Golf Galaxy', 55, 'received', NULL, 2025),
('$100 Restaurant Gift Card', 'Fox River Brewing', 100, 'received', NULL, 2025),
('Yeti Cooler', 'YETI', 250, 'pending', NULL, 2025),
('Golf Lesson Package', 'Royal St. Patricks', 150, 'received', NULL, 2025),
('Packers Signed Football', 'Green Bay Packers', 300, 'pending', NULL, 2025);

-- Verify counts
SELECT 'golfers' as table_name, COUNT(*) as count FROM golfers WHERE event_year = 2025
UNION ALL SELECT 'volunteers', COUNT(*) FROM volunteers WHERE event_year = 2025
UNION ALL SELECT 'raffle_items', COUNT(*) FROM raffle_items WHERE event_year = 2025;
