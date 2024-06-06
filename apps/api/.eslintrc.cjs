/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@chatify/eslint-config/nest.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "es2019",
    project: true,
  },
};
