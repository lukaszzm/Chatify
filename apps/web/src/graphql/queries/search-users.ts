import { graphql } from "@/generated";

export const SEARCH_USERS_QUERY = graphql(`
  query SearchUsers($where: UserWhereInput!, $excludeMe: Boolean!) {
    users(where: $where, excludeMe: $excludeMe) {
      id
      profilePicture
      firstName
      lastName
    }
  }
`);
