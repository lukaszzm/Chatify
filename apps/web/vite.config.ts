/// <reference types="vitest" />

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
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
  test: {
    globalSetup: "./vitest-global-setup.ts",
  },
});
