/* eslint-disable @typescript-eslint/require-await */

import { authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Kind } from "graphql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { Client, fetchExchange, subscriptionExchange } from "urql";

import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
} from "@/features/auth";
import type {
  ChatUpdatedSubscription,
  CreateNoteMutation,
  DeleteNoteMutation,
  MessageSentSubscription,
  SubscriptionMessageSentArgs,
  ToggleLockMutation,
  UpdateNoteMutation,
} from "@/gql/graphql";
import { TOGGLE_LOCK_FRAGMENT, UPDATE_NOTE_FRAGMENT } from "@/lib/gql/fragments";
import { REFRESH_TOKEN_MUTATION } from "@/lib/gql/mutations";
import { MESSAGES_QUERY, NOTES_QUERY, RECENT_CHATS_QUERY } from "@/lib/gql/queries";

const gqlServerUrl = import.meta.env.VITE_API_URL + "/graphql";

const subscriptionClient = new SubscriptionClient(gqlServerUrl, {
  reconnect: true,
  connectionParams: () => {
    const accessToken = getAccessToken();
    return {
      authorization: `Bearer ${accessToken}`,
    };
  },
});

const client = new Client({
  url: gqlServerUrl,
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          createNote(result: CreateNoteMutation, _args, cache) {
            cache.updateQuery({ query: NOTES_QUERY }, (data) => {
              if (!data) {
                return null;
              }
              return {
                ...data,
                notes: [...data.notes, result.createNote],
              };
            });
          },
          deleteNote(result: DeleteNoteMutation, _args, cache) {
            cache.invalidate({ __typename: "Note", id: result.deleteNote.id });
          },
          updateNote(result: UpdateNoteMutation, _args, cache) {
            cache.writeFragment(UPDATE_NOTE_FRAGMENT, result.updateNote);
          },
          toggleLock(result: ToggleLockMutation, _args, cache) {
            cache.writeFragment(TOGGLE_LOCK_FRAGMENT, result.toggleLock);
          },
        },
        Subscription: {
          messageSent(
            result: MessageSentSubscription,
            args: SubscriptionMessageSentArgs,
            cache
          ) {
            cache.updateQuery({ query: MESSAGES_QUERY, variables: args }, (data) => {
              if (!data) {
                return null;
              }

              return {
                ...data,
                messages: [...data.messages, result.messageSent],
              };
            });
          },
          chatUpdated(result: ChatUpdatedSubscription, _args, cache) {
            let cursor;
            let query = cache.readQuery({
              query: RECENT_CHATS_QUERY,
              variables: { after: cursor },
            });

            while (query) {
              if (
                query.recentChats.edges.some(
                  (edge) => edge.node.id === result.chatUpdated.id
                )
              ) {
                cache.updateQuery(
                  {
                    query: RECENT_CHATS_QUERY,
                    variables: { after: cursor },
                  },
                  (data) => {
                    if (!data) {
                      return null;
                    }

                    const updatedEdges = data.recentChats.edges.filter(
                      (edge) => edge.node.id !== result.chatUpdated.id
                    );

                    const updatedCursor = updatedEdges.at(-1)?.cursor;

                    return {
                      ...data,
                      recentChats: {
                        ...data.recentChats,
                        edges: updatedEdges,
                        pageInfo: {
                          ...data.recentChats.pageInfo,
                          endCursor: updatedCursor,
                        },
                      },
                    };
                  }
                );

                break;
              }

              cursor = query.recentChats.pageInfo.endCursor;
              query = cache.readQuery({
                query: RECENT_CHATS_QUERY,
                variables: { after: cursor },
              });
            }

            cache.updateQuery({ query: RECENT_CHATS_QUERY }, (data) => {
              if (!data) {
                return null;
              }

              const newEdge = {
                cursor: result.chatUpdated.latestMessage.createdAt,
                node: result.chatUpdated,
                __typename: "ChatPreviewEdge" as const,
              };

              return {
                ...data,
                recentChats: {
                  ...data.recentChats,
                  edges: [newEdge, ...data.recentChats.edges],
                },
              };
            });
          },
        },
      },
    }),
    authExchange(async (utilities) => {
      let accessToken = getAccessToken();
      let refreshToken = getRefreshToken();

      return {
        addAuthToOperation(operation) {
          if (!accessToken) {
            return operation;
          }

          return utilities.appendHeaders(operation, {
            Authorization: `Bearer ${accessToken}`,
          });
        },
        didAuthError(error) {
          const unsecurePaths = ["signIn", "signUp"];

          return error.graphQLErrors.some((e) => {
            const isPathUnsecure =
              e.path?.some((path) => unsecurePaths.includes(String(path))) ?? true;
            const isUnauthenticated = e.extensions?.code === "UNAUTHENTICATED";
            return !isPathUnsecure && isUnauthenticated;
          });
        },
        willAuthError(operation) {
          accessToken = getAccessToken();
          refreshToken = getRefreshToken();

          if (!accessToken) {
            return (
              operation.kind !== "mutation" ||
              !operation.query.definitions.some((definition) => {
                return (
                  definition.kind === Kind.OPERATION_DEFINITION &&
                  definition.selectionSet.selections.some((node) => {
                    const allowedValues = ["signIn", "signUp"];
                    return (
                      node.kind === Kind.FIELD && allowedValues.includes(node.name.value)
                    );
                  })
                );
              })
            );
          }

          return false;
        },
        async refreshAuth() {
          if (refreshToken) {
            const result = await utilities.mutate(REFRESH_TOKEN_MUTATION, {
              refreshToken,
            });

            if (result.data?.refresh) {
              accessToken = result.data.refresh.accessToken;
              refreshToken = result.data.refresh.refreshToken;
              saveAuthTokens({ accessToken, refreshToken });
              return;
            }
          }

          clearAuthTokens();
          window.location.reload();
        },
      };
    }),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (request) => subscriptionClient.request(request),
    }),
  ],
});

export { client };
