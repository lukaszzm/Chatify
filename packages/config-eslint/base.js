import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import importPlugin from "eslint-plugin-import";

/** @type {import("eslint").Linter.Config[]} */
export const baseConfig = [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
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
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
