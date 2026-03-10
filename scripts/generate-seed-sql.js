// Generate SQL INSERT statements for all seed businesses
import { SEED_BUSINESSES } from '../src/data/crm-businesses.js';

function escapeSQL(str) {
  if (str === null || str === undefined || str === '') return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

const values = SEED_BUSINESSES.map(b => {
  return `(${escapeSQL(b.name)}, ${escapeSQL(b.category)}, ${escapeSQL(b.phone)}, ${escapeSQL(b.email)}, ${escapeSQL(b.website)}, ${escapeSQL(b.address)}, ${escapeSQL(b.notes)}, ${escapeSQL(b.status)}, ${b.tier ? escapeSQL(b.tier) : 'NULL'}, ${b.amount || 0}, ${b.contactDate ? escapeSQL(b.contactDate) : 'NULL'})`;
}).join(',\n');

const sql = `-- Seed all ${SEED_BUSINESSES.length} businesses into Supabase
-- Run this in Supabase SQL Editor

INSERT INTO businesses (name, category, phone, email, website, address, notes, status, tier, amount, contact_date) VALUES
${values};

-- Verify count
SELECT COUNT(*) as total_businesses FROM businesses;
`;

console.log(sql);
