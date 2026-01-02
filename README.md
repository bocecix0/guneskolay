# GüneşKolay - Turkish Solar Marketplace

A production-ready MVP for a Turkish solar marketplace that reduces scam/low-quality solar installer risk by verifying installers and pre-qualifying homeowners.

## Tech Stack

- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Forms**: Zod + react-hook-form
- **Database**: Supabase (Postgres)
- **Auth**: Supabase Auth (email magic link) for admin only
- **Deployment**: Vercel-ready

## Features

### For Homeowners
- Multi-step lead form with smart scoring
- View verified installers directory
- WhatsApp quick contact

### For Installers
- Company registration with region selection
- Verification process (admin approval)
- Lead matching

### Admin Panel
- Protected with magic link authentication
- Lead management with status workflow
- Installer approval/rejection
- Basic analytics dashboard

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
# Get these from: https://app.supabase.com/project/YOUR_PROJECT/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://guneskolay.com

# WhatsApp (with country code, no + or spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=905551234567

# Google Maps API Keys
# Create at: https://console.cloud.google.com/apis/credentials
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-browser-key  # HTTP referrer restricted
GOOGLE_MAPS_SERVER_API_KEY=your-server-key        # IP restricted (optional)
```

### 3. Setup Google Maps API (for Address Picker)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable these APIs:
   - **Places API** (for address autocomplete)
   - **Maps Static API** (for satellite preview)
4. Create API credentials:
   
   **Browser Key (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY):**
   - API Key → Restrict key → HTTP referrers
   - Add: `localhost:3000/*`, `your-domain.com/*`
   
   **Server Key (GOOGLE_MAPS_SERVER_API_KEY) - Optional:**
   - API Key → Restrict key → IP addresses
   - Add your server/Vercel IP ranges

### 3. Setup Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration script from `db/migrations.sql`
3. Enable Email Auth:
   - Go to Authentication > Providers > Email
   - Enable "Confirm Email" and "Magic Link"
4. Add admin email to allowed list (if using restricted auth)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── actions/           # Server actions
│   ├── admin/             # Admin panel (protected)
│   ├── teklif-al/         # Lead form
│   ├── firma-katil/       # Installer signup
│   ├── firmalar/          # Installer directory
│   ├── kvkk/              # KVKK page
│   ├── gizlilik/          # Privacy page
│   └── cerez-politikasi/  # Cookie policy
├── components/
│   ├── ui/                # shadcn/ui components
│   └── layout/            # Header, Footer
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── analytics.ts       # Event tracking
│   ├── constants.ts       # Form options
│   ├── scoring.ts         # Lead scoring
│   └── validations.ts     # Zod schemas
└── middleware.ts          # Auth middleware
```

## Database Schema

### leads
- Contact info (name, phone, location)
- Property details (type, roof, shading)
- Energy info (bill range, budget)
- Scoring (0-100) and status workflow
- Installer assignment

### installers
- Company info (name, VKN, regions)
- Capacity and team type
- Contact details
- Approval status

## Deployment to Vercel

1. Push to GitHub
2. Connect repository in Vercel
3. Add environment variables
4. Deploy

## Lead Scoring Algorithm

Scores are calculated based on:
- **Timeline** (max 30pts): "hemen" = 30, "1-3 ay" = 20, "3-6 ay" = 10
- **Bill Amount** (max 25pts): Higher bills = higher score
- **Property Type** (max 20pts): Müstakil = 20, İşyeri = 15, Site = 10
- **Roof Clarity** (max 15pts): Known type = 15, Unknown = 5
- **No Shading** (max 5pts): No shade = 5
- **Location Clarity** (max 5pts): Both city + district = 5

## Future Improvements

- [ ] PWA Support - Offline access and installability
- [ ] Phone Verification - OTP verification for leads
- [ ] Payment Integration - Stripe/iyzico for premium listings
- [ ] Matching Algorithm - Smart installer-lead matching
- [ ] Dashboard Analytics - Conversion funnels
- [ ] SMS Notifications - Lead alerts for installers
- [ ] Review System - Post-installation ratings

## Legal Notice

⚠️ The legal pages (KVKK, Gizlilik, Çerez Politikası) contain placeholder text marked as "TASLAK" (draft). **Consult a lawyer before publishing.**

## License

Private - All rights reserved.
