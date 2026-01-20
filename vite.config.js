import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
  server: {
    port: 3000, // ← change this to your desired port
    strictPort: true, // optional: fails if port is in use
    proxy: {
      // any request starting with /api will be proxied to the backend
      "/api": {
        target: "http://localhost:4000", // your backend
        changeOrigin: true,
        secure: false, // if using HTTPS backend
      },
    },
  },
});
