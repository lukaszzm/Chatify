const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ["only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: [".*.js", "node_modules/", "dist/", ".eslintrc.js"],
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-extraneous-class": "off",
    "no-console": [
      "warn",
      {
        allow: ["error"],
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
};
