import { graphql } from "@/generated";

export const UPDATE_PROFILE_INFO_MUTATION = graphql(`
  mutation UpdateProfile($data: UpdateProfileInput!) {
    updateProfile(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`);
