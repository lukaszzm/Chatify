import { graphql } from "@/generated";

export const UPDATE_PASSWORD_MUTATION = graphql(`
  mutation UpdatePassword($data: UpdatePasswordInput!) {
    updatePassword(data: $data) {
      id
    }
  }
`);
