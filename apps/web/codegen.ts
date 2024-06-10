import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/src/schema.gql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
