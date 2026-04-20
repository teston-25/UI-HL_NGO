# HL NGO Frontend

A modern React + Vite + TypeScript frontend for the HL NGO project, designed to support donations, news, emergency reporting, transparency, and admin management.

## Key Features

- Responsive, component-driven UI built with React and Tailwind CSS
- Admin dashboard with authentication, reporting, and management screens
- Content pages for programs, impact, advocacy, transparency, and volunteering
- Client-side routing with `react-router-dom`
- API integration using `axios`
- Animations and interactive UX powered by `framer-motion`
- Map support via `react-leaflet` and `leaflet`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Framer Motion
- React Leaflet

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm available in your terminal

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local development server URL shown in the console to view the app.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` — Start the Vite development server
- `npm run build` — Build the production bundle
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint across the project

## Project Structure

- `src/` — Application source code
- `src/pages/` — Page-level components
- `src/components/` — Shared UI components
- `src/context/` — React context providers
- `src/services/` — API service layer
- `src/hooks/` — Custom React hooks

## Notes

- This repository is focused on the frontend implementation for the HL NGO application.
- Update API endpoints and environment configuration as needed for your backend integration.
