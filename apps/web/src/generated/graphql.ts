/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type Auth = {
  __typename?: "Auth";
  /** JWT access token */
  accessToken: Scalars["String"]["output"];
  /** JWT refresh token */
  refreshToken: Scalars["String"]["output"];
  user: User;
};

export type Chat = {
  __typename?: "Chat";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  isDeleted: Scalars["Boolean"]["output"];
  lastMessageAt: Scalars["DateTime"]["output"];
  messages: Array<Message>;
  participants: Array<User>;
  title?: Maybe<Scalars["String"]["output"]>;
  type: ChatType;
  updatedAt: Scalars["DateTime"]["output"];
};

export type ChatPreview = {
  __typename?: "ChatPreview";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  isDeleted: Scalars["Boolean"]["output"];
  lastMessageAt: Scalars["DateTime"]["output"];
  latestMessage: Message;
  participants: Array<User>;
  title?: Maybe<Scalars["String"]["output"]>;
  type: ChatType;
  updatedAt: Scalars["DateTime"]["output"];
};

export type ChatPreviewConnection = {
  __typename?: "ChatPreviewConnection";
  edges: Array<ChatPreviewEdge>;
  pageInfo: PageInfo;
};

export type ChatPreviewEdge = {
  __typename?: "ChatPreviewEdge";
  cursor: Scalars["String"]["output"];
  node: ChatPreview;
};

export enum ChatType {
  Group = "Group",
  OneToOne = "OneToOne",
}

export type CreateNoteInput = {
  title: Scalars["String"]["input"];
};

export type Message = {
  __typename?: "Message";
  chat: Chat;
  chatId: Scalars["ID"]["output"];
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  isDeleted: Scalars["Boolean"]["output"];
  isSeen: Scalars["Boolean"]["output"];
  sender: User;
  senderId: Scalars["ID"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type MessageConnection = {
  __typename?: "MessageConnection";
  edges: Array<MessageEdge>;
  pageInfo: PageInfo;
};

export type MessageEdge = {
  __typename?: "MessageEdge";
  cursor: Scalars["String"]["output"];
  node: Message;
};

export type Mutation = {
  __typename?: "Mutation";
  createNote: Note;
  deleteAccount: User;
  deleteNote: Note;
  refresh: Token;
  sendMessage: Message;
  signIn: Auth;
  signUp: Auth;
  startChat: Chat;
  toggleLock: Note;
  updateNote: Note;
  updatePassword: User;
  updateProfile: User;
  updateProfilePicture: User;
};

export type MutationCreateNoteArgs = {
  data: CreateNoteInput;
};

export type MutationDeleteNoteArgs = {
  noteId: Scalars["String"]["input"];
};

export type MutationRefreshArgs = {
  refreshToken: Scalars["String"]["input"];
};

export type MutationSendMessageArgs = {
  data: SendMessageInput;
};

export type MutationSignInArgs = {
  data: SignInInput;
};

export type MutationSignUpArgs = {
  data: SignUpInput;
};

export type MutationStartChatArgs = {
  data: StartChatInput;
};

export type MutationToggleLockArgs = {
  noteId: Scalars["String"]["input"];
};

export type MutationUpdateNoteArgs = {
  content: Scalars["String"]["input"];
  noteId: Scalars["String"]["input"];
};

export type MutationUpdatePasswordArgs = {
  data: UpdatePasswordInput;
};

export type MutationUpdateProfileArgs = {
  data: UpdateProfileInput;
};

export type MutationUpdateProfilePictureArgs = {
  data: UpdateProfilePictureInput;
};

export type Note = {
  __typename?: "Note";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  isLocked: Scalars["Boolean"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["String"]["output"];
};

export type NoteConnection = {
  __typename?: "NoteConnection";
  edges: Array<NoteEdge>;
  pageInfo: PageInfo;
};

export type NoteEdge = {
  __typename?: "NoteEdge";
  cursor: Scalars["String"]["output"];
  node: Note;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
};

export type Query = {
  __typename?: "Query";
  chat?: Maybe<Chat>;
  me: User;
  messages: MessageConnection;
  note?: Maybe<Note>;
  notes: NoteConnection;
  recentChats: ChatPreviewConnection;
  users: Array<User>;
};

export type QueryChatArgs = {
  id: Scalars["String"]["input"];
};

export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  chatId: Scalars["String"]["input"];
  first?: Scalars["Int"]["input"];
};

export type QueryNoteArgs = {
  id: Scalars["String"]["input"];
};

export type QueryNotesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: Scalars["Int"]["input"];
};

export type QueryRecentChatsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: Scalars["Int"]["input"];
};

