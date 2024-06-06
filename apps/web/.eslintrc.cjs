/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@chatify/eslint-config/react.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
