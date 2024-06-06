const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parserOptions: {
    project,
  },
  env: {
    node: true,
    browser: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    ecmaVersion: "latest",
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.cjs"],
  rules: {
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
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
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
    "import/no-extraneous-dependencies": "error",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
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
  overrides: [
    {
      files: ["*.test.ts", "index.ts"],
      rules: {
        "no-restricted-imports": "off",
      },
    },
  ],
  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y",
    "@typescript-eslint/eslint-plugin",
  ],
};