export type QueryUsersArgs = {
  excludeMe?: Scalars["Boolean"]["input"];
  first?: Scalars["Int"]["input"];
  where?: InputMaybe<UserWhereInput>;
};

export type SendMessageInput = {
  chatId: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
};

export type SignInInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignUpInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type StartChatInput = {
  participants: Array<Scalars["String"]["input"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  chatUpdated: ChatPreview;
  messageSent: Message;
};

export type SubscriptionMessageSentArgs = {
  chatId: Scalars["String"]["input"];
};

export type Token = {
  __typename?: "Token";
  /** JWT access token */
  accessToken: Scalars["String"]["output"];
  /** JWT refresh token */
  refreshToken: Scalars["String"]["output"];
};

export type UpdatePasswordInput = {
  confirmPassword: Scalars["String"]["input"];
  currentPassword: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
};

export type UpdateProfileInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
};

export type UpdateProfilePictureInput = {
  file?: InputMaybe<Scalars["Upload"]["input"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  fullName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  profilePicture?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type UserWhereInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  fullName?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdatedNoteFragment = {
  __typename?: "Note";
  id: string;
  content: string;
  isLocked: boolean;
  updatedAt: string;
} & { " $fragmentName"?: "UpdatedNoteFragment" };

export type UserInfoFragment = {
  __typename?: "User";
  id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string | null;
} & { " $fragmentName"?: "UserInfoFragment" };

export type CreateNoteMutationVariables = Exact<{
  data: CreateNoteInput;
}>;

export type CreateNoteMutation = {
  __typename?: "Mutation";
  createNote: {
    __typename?: "Note";
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isLocked: boolean;
  };
};

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never }>;

export type DeleteAccountMutation = {
  __typename?: "Mutation";
  deleteAccount: { __typename?: "User"; id: string };
};

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars["String"]["input"];
}>;

export type DeleteNoteMutation = {
  __typename?: "Mutation";
  deleteNote: { __typename?: "Note"; id: string };
};

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars["String"]["input"];
}>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refresh: { __typename?: "Token"; accessToken: string; refreshToken: string };
};

export type SendMessageMutationVariables = Exact<{
  data: SendMessageInput;
}>;

export type SendMessageMutation = {
  __typename?: "Mutation";
  sendMessage: { __typename?: "Message"; id: string };
};

export type SignInMutationVariables = Exact<{
  data: SignInInput;
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: { __typename?: "Auth"; accessToken: string; refreshToken: string };
};

export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: { __typename?: "Auth"; accessToken: string; refreshToken: string };
};

export type StartChatMutationVariables = Exact<{
  data: StartChatInput;
}>;

export type StartChatMutation = {
  __typename?: "Mutation";
  startChat: { __typename?: "Chat"; id: string };
};

export type ToggleLockMutationVariables = Exact<{
  noteId: Scalars["String"]["input"];
}>;

export type ToggleLockMutation = {
  __typename?: "Mutation";
  toggleLock: {
    __typename?: "Note";
    id: string;
    content: string;
    isLocked: boolean;
    updatedAt: string;
  };
};

export type UpdateNoteMutationVariables = Exact<{
  noteId: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
}>;

export type UpdateNoteMutation = {
  __typename?: "Mutation";
  updateNote: {
    __typename?: "Note";
    id: string;
    content: string;
    isLocked: boolean;
    updatedAt: string;
  };
};

export type UpdatePasswordMutationVariables = Exact<{
  data: UpdatePasswordInput;
}>;

export type UpdatePasswordMutation = {
  __typename?: "Mutation";
  updatePassword: { __typename?: "User"; id: string };
};

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateProfileInput;
}>;

