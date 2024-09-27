import { graphql } from "@/generated";

export const UPDATE_PROFILE_INFO_MUTATION = graphql(`
  mutation UpdateProfileInfo($data: UpdateProfileInfoInput!) {
    updateInfo(data: $data) {
      id
      firstName
      lastName
    }
  }
`);
