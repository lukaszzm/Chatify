import { graphql } from "@/generated";

export const SIGN_IN_MUTATION = graphql(`
  mutation SignIn($data: SignInInput!) {
    signIn(data: $data) {
      accessToken
      refreshToken
    }
  }
`);
