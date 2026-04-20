# Hibret Lebego (HL NGO) — Frontend

A modern, responsive Single Page Application (SPA) for the **Hibret Lebego Ethiopian Charity Association**, designed to facilitate humanitarian efforts through digital engagement. The platform provides public-facing pages for donations, news, emergency crisis reporting, and financial transparency, alongside a secure admin dashboard for managing NGO operations.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routing & Pages](#routing--pages)
- [State Management](#state-management)
- [API Service Layer](#api-service-layer)
- [Internationalization](#internationalization-i18n)
- [Theming](#theming)
- [Performance Optimizations](#performance-optimizations)

---

## Tech Stack

| Category | Technology | Version |
| :--- | :--- | :--- |
| UI Library | React | ^18.3.1 |
| Language | TypeScript | ^5.5.4 |
| Build Tool | Vite | ^5.2.0 |
| Styling | Tailwind CSS | 3.4.17 |
| Routing | React Router DOM | ^8.26.2 |
| HTTP Client | Axios | ^1.13.6 |
| Animations | Framer Motion | ^11.5.4 |
| Icons | Lucide React | 0.522.0 |
| Maps | React Leaflet | ^4.2.1 |

---

## Architecture Overview

The application follows a **provider-pattern architecture** where global and domain-specific state is injected at the root level via nested React Context providers.

Context Providers (Nested)
├── LanguageProvider
├── ThemeProvider
├── ToastProvider
├── AdminAuthProvider
├── DonationProvider
├── EmergencyProvider
├── NewsProvider
├── TransparencyProvider
├── ContactProvider
└── BeneficiaryStatsProvider
↓
BrowserRouter
↓
Navbar + Footer (hidden on /admin/)
↓
Route Resolution
├── /admin/ → AdminGate → AdminPage
└── /* → Public Pages

text

---

## Project Structure
UI-HL_NGO/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images (logo.png, etc.)
│ ├── components/ # Shared UI components
│ │ ├── admin/ # Admin-specific components
│ │ │ ├── modals/ # Admin modal dialogs
│ │ │ ├── AdminTable.tsx
│ │ │ └── StatCard.tsx
│ │ ├── AdminGate.tsx # Auth guard for admin routes
│ │ ├── Footer.tsx
│ │ ├── Navbar.tsx
│ │ └── Toast.tsx
│ ├── context/ # React Context providers
│ │ ├── AdminAuthContext.tsx
│ │ ├── BeneficiaryStatsContext.tsx
│ │ ├── ContactContext.tsx
│ │ ├── DonationContext.tsx
│ │ ├── EmergencyContext.tsx
│ │ ├── LanguageContext.tsx
│ │ ├── NewsContext.tsx
│ │ ├── ThemeContext.tsx
│ │ └── TransparencyContext.tsx
│ ├── hooks/ # Custom React hooks
│ │ └── useModalState.ts
│ ├── pages/ # Page-level route components
│ │ ├── admin/ # Admin dashboard
│ │ │ ├── components/
│ │ │ ├── hooks/
│ │ │ ├── tabs/
│ │ │ ├── types/
│ │ │ ├── AdminLoginPage.tsx
│ │ │ └── AdminPage.tsx
│ │ ├── AboutPage.tsx
│ │ ├── AdvocacyPage.tsx
│ │ ├── ContactPage.tsx
│ │ ├── DonatePage.tsx
│ │ ├── EmergenciesPage.tsx
│ │ ├── FinancialAccountabilityPage.tsx
│ │ ├── HomePage.tsx
│ │ ├── ImpactPage.tsx
│ │ ├── LegalPage.tsx
│ │ ├── NewsPage.tsx
│ │ ├── PartnerPage.tsx
│ │ ├── PastProjectsPage.tsx
│ │ ├── ProgramsPage.tsx
│ │ ├── SafeguardingPage.tsx
│ │ ├── TransparencyPage.tsx
│ │ ├── VolunteerPage.tsx
│ │ └── WhatWeDo.tsx
│ ├── services/ # API service layer
│ │ ├── api/ # Domain-specific API modules
│ │ │ ├── adminApi.tsx
│ │ │ ├── auditLogApi.tsx
│ │ │ ├── authApi.tsx
│ │ │ ├── beneficiaryStatsApi.tsx
│ │ │ ├── contactApi.tsx
│ │ │ ├── donationApi.tsx
│ │ │ ├── emergencyApi.tsx
│ │ │ ├── newsApi.tsx
│ │ │ └── transparencyApi.tsx
│ │ └── axios.tsx # Axios instance with interceptors
│ ├── App.tsx # Root component
│ ├── global.d.ts # Global TypeScript declarations
│ ├── index.css # Global styles
│ └── index.tsx # Entry point
├── .env.example
├── .eslintrc.cjs
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

text

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- A running backend API server (default: `http://127.0.0.1:5000`)

### Installation

```bash
git clone https://github.com/teston-25/UI-HL_NGO.git
cd UI-HL_NGO
npm install

# Running Locally
bash
npm run dev
The development server starts at http://localhost:3000. API requests to /api/* are proxied to http://127.0.0.1:5000.

# Building for Production
bash
npm run build
The optimized output is written to the dist/ directory.

Preview Production Build
bash
npm run preview
Serves the production build locally at http://localhost:4173.

# Environment Variables
Copy the example file and configure as needed:

bash
cp .env.example .env
Variable	Description
VITE_ADMIN_USER	Override default admin username
VITE_ADMIN_PASS	Override default admin password
Important: Never commit your .env file to version control.

# Available Scripts
Command	Description
npm run dev	Start Vite development server (port 3000)
npm run build	Create optimized production build
npm run preview	Preview production build locally (port 4173)
npm run lint	Run ESLint on all .js, .jsx, .ts, .tsx files

# Routing & Pages
## Public Pages
Route	Component	Description
/	HomePage	Landing page with hero, stats, programs
/about	AboutPage	Origin story, mission, values, team
/programs	ProgramsPage	Core programs: education, water, health
/donate	DonatePage	Donation form with tiered amounts
/transparency	TransparencyPage	Fund allocation breakdown
/financial-accountability	TransparencyPage	Alias for transparency page
/contact	ContactPage	Contact form and information
/how-we-work	HowWeWorkPage	Methodology and approach
/emergencies	EmergenciesPage	Active crisis reporting and appeals
/news	NewsPage	Latest news, featured stories
/partner	PartnerPage	Corporate sponsorship info
/advocacy	AdvocacyPage	Policy campaigns and engagement
/safeguarding	SafeguardingPage	Child protection and ethics
/volunteer-internship	VolunteerPage	Volunteer opportunities
/legal-governance	LegalPage	Legal structure and governance
/impact	ImpactPage	Impact metrics and results
/past-projects	PastProjectsPage	Archive of completed projects

## Admin Dashboard
Route	Component	Description
/admin	AdminGate	Login gate — redirects to /admin/dashboard
/admin/:tab	AdminPage	Tab-based dashboard
Protected Routes: Admin routes are protected by AdminGate, which verifies JWT tokens stored in localStorage.

# State Management
State is managed via React Context with domain-specific providers. Each provider wraps the app at the root level in App.tsx.

Context	Purpose
LanguageContext	Current language (en / am) and translation strings
ThemeContext	Dark/light mode toggle, persisted to localStorage
AdminAuthContext	Admin authentication state and JWT token management
DonationContext	Donation records and processing state
EmergencyContext	Emergency/crisis data
NewsContext	News articles and stories
TransparencyContext	Financial transparency and reporting data
ContactContext	Contact form submissions
BeneficiaryStatsContext	Beneficiary statistics and metrics

# API Service Layer
All HTTP communication goes through a centralized Axios instance (src/services/axios.tsx) configured with:

Base URL: /api (proxied to the backend in development)

Timeout: 10 seconds

Request Interceptor: Automatically attaches JWT token from localStorage (hibret_admin_token) as a Bearer token

Response Interceptor:

401 Unauthorized — Clears stored auth data and redirects to /admin

429 Rate Limited — Logs rate-limit warnings

Network errors — Logs backend unreachable errors

# Domain API Modules
Located in src/services/api/:

Module	Handles
authApi.tsx	Admin login/logout and token management
adminApi.tsx	Admin user CRUD operations
newsApi.tsx	News article CRUD
donationApi.tsx	Donation records and processing
emergencyApi.tsx	Emergency/crisis data management
transparencyApi.tsx	Financial transparency reports
contactApi.tsx	Contact form submissions
beneficiaryStatsApi.tsx	Beneficiary statistics
auditLogApi.tsx	Admin audit log retrieval

# Internationalization (i18n)
The app supports English (en) and Amharic (am) via a custom LanguageContext. Translations are defined as a typed Record<Language, Translations> object covering all UI strings across every page.

## Usage in Components
tsx
const { t, language, setLanguage } = useLanguage();
// t.nav_donate → "Donate Now" (en) or "አሁን ይለግሱ" (am)

# Theming
Dark and light modes are implemented via Tailwind CSS's darkMode: 'class' strategy. The ThemeContext:

Reads the saved theme from localStorage on mount

Toggles the dark / light class on <html>

Persists the preference to localStorage

# Brand Colors
Defined in tailwind.config.js:

Token	Value
brand-green	#86efac
brand-green-dark	#22c55e
brand-red	#B91C1C
brand-red-dark	#991B1B
brand-white	#FFFFFF

# Performance Optimizations
The Vite build configuration (vite.config.ts) includes several optimizations:

Optimization	Description
Lazy Loading	All public page components use React.lazy() with Suspense fallback
Manual Chunk Splitting	Vendor libraries split into separate chunks
Terser Minification	Production builds strip console.* and debugger statements
Chunk Size Warning	Set at 500 KB to catch oversized bundles
Dependency Pre-bundling	Core dependencies pre-bundled for faster dev server startup

# Vendor Chunks
vendor-react — React, ReactDOM, React Router

vendor-motion — Framer Motion

vendor-lucide — Lucide icons

vendor-axios — Axios

# Linting
ESLint is configured in .eslintrc.cjs with:

eslint:recommended

@typescript-eslint/recommended

react-hooks/recommended

react-refresh plugin

Run the linter:

bash
npm run lint

# Contributing
Fork the repository

Create a feature branch: git checkout -b feature/your-feature

Commit your changes: git commit -m "Add your feature"

Push to the branch: git push origin feature/your-feature

Open a Pull Request
