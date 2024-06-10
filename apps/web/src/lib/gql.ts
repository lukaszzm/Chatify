import { cacheExchange, Client, fetchExchange } from "urql";

const client = new Client({
  url: import.meta.env.VITE_API_URL + "/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export { client };
