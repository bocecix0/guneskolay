-- GüneşKolay Database Migrations
-- Run this in Supabase SQL Editor

-- =====================================================
-- LEADS TABLE
-- Stores homeowner quote requests with scoring
-- =====================================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Location
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  
  -- Property
  property_type TEXT NOT NULL CHECK (property_type IN ('mustakil', 'site', 'isyeri')),
  
  -- Energy
  bill_range TEXT NOT NULL,
  
  -- Roof
  roof_type TEXT NOT NULL CHECK (roof_type IN ('duz', 'egimli', 'bilmiyorum')),
  shading BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Timeline & Budget
  timeline TEXT NOT NULL CHECK (timeline IN ('hemen', '1-3-ay', '3-6-ay')),
  budget_range TEXT,
  
  -- Contact
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Consents
  consent_kvkk BOOLEAN NOT NULL DEFAULT FALSE,
  consent_contact BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Internal
  score INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'spam')),
  assigned_installer_id UUID REFERENCES installers(id) ON DELETE SET NULL,
  notes TEXT
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(score DESC);

-- =====================================================
-- INSTALLERS TABLE
-- Stores solar installer applications
-- =====================================================

CREATE TABLE IF NOT EXISTS installers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Company Info
  company_name TEXT NOT NULL,
  vkn TEXT NOT NULL, -- Vergi Kimlik Numarası
  regions TEXT[] NOT NULL,
  capacity_per_month INTEGER NOT NULL,
  has_inhouse_install_team BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Online Presence
  website TEXT,
  instagram TEXT,
  
  -- Contact
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Internal
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_installers_status ON installers(status);
CREATE INDEX IF NOT EXISTS idx_installers_regions ON installers USING GIN(regions);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on both tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE installers ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- LEADS POLICIES
-- =====================================================

-- Policy: Anyone can insert a lead (public form submission)
CREATE POLICY "Public can insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can view leads
CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update leads
CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- INSTALLERS POLICIES
-- =====================================================

-- Policy: Anyone can insert an installer application
CREATE POLICY "Public can insert installers"
  ON installers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Anyone can view approved installers only
CREATE POLICY "Public can view approved installers"
  ON installers
  FOR SELECT
  TO anon
  USING (status = 'approved');

-- Policy: Authenticated users can view all installers
CREATE POLICY "Authenticated users can view all installers"
  ON installers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update installers
CREATE POLICY "Authenticated users can update installers"
  ON installers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE leads IS 'Homeowner quote requests with lead scoring';
COMMENT ON TABLE installers IS 'Solar installer applications and profiles';
COMMENT ON COLUMN leads.score IS 'Lead quality score 0-100, computed server-side';
COMMENT ON COLUMN leads.status IS 'new = awaiting contact, contacted = reached out, qualified = good lead, closed = deal done, spam = invalid';
COMMENT ON COLUMN installers.vkn IS 'Turkish Tax ID (Vergi Kimlik Numarası)';
COMMENT ON COLUMN installers.status IS 'pending = awaiting review, approved = verified, rejected = declined';
