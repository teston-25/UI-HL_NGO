import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Enable rollup optimizations
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-lucide": ["lucide-react"],
          "vendor-axios": ["axios"],
          "vendor-leaflet": ["leaflet", "react-leaflet"],
        },
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
    ],
  },
  // Server configuration
  server: {
    port: 3000,
    strictPort: false,
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:5000",
        target: "https://backend-hl-org.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Preview configuration
  preview: {
    port: 4173,
  },
});
