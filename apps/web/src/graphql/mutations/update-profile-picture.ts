import { graphql } from "@/generated";

export const UPDATE_PROFILE_PICTURE_MUTATION = graphql(`
  mutation UpdateProfilePicture($data: UpdateProfilePictureInput!) {
    updateProfilePicture(data: $data) {
      id
      profilePicture
    }
  }
`);
