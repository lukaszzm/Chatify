const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
    "plugin:import/recommended",
    "plugin:@darraghor/nestjs-typed/recommended",
  ],
  parserOptions: {
    project,
  },
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".eslintrc.cjs",
    "*.config.js",
    "*.gen.ts",
  ],
  rules: {
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "$/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: [
          ["builtin", "external"],
          ["internal"],
          ["parent", "sibling", "index"],
          "unknown",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": "error",
    "no-restricted-imports": [
      "error",
      {
        patterns: [".*"],
      },
    ],
  },
  overrides: [
    {
      files: ["*.test.ts", "index.ts"],
      rules: {
        "no-restricted-imports": "off",
      },
    },
  ],
  plugins: ["@darraghor/nestjs-typed", "@typescript-eslint/eslint-plugin"],
};
