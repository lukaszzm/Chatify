/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  fragment UpdatedNote on Note {\n    id\n    content\n    updatedAt\n  }\n":
    types.UpdatedNoteFragmentDoc,
  "\n  fragment ToggleLockNote on Note {\n    id\n    isLocked\n    updatedAt\n  }\n":
    types.ToggleLockNoteFragmentDoc,
  "\n  mutation RefreshToken($refreshToken: String!) {\n    refresh(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n":
    types.RefreshTokenDocument,
  "\n  mutation SignIn($data: SignInInput!) {\n    signIn(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n":
    types.SignInDocument,
  "\n  mutation SignUp($data: SignUpInput!) {\n    signUp(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n":
    types.SignUpDocument,
  "\n  mutation StartChat($data: StartChatInput!) {\n    startChat(data: $data) {\n      id\n    }\n  }\n":
    types.StartChatDocument,
  "\n  mutation CreateNote($data: CreateNoteInput!) {\n    createNote(data: $data) {\n      id\n      title\n      content\n      updatedAt\n      isLocked\n    }\n  }\n":
    types.CreateNoteDocument,
  "\n  mutation DeleteNote($noteId: String!) {\n    deleteNote(noteId: $noteId) {\n      id\n    }\n  }\n":
    types.DeleteNoteDocument,
  "\n  mutation ToggleLock($noteId: String!) {\n    toggleLock(noteId: $noteId) {\n      id\n      isLocked\n      updatedAt\n    }\n  }\n":
    types.ToggleLockDocument,
  "\n  mutation UpdateNote($noteId: String!, $content: String!) {\n    updateNote(noteId: $noteId, content: $content) {\n      id\n      content\n      updatedAt\n    }\n  }\n":
    types.UpdateNoteDocument,
  "\n  mutation SendMessage($data: SendMessageInput!) {\n    sendMessage(data: $data) {\n      id\n    }\n  }\n":
    types.SendMessageDocument,
  "\n  mutation DeleteAccount {\n    deleteAccount {\n      id\n    }\n  }\n":
    types.DeleteAccountDocument,
  "\n  mutation UpdatePassword($data: UpdatePasswordInput!) {\n    updatePassword(data: $data) {\n      id\n    }\n  }\n":
    types.UpdatePasswordDocument,
  "\n  mutation UpdateProfile($data: UpdateProfileInput!) {\n    updateProfile(data: $data) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n":
    types.UpdateProfileDocument,
  "\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      fullName\n      email\n      isActive\n    }\n  }\n":
    types.MeDocument,
  "\n  query SearchUsers($where: UserWhereInput!, $excludeMe: Boolean!) {\n    users(where: $where, excludeMe: $excludeMe) {\n      id\n      firstName\n      lastName\n    }\n  }\n":
    types.SearchUsersDocument,
  "\n  query Note($id: String!) {\n    note(id: $id) {\n      id\n      title\n      content\n      updatedAt\n      isLocked\n    }\n  }\n":
    types.NoteDocument,
  "\n  query Notes {\n    notes {\n      id\n      title\n      content\n      updatedAt\n    }\n  }\n":
    types.NotesDocument,
  "\n  query RecentChats($after: String, $first: Int) {\n    recentChats(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          id\n          type\n          participants {\n            firstName\n            lastName\n            id\n          }\n          latestMessage {\n            id\n            sender {\n              id\n              firstName\n            }\n            content\n            createdAt\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n":
    types.RecentChatsDocument,
  "\n  query Chat($id: String!) {\n    chat(id: $id) {\n      id\n      type\n      participants {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    types.ChatDocument,
  "\n  query Messages($chatId: String!, $after: String, $first: Int) {\n    messages(chatId: $chatId, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          id\n          content\n          createdAt\n          sender {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n":
    types.MessagesDocument,
  "\n  subscription ChatUpdated {\n    chatUpdated {\n      id\n      type\n      participants {\n        firstName\n        lastName\n        id\n      }\n      latestMessage {\n        id\n        sender {\n          id\n          firstName\n        }\n        content\n        createdAt\n      }\n    }\n  }\n":
    types.ChatUpdatedDocument,
  "\n  subscription MessageSent($chatId: String!) {\n    messageSent(chatId: $chatId) {\n      id\n      content\n      createdAt\n      sender {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    types.MessageSentDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpdatedNote on Note {\n    id\n    content\n    updatedAt\n  }\n"
): (typeof documents)["\n  fragment UpdatedNote on Note {\n    id\n    content\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ToggleLockNote on Note {\n    id\n    isLocked\n    updatedAt\n  }\n"
): (typeof documents)["\n  fragment ToggleLockNote on Note {\n    id\n    isLocked\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RefreshToken($refreshToken: String!) {\n    refresh(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n"
): (typeof documents)["\n  mutation RefreshToken($refreshToken: String!) {\n    refresh(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SignIn($data: SignInInput!) {\n    signIn(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n"
): (typeof documents)["\n  mutation SignIn($data: SignInInput!) {\n    signIn(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SignUp($data: SignUpInput!) {\n    signUp(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n"
): (typeof documents)["\n  mutation SignUp($data: SignUpInput!) {\n    signUp(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation StartChat($data: StartChatInput!) {\n    startChat(data: $data) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation StartChat($data: StartChatInput!) {\n    startChat(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateNote($data: CreateNoteInput!) {\n    createNote(data: $data) {\n      id\n      title\n      content\n      updatedAt\n      isLocked\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateNote($data: CreateNoteInput!) {\n    createNote(data: $data) {\n      id\n      title\n      content\n      updatedAt\n      isLocked\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteNote($noteId: String!) {\n    deleteNote(noteId: $noteId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteNote($noteId: String!) {\n    deleteNote(noteId: $noteId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ToggleLock($noteId: String!) {\n    toggleLock(noteId: $noteId) {\n      id\n      isLocked\n      updatedAt\n    }\n  }\n"
): (typeof documents)["\n  mutation ToggleLock($noteId: String!) {\n    toggleLock(noteId: $noteId) {\n      id\n      isLocked\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateNote($noteId: String!, $content: String!) {\n    updateNote(noteId: $noteId, content: $content) {\n      id\n      content\n      updatedAt\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateNote($noteId: String!, $content: String!) {\n    updateNote(noteId: $noteId, content: $content) {\n      id\n      content\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SendMessage($data: SendMessageInput!) {\n    sendMessage(data: $data) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation SendMessage($data: SendMessageInput!) {\n    sendMessage(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteAccount {\n    deleteAccount {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteAccount {\n    deleteAccount {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdatePassword($data: UpdatePasswordInput!) {\n    updatePassword(data: $data) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdatePassword($data: UpdatePasswordInput!) {\n    updatePassword(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateProfile($data: UpdateProfileInput!) {\n    updateProfile(data: $data) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateProfile($data: UpdateProfileInput!) {\n    updateProfile(data: $data) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      fullName\n      email\n      isActive\n    }\n  }\n"
): (typeof documents)["\n  query Me {\n    me {\n      id\n      firstName\n      lastName\n      fullName\n      email\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query SearchUsers($where: UserWhereInput!, $excludeMe: Boolean!) {\n    users(where: $where, excludeMe: $excludeMe) {\n      id\n      firstName\n      lastName\n    }\n  }\n"
): (typeof documents)["\n  query SearchUsers($where: UserWhereInput!, $excludeMe: Boolean!) {\n    users(where: $where, excludeMe: $excludeMe) {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Note($id: String!) {\n    note(id: $id) {\n      id\n      title\n      content\n      updatedAt\n      isLocked\n    }\n  }\n"
): (typeof documents)["\n  query Note($id: String!) {\n    note(id: $id) {\n      id\n      title\n      content\n      updatedAt\n      isLocked\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Notes {\n    notes {\n      id\n      title\n      content\n      updatedAt\n    }\n  }\n"
): (typeof documents)["\n  query Notes {\n    notes {\n      id\n      title\n      content\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query RecentChats($after: String, $first: Int) {\n    recentChats(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          id\n          type\n          participants {\n            firstName\n            lastName\n            id\n          }\n          latestMessage {\n            id\n            sender {\n              id\n              firstName\n            }\n            content\n            createdAt\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"
): (typeof documents)["\n  query RecentChats($after: String, $first: Int) {\n    recentChats(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          id\n          type\n          participants {\n            firstName\n            lastName\n            id\n          }\n          latestMessage {\n            id\n            sender {\n              id\n              firstName\n            }\n            content\n            createdAt\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Chat($id: String!) {\n    chat(id: $id) {\n      id\n      type\n      participants {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"
): (typeof documents)["\n  query Chat($id: String!) {\n    chat(id: $id) {\n      id\n      type\n      participants {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Messages($chatId: String!, $after: String, $first: Int) {\n    messages(chatId: $chatId, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          id\n          content\n          createdAt\n          sender {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"
): (typeof documents)["\n  query Messages($chatId: String!, $after: String, $first: Int) {\n    messages(chatId: $chatId, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          id\n          content\n          createdAt\n          sender {\n            id\n            firstName\n            lastName\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  subscription ChatUpdated {\n    chatUpdated {\n      id\n      type\n      participants {\n        firstName\n        lastName\n        id\n      }\n      latestMessage {\n        id\n        sender {\n          id\n          firstName\n        }\n        content\n        createdAt\n      }\n    }\n  }\n"
): (typeof documents)["\n  subscription ChatUpdated {\n    chatUpdated {\n      id\n      type\n      participants {\n        firstName\n        lastName\n        id\n      }\n      latestMessage {\n        id\n        sender {\n          id\n          firstName\n        }\n        content\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  subscription MessageSent($chatId: String!) {\n    messageSent(chatId: $chatId) {\n      id\n      content\n      createdAt\n      sender {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"
): (typeof documents)["\n  subscription MessageSent($chatId: String!) {\n    messageSent(chatId: $chatId) {\n      id\n      content\n      createdAt\n      sender {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
