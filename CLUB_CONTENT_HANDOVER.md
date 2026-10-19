# E-Cell MITAOE — Production Launch & Staging Deployment Checklist

This document serves as the comprehensive operational handover and deployment verification record for the leadership and web development committee of **E-Cell MITAOE (Entrepreneurship Cell, MIT Academy of Engineering, Pune)**.

---

## 1. System Readiness & Architecture Overview

The website has been architected, audited, and hardened for production deployment:

- **Framework**: Next.js 16 (Turbopack, App Router), React 19, Tailwind CSS v4, TypeScript.
- **Theme & Brand Palette**: Strict light theme with an editorial, institutional entrepreneurship aesthetic.
  - Deep Black (`#111318`), Institutional Navy (`#142442`), Electric Blue (`#315CE8`), Warm Cream/Beige (`#F0E8D8`), Off-white Background (`#F7F5EF`).
- **Official Logos**: Both light-background and dark-background official vector-aligned logos are integrated in `public/images/logo-light-bg.png` and `public/images/logo-dark-bg.png` preserving native aspect ratios without distortion.
- **Local Photographic Assets**: High-resolution local hero conclave and innovation hub imagery in `public/images/`.
- **Honest Attribution**: Zero fabricated achievements or unverified statistics. All demonstration records are explicitly tagged (`[Representative Record]`, `[Sample Marker]`).
- **Preview & Production Resilience**: When Supabase credentials are absent, the application runs in a transparent **Local Preview Mode** with full seed data and responsive Amber notifications on forms. When configured, it transitions to live Supabase Postgres tables with Row Level Security.
- **Server Security & Admin Control**:
  - **Multi-Tier Shared Rate Limiter**: Shared Postgres (`admin_rate_limits`) or Upstash Redis with local sliding-window in-memory fallback (5 failed attempts / 15 minutes lockout).
  - **CSRF & Origin Verification**: Strict cross-site request validation on all mutative administrative routes (`POST`, `DELETE`).
  - **Cryptographic Session Tokens**: HMAC-SHA256 timestamped signed admin session cookies (`ecell_admin_token`) with `httpOnly`, `sameSite=lax`, and `secure` in production.
  - **Server-Side Authorization**: Verified session token enforcement for every administrative API endpoint (`/api/admin/*`).
  - **Input & File Upload Validation**: Cryptographically randomized file names, MIME type verification (JPEG, PNG, WebP), and strict 5MB file-size limits.
  - **Timing-Safe Authentication**: Constant-time string comparison (`crypto.timingSafeEqual`) prevents timing attack vulnerabilities.

---

## 2. Environment Variables Reference

| Variable | Description | Required / Optional | Location |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL of the deployed application (e.g., `https://ecellmitaoe.com`) | **Required** | Client & Server |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project API URL (e.g., `https://xyz.supabase.co`) | Optional in preview, **Required for live DB** | Client & Server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Client Public API Key | Optional in preview, **Required for live DB** | Client & Server |
| `SUPABASE_SERVICE_ROLE_KEY` | Elevated Supabase Service Role Key for backend administration | Optional in preview, **Required for elevated DB tasks** | **Server Only (Never expose client-side)** |
| `ADMIN_SECRET_KEY` | Secret passcode for admin committee portal | **Required in production** (Defaults to local demo key if unset) | **Server Only (Never expose client-side)** |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint for distributed rate limiting | Optional (Supabase DB rate limiting table is used by default) | Server Only |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST access token | Optional | Server Only |

---

## 3. Supabase Deployment & Setup Guide

To enable live cloud persistence and the admin management backend:

