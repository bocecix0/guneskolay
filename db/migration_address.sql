-- GüneşKolay - Address Fields Migration
-- Run this in Supabase SQL Editor

-- Add address columns to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS address_text TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS place_id TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lng DOUBLE PRECISION;

-- Add index for geo queries (optional but useful)
CREATE INDEX IF NOT EXISTS idx_leads_location ON leads (lat, lng);

-- Comment for documentation
COMMENT ON COLUMN leads.address_text IS 'Full formatted address from Google Places';
COMMENT ON COLUMN leads.place_id IS 'Google Places unique identifier';
COMMENT ON COLUMN leads.lat IS 'Latitude coordinate';
COMMENT ON COLUMN leads.lng IS 'Longitude coordinate';
