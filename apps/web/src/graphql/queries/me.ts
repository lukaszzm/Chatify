import { graphql } from "@/generated";

export const ME_QUERY = graphql(`
  query Me {
    me {
      id
      firstName
      lastName
      profilePicture
      fullName
      email
      isActive
      createdAt
      updatedAt
    }
  }
`);