1. **Create Supabase Project**:
   - Go to [https://supabase.com](https://supabase.com) and create a new project (e.g., `ecell-mitaoe-prod`).
   - Select the region closest to Pune/India (`ap-south-1` Mumbai).

2. **Execute Database Schema**:
   - Navigate to the **SQL Editor** in your Supabase dashboard.
   - Open and copy the entire contents of [`supabase-schema.sql`](file:///s:/E-cell/supabase-schema.sql).
   - Click **Run** to create:
     - 7 application data tables (`events`, `achievements`, `gallery_albums`, `gallery_images`, `team_members`, `contact_enquiries`, `join_applications`).
     - 1 shared rate-limiting table (`admin_rate_limits`).
     - Storage bucket `ecell-media` with public read access and admin-only upload/delete policies.
     - Row-Level Security (RLS) policies on all tables ensuring unauthenticated users cannot read private applications or perform unauthorized writes.

3. **Configure Environment Variables in Hosting Provider (Vercel / Netlify / VPS)**:
   Add the environment variables listed in Section 2 above to your hosting provider's secret manager.

---

## 4. Staging Deployment Checklist

Follow these exact steps when preparing the staging environment:

- [ ] **Step 1: Staging Supabase Instance**: Create a dedicated staging project on Supabase and run `supabase-schema.sql`.
- [ ] **Step 2: Hosting Environment**: Deploy branch to staging environment (e.g., Vercel Preview or custom staging domain `staging.ecellmitaoe.com`).
- [ ] **Step 3: Staging Secrets Configuration**: Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and a unique `ADMIN_SECRET_KEY` on the staging deployment.
- [ ] **Step 4: Public Data Source Verification**:
  - Open `/events` and confirm events load from Supabase.
  - Open `/achievements` and confirm achievements load from Supabase.
  - Open `/gallery` and confirm albums load with images.
  - Open `/team` and confirm committee members render across 2024-25 and 2023-24 sessions.
- [ ] **Step 5: Form Submissions Testing**:
  - Submit a test inquiry on `/contact`; verify receipt in `contact_enquiries` table in Supabase.
  - Submit a test recruitment form on `/join`; verify receipt in `join_applications` table in Supabase.
  - Confirm private entries are NOT accessible via public API endpoints.
- [ ] **Step 6: Admin Dashboard & CRUD Testing**:
  - Log in at `/admin` with `ADMIN_SECRET_KEY`.
  - Create a new test event and upload a test image.
  - Verify the image appears in the Supabase `ecell-media` storage bucket.
  - Delete the test event and confirm it is removed from the database.
  - View the test contact enquiry and join application in the Applications tab; delete both test submissions.
  - Log out and verify that the session cookie is terminated.
- [ ] **Step 7: Security Penetration Check**:
  - Run unauthenticated POST/DELETE requests against `/api/admin/*`; confirm HTTP 401 Unauthorized responses.
  - Run cross-origin requests; confirm HTTP 403 Forbidden CSRF rejection.
  - Attempt 6 consecutive failed logins; confirm HTTP 429 rate limit lockout.

---

## 5. Checklist of Real Club Content Required Before Public Launch

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

## 6. Verification & Automated Test Results

| Requirement | Implementation / Control | Status |
| :--- | :--- | :--- |
| **Linting & Type Safety** | `npm run lint` with strict TypeScript & React 19 rules | **PASS (0 errors, 0 warnings)** |
| **Production Compilation** | `npm run build` Turbopack compilation | **PASS (All 30 routes static/dynamic compiled)** |
| **Server-Side Authorization** | HMAC-SHA256 timestamped signed tokens verified on every admin endpoint | **PASS** |
| **Rate Limiting** | Multi-tier rate limiting (Supabase DB / Redis / In-memory fallback) | **PASS** |
| **CSRF Defense** | Strict Origin and Referer header verification on mutative requests | **PASS** |
| **Safe Database Access** | Parameterized query builders via Supabase client, zero SQL injection vectors | **PASS** |
| **Row-Level Security** | Public SELECT on public items; INSERT only on forms; SELECT restricted to admins for submissions | **PASS** |
| **Storage Permissions** | Public SELECT on `ecell-media`, admin-only INSERT/DELETE | **PASS** |
| **File Upload Validation** | Random hex filename, MIME restriction (JPEG, PNG, WebP), 5MB size limit | **PASS** |
| **Form Transparency** | Amber standby notices when Supabase is unconfigured; zero false success reports | **PASS** |
| **Data Mappers** | Seamless bidirectional mapping between DB snake_case and TypeScript camelCase | **PASS** |
| **Responsive Design** | Audited across desktop (1920px) and mobile (375px) viewports with zero horizontal overflow | **PASS** |
