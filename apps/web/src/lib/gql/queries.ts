import { graphql } from "@/gql";

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
    }
  }
`);

export const SEARCH_USERS_QUERY = graphql(`
  query SearchUsers($where: UserWhereInput!, $excludeMe: Boolean!) {
    users(where: $where, excludeMe: $excludeMe) {
      id
      firstName
      lastName
    }
  }
`);

export const NOTE_QUERY = graphql(`
  query Note($id: String!) {
    note(id: $id) {
      id
      title
      content
      updatedAt
      isLocked
    }
  }
`);

export const NOTES_QUERY = graphql(`
  query Notes($after: String, $first: Int) {
    notes(after: $after, first: $first) {
      edges {
        cursor
        node {
          id
          title
          content
          updatedAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const RECENT_CHATS_QUERY = graphql(`
  query RecentChats($after: String, $first: Int) {
    recentChats(after: $after, first: $first) {
      edges {
        cursor
        node {
          id
          type
          participants {
            firstName
            lastName
            id
          }
          latestMessage {
            id
            sender {
              id
              firstName
            }
            content
            createdAt
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const CHAT_QUERY = graphql(`
  query Chat($id: String!) {
    chat(id: $id) {
      id
      type
      participants {
        id
        firstName
        lastName
      }
    }
  }
`);

export const MESSAGES_QUERY = graphql(`
  query Messages($chatId: String!, $after: String, $first: Int) {
    messages(chatId: $chatId, after: $after, first: $first) {
      edges {
        cursor
        node {
          id
          content
          createdAt
          sender {
            id
            firstName
            lastName
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);
