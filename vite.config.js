import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://drug-house-mern-server-production.up.railway.app/",
      // "/api": "http://localhost:5000/",
    },
  },
  plugins: [react()],
});
