import { graphql } from "@/gql";

export const UPDATE_NOTE_FRAGMENT = graphql(`
  fragment UpdatedNote on Note {
    id
    content
    updatedAt
  }
`);

export const TOGGLE_LOCK_FRAGMENT = graphql(`
  fragment ToggleLockNote on Note {
    id
    isLocked
    updatedAt
  }
`);

export const USER_INFO_FRAGMENT = graphql(`
  fragment UserInfo on User {
    id
    firstName
    lastName
    profilePicture
  }
`);
