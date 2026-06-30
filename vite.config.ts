import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const githubPagesBase =
  process.env.GITHUB_REPOSITORY === "miramarrow/ai-olegovna-site"
    ? "/ai-olegovna-site/"
    : "/";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: process.env.VITE_BASE_PATH ?? githubPagesBase,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
