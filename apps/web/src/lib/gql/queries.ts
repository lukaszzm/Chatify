import { graphql } from "@/gql";

export const ME_QUERY = graphql(`
  query Me {
    me {
      id
      firstName
      lastName
      fullName
      email
      isActive
    }
  }
`);

export const SEARCH_USERS_QUERY = graphql(`
  query SearchUsers(
    $pagination: PaginationInput!
    $where: UserWhereInput!
    $excludeMe: Boolean!
  ) {
    users(where: $where, pagination: $pagination, excludeMe: $excludeMe) {
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
  query Notes {
    notes {
      id
      title
      content
      updatedAt
    }
  }
`);

export const RECENT_CHATS_QUERY = graphql(`
  query RecentChats($after: String, $first: Int) {
    recentChats(after: $after, first: $first) {
      edges {
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
  query Messages($chatId: String!) {
    messages(chatId: $chatId) {
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
`);
