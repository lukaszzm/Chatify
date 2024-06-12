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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type Auth = {
  __typename?: "Auth";
  /** JWT access token */
  accessToken: Scalars["String"]["output"];
  /** JWT refresh token */
  refreshToken: Scalars["String"]["output"];
  user: User;
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: Auth;
  refresh: Token;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationRefreshArgs = {
  refreshToken: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  me: User;
  user: User;
  users: Array<User>;
};

export type QueryUserArgs = {
  id: Scalars["String"]["input"];
};

export type Token = {
  __typename?: "Token";
  /** JWT access token */
  accessToken: Scalars["String"]["output"];
  /** JWT refresh token */
  refreshToken: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isActive?: Maybe<Scalars["Boolean"]["output"]>;
  lastName?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: "Query";
  me: { __typename?: "User"; firstName?: string | null };
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "Auth"; accessToken: string; refreshToken: string };
};

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars["String"]["input"];
}>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refresh: { __typename?: "Token"; accessToken: string; refreshToken: string };
};

export const GetMeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMe" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "firstName" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "LoginInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
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
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
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
