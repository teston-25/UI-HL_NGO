Hibret Lebego (HL NGO) — FrontendA modern, responsive Single Page Application (SPA) for the Hibret Lebego Ethiopian Charity Association, designed to facilitate humanitarian efforts through digital engagement. The platform provides public-facing pages for donations, news, emergency crisis reporting, and financial transparency, alongside a secure admin dashboard for managing NGO operations.📋 Table of ContentsTech StackArchitecture OverviewProject StructureGetting StartedEnvironment VariablesAvailable ScriptsRouting & PagesState ManagementAPI Service LayerInternationalizationThemingPerformance Optimizations🛠 Tech StackCategoryTechnologyVersionUI LibraryReact^18.3.1LanguageTypeScript^5.5.4Build ToolVite^5.2.0StylingTailwind CSS3.4.17RoutingReact Router DOM^8.26.2HTTP ClientAxios^1.13.6AnimationsFramer Motion^11.5.4IconsLucide React0.522.0MapsReact Leaflet^4.2.1🏗 Architecture OverviewThe application follows a provider-pattern architecture where global and domain-specific state is injected at the root level via nested React Context providers.Code snippetgraph TD
    subgraph "Context Providers"
        A["LanguageProvider"] --> B["ThemeProvider"]
        B --> C["ToastProvider"]
        C --> D["AdminAuthProvider"]
        D --> E["DonationProvider"]
        E --> F["EmergencyProvider"]
        F --> G["NewsProvider"]
        G --> H["TransparencyProvider"]
        H --> I["ContactProvider"]
        I --> J["BeneficiaryStatsProvider"]
    end
    J --> K["BrowserRouter"]
    
    subgraph "Layout"
        K --> L["ScrollToTop"]
        K --> M["NavbarWrapper"]
        K --> N["Main Content via Routes + Suspense"]
        K --> O["FooterWrapper"]
    end
    
    subgraph "Route Resolution"
        N --> P{"Path starts with /admin?"}
        P -- "Yes" --> Q["AdminGate -> AdminPage"]
        P -- "No" --> R["Public Page Components"]
    end
📂 Project StructurePlaintextUI-HL_NGO/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images (e.g., logo.png)
│   ├── components/          # Shared UI components
│   │   ├── admin/           # Admin-specific components
│   │   │   ├── modals/      # Admin modal dialogs
│   │   │   ├── AdminTable.tsx
│   │   │   └── StatCard.tsx
│   │   ├── AdminGate.tsx    # Auth guard for admin routes
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── Toast.tsx
│   ├── context/             # React Context providers
│   │   ├── AdminAuthContext.tsx
│   │   ├── LanguageContext.tsx  # i18n (English / Amharic)
│   │   ├── ThemeContext.tsx     # Dark / Light mode
│   │   └── ...                  # Other domain contexts
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page-level route components
│   │   ├── admin/           # Admin dashboard
│   │   │   ├── AdminLoginPage.tsx
│   │   │   └── AdminPage.tsx
│   │   ├── HomePage.tsx
│   │   └── ...              # Other public pages
│   ├── services/            # API service layer
│   │   ├── api/             # Domain-specific API modules
│   │   └── axios.tsx        # Axios instance with interceptors
│   ├── App.tsx              # Root component
│   ├── index.css            # Global styles
│   └── main.tsx             # Entry point
├── .env.example
├── tailwind.config.js
└── vite.config.ts
🚀 Getting StartedPrerequisitesNode.js: 18 or highernpm: (comes with Node.js)Backend: A running API server (default: http://127.0.0.1:5000)InstallationBash# Clone the repository
git clone https://github.com/teston-25/UI-HL_NGO.git

# Navigate to directory
cd UI-HL_NGO

# Install dependencies
npm install
Running LocallyBashnpm run dev
The development server starts at http://localhost:3000. API requests to /api/* are proxied to http://127.0.0.1:5000.🔑 Environment VariablesCopy the example file and configure as needed:Bashcp .env.example .env
VariableDescriptionVITE_ADMIN_USEROverride default admin usernameVITE_ADMIN_PASSOverride default admin password[!IMPORTANT]Never commit your .env file to version control.🛣 Routing & PagesPublic PagesRouteComponentDescription/HomePageLanding page with hero, stats, and programs/donateDonatePageDonation form with tiered amounts/transparencyTransparencyPageFund allocation breakdown/emergenciesEmergenciesPageActive crisis reporting and appeals/newsNewsPageLatest news and featured storiesAdmin DashboardRouteComponentDescription/adminAdminGateLogin gate — redirects to /admin/dashboard/admin/:tabAdminPageTab-based dashboard for site management📡 API Service LayerAll HTTP communication goes through a centralized Axios instance (src/services/axios.tsx) featuring:Base URL: /api (proxied in development).Auth Interceptor: Automatically attaches JWT token from localStorage as a Bearer token.Error Handling:401 Unauthorized: Clears auth data and redirects to login.429 Rate Limited: Logs rate-limit warnings.🌍 Internationalization (i18n)The app supports English (en) and Amharic (am) via a custom LanguageContext.TypeScriptconst { t, language, setLanguage } = useLanguage();
// Usage: t.nav_donate -> "Donate Now" or "አሁን ይለግሱ"
🎨 ThemingDark and light modes are implemented via Tailwind CSS's class strategy.Persistence: Themes are saved to and read from localStorage.Toggle: Managed via ThemeContext.⚡ Performance OptimizationsLazy Loading: Components use React.lazy() with Suspense fallbacks.Manual Chunk Splitting: Vendor libraries (React, Framer Motion, Lucide) are split into separate chunks.Terser: Production builds strip console.log and debugger statements.🤝 ContributingFork the repository.Create a feature branch: git checkout -b feature/your-feature.Commit your changes: git commit -m "Add your feature".Push to the branch: git push origin feature/your-feature.Open a Pull Request.
