import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import eslintNestJs from "@darraghor/eslint-plugin-nestjs-typed";
import globals from "globals";
import { baseConfig } from "./base.js";
import { resolve } from "node:path";

const project = resolve(import.meta.dirname, "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
export const nestConfig = tseslint.config(
  ...baseConfig,
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintConfigPrettier,
  tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
  },
  eslintNestJs.configs.flatRecommended,
  {
    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@/**",
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
      "no-unused-vars": "off",
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
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-misused-spread": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["*.test.ts", "index.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  }
);
