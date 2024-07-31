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
import { graphql } from "@/gql";
import type { CreateNoteMutation, DeleteNoteMutation } from "@/gql/graphql";
import { NOTES_QUERY } from "@/lib/gql/queries";

const RefreshTokenMutation = graphql(`
  mutation RefreshToken($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`);

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
          createNote(result, _args, cache) {
            const newData = result as CreateNoteMutation;

            cache.updateQuery({ query: NOTES_QUERY }, (data) => {
              data?.notes.unshift(newData.createNote);
              return data;
            });
          },
          deleteNote(result, _args, cache) {
            const deletedData = result as DeleteNoteMutation;
            cache.invalidate({ __typename: "Note", id: deletedData.deleteNote.id });
          },
          updateNote(_result, _args, _cache) {
            //  Implement cache update for updateNote mutation
          },
          toggleLock(_result, _args, _cache) {
            //  Implement cache update for toggleLock mutation
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
            const result = await utilities.mutate(RefreshTokenMutation, {
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
