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
  "\n  mutation SignIn($data: SignInInput!) {\n    signIn(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n":
    types.SignInDocument,
  "\n  mutation SignUp($data: SignUpInput!) {\n    signUp(data: $data) {\n      accessToken\n      refreshToken\n    }\n  }\n":
    types.SignUpDocument,
  "\n  query RecentChats {\n    recentChats {\n      id\n      recentMessage {\n        content\n        createdAt\n        sender {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n":
    types.RecentChatsDocument,
  "\n  mutation CreateNote($data: CreateNoteInput!) {\n    createNote(data: $data) {\n      id\n    }\n  }\n":
    types.CreateNoteDocument,
  "\n  mutation DeleteNote($noteId: String!) {\n    deleteNote(noteId: $noteId) {\n      id\n    }\n  }\n":
    types.DeleteNoteDocument,
  "\n  query Note($noteId: String!) {\n    note(noteId: $noteId) {\n      id\n      title\n      content\n      updatedAt\n      isLocked\n    }\n  }\n":
    types.NoteDocument,
  "\n  query Notes {\n    notes {\n      id\n      title\n      content\n      updatedAt\n    }\n  }\n":
    types.NotesDocument,
  "\n  mutation ToggleLock($noteId: String!) {\n    toggleLock(noteId: $noteId) {\n      id\n    }\n  }\n":
    types.ToggleLockDocument,
  "\n  mutation UpdateNote($noteId: String!, $content: String!) {\n    updateNote(noteId: $noteId, content: $content) {\n      id\n    }\n  }\n":
    types.UpdateNoteDocument,
  "\n  mutation SearchUsers($data: SearchUsersInput!) {\n    searchUsers(data: $data) {\n      id\n      firstName\n      lastName\n    }\n  }\n":
    types.SearchUsersDocument,
  "\n  mutation RefreshToken($refreshToken: String!) {\n    refresh(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n":
    types.RefreshTokenDocument,
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
  source: "\n  query RecentChats {\n    recentChats {\n      id\n      recentMessage {\n        content\n        createdAt\n        sender {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query RecentChats {\n    recentChats {\n      id\n      recentMessage {\n        content\n        createdAt\n        sender {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateNote($data: CreateNoteInput!) {\n    createNote(data: $data) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateNote($data: CreateNoteInput!) {\n    createNote(data: $data) {\n      id\n    }\n  }\n"];
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
  source: "\n  query Note($noteId: String!) {\n    note(noteId: $noteId) {\n      id\n      title\n      content\n      updatedAt\n      isLocked\n    }\n  }\n"
): (typeof documents)["\n  query Note($noteId: String!) {\n    note(noteId: $noteId) {\n      id\n      title\n      content\n      updatedAt\n      isLocked\n    }\n  }\n"];
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
  source: "\n  mutation ToggleLock($noteId: String!) {\n    toggleLock(noteId: $noteId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation ToggleLock($noteId: String!) {\n    toggleLock(noteId: $noteId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateNote($noteId: String!, $content: String!) {\n    updateNote(noteId: $noteId, content: $content) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateNote($noteId: String!, $content: String!) {\n    updateNote(noteId: $noteId, content: $content) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SearchUsers($data: SearchUsersInput!) {\n    searchUsers(data: $data) {\n      id\n      firstName\n      lastName\n    }\n  }\n"
): (typeof documents)["\n  mutation SearchUsers($data: SearchUsersInput!) {\n    searchUsers(data: $data) {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RefreshToken($refreshToken: String!) {\n    refresh(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n"
): (typeof documents)["\n  mutation RefreshToken($refreshToken: String!) {\n    refresh(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
