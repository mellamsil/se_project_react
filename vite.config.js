import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Single, clean export
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      // Use '@' or 'src' as alias – choose only one
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {}, // Prevents process.env errors
  },
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
    // Vite uses Connect under the hood, this is the proper SPA fallback
    historyApiFallback: true,
    proxy: {
      "/items": "http://localhost:3001",
      "/signin": "http://localhost:3001",
      "/signup": "http://localhost:3001",
      // Add more API routes here as needed
    },
  },
  build: {
    outDir: "dist",
  },
});
