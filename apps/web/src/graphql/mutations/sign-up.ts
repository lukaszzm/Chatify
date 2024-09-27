import { graphql } from "@/generated";

export const SIGN_UP_MUTATION = graphql(`
  mutation SignUp($data: SignUpInput!) {
    signUp(data: $data) {
      accessToken
      refreshToken
    }
  }
`);
