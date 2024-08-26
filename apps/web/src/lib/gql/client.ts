import { SubscriptionClient } from "subscriptions-transport-ws";
import { Client, fetchExchange, subscriptionExchange } from "urql";

import { getAccessToken } from "@/features/auth";
import { auth } from "@/lib/gql/auth-exchange";
import { cache } from "@/lib/gql/cache-exchange";

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
  fetchOptions: {
    headers: {
      "Apollo-Require-Preflight": "true",
    },
  },
  exchanges: [
    cache,
    auth,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (request) => subscriptionClient.request(request),
    }),
  ],
});

export { client };
