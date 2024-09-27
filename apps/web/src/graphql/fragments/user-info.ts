import { graphql } from "@/generated";

export const USER_INFO_FRAGMENT = graphql(`
  fragment UserInfo on User {
    id
    firstName
    lastName
    profilePicture
  }
`);