export type UpdateProfileMutation = {
  __typename?: "Mutation";
  updateProfile: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type UpdateProfilePictureMutationVariables = Exact<{
  data: UpdateProfilePictureInput;
}>;

export type UpdateProfilePictureMutation = {
  __typename?: "Mutation";
  updateProfilePicture: {
    __typename?: "User";
    id: string;
    profilePicture?: string | null;
  };
};

export type ChatQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type ChatQuery = {
  __typename?: "Query";
  chat?: {
    __typename?: "Chat";
    id: string;
    type: ChatType;
    participants: Array<{
      __typename?: "User";
      id: string;
      profilePicture?: string | null;
      firstName: string;
      lastName: string;
    }>;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string | null;
    fullName: string;
    email: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export type MessagesQueryVariables = Exact<{
  chatId: Scalars["String"]["input"];
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type MessagesQuery = {
  __typename?: "Query";
  messages: {
    __typename?: "MessageConnection";
    edges: Array<{
      __typename?: "MessageEdge";
      cursor: string;
      node: {
        __typename?: "Message";
        id: string;
        content: string;
        createdAt: string;
        sender: {
          __typename?: "User";
          id: string;
          profilePicture?: string | null;
          firstName: string;
          lastName: string;
        };
      };
    }>;
    pageInfo: {
      __typename?: "PageInfo";
      endCursor?: string | null;
      hasNextPage: boolean;
    };
  };
};

export type NoteQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type NoteQuery = {
  __typename?: "Query";
  note?: {
    __typename?: "Note";
    id: string;
    title: string;
    content: string;
    updatedAt: string;
    isLocked: boolean;
  } | null;
};

export type NotesQueryVariables = Exact<{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type NotesQuery = {
  __typename?: "Query";
  notes: {
    __typename?: "NoteConnection";
    edges: Array<{
      __typename?: "NoteEdge";
      cursor: string;
      node: {
        __typename?: "Note";
        id: string;
        title: string;
        content: string;
        updatedAt: string;
      };
    }>;
    pageInfo: {
      __typename?: "PageInfo";
      endCursor?: string | null;
      hasNextPage: boolean;
    };
  };
};

export type RecentChatsQueryVariables = Exact<{
  after?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type RecentChatsQuery = {
  __typename?: "Query";
  recentChats: {
    __typename?: "ChatPreviewConnection";
    edges: Array<{
      __typename?: "ChatPreviewEdge";
      cursor: string;
      node: {
        __typename?: "ChatPreview";
        id: string;
        type: ChatType;
        participants: Array<{
          __typename?: "User";
          firstName: string;
          lastName: string;
          profilePicture?: string | null;
          id: string;
        }>;
        latestMessage: {
          __typename?: "Message";
          id: string;
          content: string;
          createdAt: string;
          sender: { __typename?: "User"; id: string; firstName: string };
        };
      };
    }>;
    pageInfo: {
      __typename?: "PageInfo";
      endCursor?: string | null;
      hasNextPage: boolean;
    };
  };
};

export type SearchUsersQueryVariables = Exact<{
  where: UserWhereInput;
  excludeMe: Scalars["Boolean"]["input"];
}>;

export type SearchUsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: string;
    profilePicture?: string | null;
    firstName: string;
    lastName: string;
  }>;
};

export type ChatUpdatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ChatUpdatedSubscription = {
  __typename?: "Subscription";
  chatUpdated: {
    __typename?: "ChatPreview";
    id: string;
    type: ChatType;
    participants: Array<{
      __typename?: "User";
      firstName: string;
      lastName: string;
      profilePicture?: string | null;
      id: string;
    }>;
    latestMessage: {
      __typename?: "Message";
      id: string;
      content: string;
      createdAt: string;
      sender: { __typename?: "User"; id: string; firstName: string };
    };
  };
};

export type MessageSentSubscriptionVariables = Exact<{
  chatId: Scalars["String"]["input"];
}>;

export type MessageSentSubscription = {
  __typename?: "Subscription";
  messageSent: {
    __typename?: "Message";
    id: string;
    content: string;
    createdAt: string;
    sender: {
      __typename?: "User";
      id: string;
      profilePicture?: string | null;
      firstName: string;
      lastName: string;
    };
  };
};

export const UpdatedNoteFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdatedNote" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Note" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
          { kind: "Field", name: { kind: "Name", value: "isLocked" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatedNoteFragment, unknown>;
export const UserInfoFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserInfo" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "firstName" } },
          { kind: "Field", name: { kind: "Name", value: "lastName" } },
          { kind: "Field", name: { kind: "Name", value: "profilePicture" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoFragment, unknown>;
export const CreateNoteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateNote" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateNoteInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createNote" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "data" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "isLocked" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateNoteMutation, CreateNoteMutationVariables>;
export const DeleteAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteAccount" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAccount" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DeleteNoteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteNote" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "noteId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteNote" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "noteId" },
                value: { kind: "Variable", name: { kind: "Name", value: "noteId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const RefreshTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RefreshToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "refreshToken" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "refresh" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "refreshToken" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "refreshToken" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                { kind: "Field", name: { kind: "Name", value: "refreshToken" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const SendMessageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SendMessage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SendMessageInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendMessage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "data" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const SignInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignIn" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SignInInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signIn" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "data" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                { kind: "Field", name: { kind: "Name", value: "refreshToken" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SignUpInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signUp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "data" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                { kind: "Field", name: { kind: "Name", value: "refreshToken" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const StartChatDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StartChat" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "StartChatInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "startChat" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "data" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StartChatMutation, StartChatMutationVariables>;
export const ToggleLockDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ToggleLock" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "noteId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "toggleLock" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "noteId" },
                value: { kind: "Variable", name: { kind: "Name", value: "noteId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "isLocked" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ToggleLockMutation, ToggleLockMutationVariables>;
export const UpdateNoteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateNote" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "noteId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "content" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateNote" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "noteId" },
                value: { kind: "Variable", name: { kind: "Name", value: "noteId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "content" },
                value: { kind: "Variable", name: { kind: "Name", value: "content" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "isLocked" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateNoteMutation, UpdateNoteMutationVariables>;
export const UpdatePasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdatePasswordInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "data" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateProfileInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "data" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateProfilePictureDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProfilePicture" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateProfilePictureInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProfilePicture" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: { kind: "Variable", name: { kind: "Name", value: "data" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "profilePicture" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateProfilePictureMutation,
  UpdateProfilePictureMutationVariables
>;
export const ChatDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Chat" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "chat" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "participants" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "profilePicture" } },
                      { kind: "Field", name: { kind: "Name", value: "firstName" } },
                      { kind: "Field", name: { kind: "Name", value: "lastName" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChatQuery, ChatQueryVariables>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "profilePicture" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "isActive" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MessagesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Messages" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "chatId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "messages" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "chatId" },
                value: { kind: "Variable", name: { kind: "Name", value: "chatId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "content" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "sender" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "profilePicture" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "firstName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "lastName" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessagesQuery, MessagesQueryVariables>;
export const NoteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Note" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "note" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "isLocked" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NoteQuery, NoteQueryVariables>;
export const NotesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Notes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "notes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "content" } },
                            { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NotesQuery, NotesQueryVariables>;
export const RecentChatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RecentChats" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "recentChats" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "type" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "participants" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "firstName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "lastName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "profilePicture" },
                                  },
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "latestMessage" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "sender" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "firstName" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "content" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "createdAt" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RecentChatsQuery, RecentChatsQueryVariables>;
export const SearchUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SearchUsers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "where" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UserWhereInput" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "excludeMe" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: { kind: "Variable", name: { kind: "Name", value: "where" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "excludeMe" },
                value: { kind: "Variable", name: { kind: "Name", value: "excludeMe" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "profilePicture" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const ChatUpdatedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "ChatUpdated" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "chatUpdated" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "participants" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "firstName" } },
                      { kind: "Field", name: { kind: "Name", value: "lastName" } },
                      { kind: "Field", name: { kind: "Name", value: "profilePicture" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "latestMessage" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sender" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "firstName" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                      { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChatUpdatedSubscription, ChatUpdatedSubscriptionVariables>;
export const MessageSentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "MessageSent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "chatId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "messageSent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "chatId" },
                value: { kind: "Variable", name: { kind: "Name", value: "chatId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sender" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "profilePicture" } },
                      { kind: "Field", name: { kind: "Name", value: "firstName" } },
                      { kind: "Field", name: { kind: "Name", value: "lastName" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageSentSubscription, MessageSentSubscriptionVariables>;
