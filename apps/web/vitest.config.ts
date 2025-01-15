import { defineConfig } from "vitest/config";
import path, { dirname } from "node:path";

export default defineConfig({
  test: {
    name: "web",
    root: "./src",
    globalSetup: "./vitest-global-setup.ts",
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/"),
    },
  },
});
