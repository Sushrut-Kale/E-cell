# E-Cell MITAOE — Production Launch & Content Handover Checklist

This document serves as the official operational handover for the leadership and web development committee of **E-Cell MITAOE (Entrepreneurship Cell, MIT Academy of Engineering, Pune)**.

---

## 1. System Readiness Overview

The website has been architected and audited according to the highest industry standards:

- **Framework**: Next.js 16 (Turbopack, App Router), React 19, Tailwind CSS v4, TypeScript.
- **Theme & Brand Palette**: Strict light theme with an editorial, institutional entrepreneurship aesthetic.
  - Deep Black (`#111318`), Institutional Navy (`#142442`), Electric Blue (`#315CE8`), Warm Cream/Beige (`#F0E8D8`), Off-white Background (`#F7F5EF`).
- **Official Logos**: Both light-background and dark-background official vector-aligned logos are integrated in `public/images/logo-light-bg.png` and `public/images/logo-dark-bg.png` preserving native aspect ratios without distortion.
- **Local Photographic Assets**: High-resolution local hero conclave and innovation hub imagery in `public/images/`.
- **Honest Attribution**: Zero fabricated achievements or unverified statistics. All demonstration records are explicitly tagged (`[Representative Record]`, `[Sample Marker]`).
- **Preview & Production Resilience**: When Supabase credentials are absent, the application runs in a transparent **Local Preview Mode** with full seed data and responsive Amber notifications on forms. When configured, it transitions to live Supabase Postgres tables with Row Level Security.
- **Server Security & Admin Control**:
  - In-memory rate limiting with sliding window (5 failed attempts / 15 minutes lockout).
  - HMAC-SHA256 timestamped signed admin session cookies (`ecell_admin_session`) with `httpOnly`, `sameSite=lax`, and `secure` in production.
  - Server-side authorization verification for all administrative endpoints (`/api/admin/*`).
  - MIME-type (JPEG, PNG, WebP) and file-size (<5MB) enforcement on file uploads.
  - Constant-time timing-safe passcode comparison.

---

## 2. Checklist of Real Club Content Required Before Public Launch

Before removing sample markers and making the website publicly canonical, the E-Cell MITAOE student council must provide and verify the following official assets:

### A. Club Contact & Institutional Data
- [ ] **Official Primary Email**: (Currently set to `ecell@mitaoe.ac.in`) — Confirm if enquiries should route here or to a designated secretary/faculty coordinator inbox.
- [ ] **Contact Telephone**: (Currently marked `+91 (020) 3025 3500` MITAOE EPABX) — Provide direct student coordinator contact or department desk number.
- [ ] **Campus Office / Room Location**: (Currently marked `Room 302, Innovation & Incubation Centre, MIT Academy of Engineering, Alandi, Pune - 412105`) — Confirm exact building and room number.
- [ ] **Official Social Handles**:
  - [ ] LinkedIn Organization URL (e.g., `https://linkedin.com/company/ecell-mitaoe`)
  - [ ] Instagram Handle (e.g., `https://instagram.com/ecell_mitaoe`)
  - [ ] YouTube Channel URL
  - [ ] X / Twitter Handle

### B. Verified Impact Statistics (Homepage Section)
The homepage currently displays flagged sample figures. Replace with official audited numbers from the club's annual report:
- [ ] **Students Engaged**: (Sample: `2,500+`) — Replace with verified student workshop & event turnout.
- [ ] **Campus Startups Incubated / Mentored**: (Sample: `18+`) — Replace with actual count of student teams supported.
- [ ] **Grants & Seed Funding Facilitated**: (Sample: `₹35L+`) — Replace with actual cumulative funding, prize pools, or institutional grants.
- [ ] **Active Student Organizers & Domain Leads**: (Sample: `45+`) — Replace with exact count of the 2024-25 committee roster.

### C. Executive Committee Roster (`/team`)
- [ ] **2024-25 Academic Year Committee**:
  - High-resolution headshots (square 1:1 aspect ratio, minimum 600x600px).
  - Official names, designated roles, and functional departments (Core Leadership, Tech & Web, Design & Media, PR & Marketing, Corporate Relations, Operations).
  - Student LinkedIn profile URLs.
- [ ] **2023-24 Previous Year Committee**:
  - Historical roster details to maintain cross-year institutional memory.

### D. Upcoming & Past Events Data (`/events`)
- [ ] **E-Summit 2025 / Flagship Event**:
  - Confirmed event dates, registration links (e.g., Unstop, Google Forms, or internal portal), keynote speaker bios, and itinerary.
- [ ] **Workshops & Hackathons**:
  - Confirmed semester calendar dates and venues.

### E. Photo Archive & Gallery (`/gallery`)
- [ ] Curated photo sets (3 to 6 high-resolution photos per album) from past editions of E-Summit, Ideathon, and Startup Bootcamps.
- [ ] Verified captions and photographer/media team credits.

---

## 3. Supabase Deployment & Setup Guide

To enable live cloud persistence and the admin management backend:

1. **Create Supabase Project**:
   - Go to [https://supabase.com](https://supabase.com) and create a new project (e.g., `ecell-mitaoe-prod`).
   - Select the region closest to Pune/India (`ap-south-1` Mumbai).

2. **Execute Database Schema**:
   - Navigate to the **SQL Editor** in your Supabase dashboard.
   - Open and copy the entire contents of [`supabase-schema.sql`](file:///s:/E-cell/supabase-schema.sql).
   - Click **Run** to create all 7 database tables, Row Level Security (RLS) policies, and the `ecell-media` storage bucket.

3. **Configure Environment Variables in Hosting Provider (Vercel / Netlify / VPS)**:
   ```env
   NEXT_PUBLIC_SITE_URL=https://ecellmitaoe.com
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
   ADMIN_SECRET_KEY=<generate-a-strong-random-password-for-committee-leads>
   ```

> [!WARNING]
> Never commit `.env.local` to public Git repositories. Keep `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_SECRET_KEY` strictly in your deployment platform's secret manager.

---

## 4. Verification & Testing Log

| Category | Verification Item | Result |
| :--- | :--- | :--- |
| **Linting** | `npm run lint` | 0 errors, 0 warnings (Strict ESLint 9 & TypeScript) |
| **Production Build** | `npm run build` | 28 static and dynamic routes compiled successfully via Next.js Turbopack |
| **Security - Auth** | `/api/admin/auth` | Timing-safe check, sliding-window rate limiting, httpOnly cookie |
| **Security - RLS** | Supabase Policies | Public read for approved content, public insert for enquiries, admin-only write/delete |
| **Security - Upload** | `/api/admin/upload` | Validates JPEG/PNG/WebP, max 5MB, denies unauthenticated requests (HTTP 401) |
| **Forms - Integrity** | `/contact` & `/join` | Displays clear amber notices when Supabase is in preview mode; never falsely claims delivery |
| **Responsive Design** | Desktop (1920px) to Mobile (375px) | Zero horizontal overflow, accessible hamburger menu, fluid typography |
| **Branding** | MITAOE Emblem Logos | Native proportions maintained on light navbar and dark footer |
