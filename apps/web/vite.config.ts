import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    chunkSizeWarningLimit: 750,
  },
  resolve: {
    alias: [
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser",
      },
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@ui",
        replacement: path.resolve(__dirname, "../../packages/ui/src"),
      },
    ],
  },
});
