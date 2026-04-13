import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Force Rollup to use package.json "main" field (dist/gsap.js) not the "exports" map
    mainFields: ["browser", "module", "main"],
    conditions: ["browser", "module", "import", "default"],
  },
  optimizeDeps: {
    include: ["gsap", "gsap/ScrollTrigger"],
  },
}));
