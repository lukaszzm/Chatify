/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@chatify/eslint-config/react.js"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    project: true,
  },
};
