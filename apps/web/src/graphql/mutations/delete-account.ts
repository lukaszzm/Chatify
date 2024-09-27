import { graphql } from "@/generated";

export const DELETE_ACCOUNT_MUTATION = graphql(`
  mutation DeleteAccount {
    deleteAccount {
      id
    }
  }
`);
