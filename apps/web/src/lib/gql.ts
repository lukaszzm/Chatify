/* eslint-disable @typescript-eslint/require-await */

import { authExchange } from "@urql/exchange-auth";
import { Kind } from "graphql";
import type { Operation } from "urql";
import { cacheExchange, Client, fetchExchange } from "urql";

import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
} from "@/features/auth";
import { graphql } from "@/gql";

const RefreshTokenMutation = graphql(`
  mutation RefreshToken($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`);

const isLoginOperation = (operation: Operation) =>
  operation.kind !== "mutation" ||
  !operation.query.definitions.some(
    (definition) =>
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.selectionSet.selections.some(
        (node) => node.kind === Kind.FIELD && node.name.value === "login"
      )
  );

const gqlServerUrl = import.meta.env.VITE_API_URL + "/graphql";

const client = new Client({
  url: gqlServerUrl,
  exchanges: [
    cacheExchange,
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
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === "UNAUTHENTICATED"
          );
        },
        willAuthError(operation) {
          accessToken = getAccessToken();
          refreshToken = getRefreshToken();

          if (!accessToken) {
            return isLoginOperation(operation);
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
  ],
});

export { client };
