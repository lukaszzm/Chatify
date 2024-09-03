/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@chatify/eslint-config/react.js"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [".eslintrc.cjs", "vite.config.ts", "codegen.ts", "tailwind.config.ts"],
  parserOptions: {
    project: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
