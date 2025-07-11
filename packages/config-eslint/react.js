import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import { baseConfig } from "./base.js";

/** @type {import("eslint").Linter.Config[]} */
export const reactConfig = [
  ...baseConfig,
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-debugger": "warn",
      "no-warning-comments": "warn",
      "object-shorthand": "error",
      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["acc", "next"],
        },
      ],
      "react/prop-types": "off",
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "@typescript-eslint/no-misused-promises": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link", "NextLink", "RouterLink"],
          aspects: ["invalidHref"],
        },
      ],
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
            {
              pattern: "@ui/**",
              group: "internal",
            },
            {
              pattern: "@lib/**",
              group: "internal",
            },
            {
              pattern: "@hooks/**",
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
      "import/no-extraneous-dependencies": "error",
      "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
      "import/no-unresolved": "off",
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
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "**/index.{ts,tsx}"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
];
