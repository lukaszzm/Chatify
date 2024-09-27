import { graphql } from "@/generated";

export const REFRESH_TOKEN_MUTATION = graphql(`
  mutation RefreshToken($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`);
