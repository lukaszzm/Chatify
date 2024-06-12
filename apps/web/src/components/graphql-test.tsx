import { useQuery } from "urql";

import { graphql } from "@/gql";

const GetMeQuery = graphql(`
  query GetMe {
    me {
      firstName
    }
  }
`);

export const GraphQLTest = () => {
  const [result] = useQuery({
    query: GetMeQuery,
  });
  const { data, fetching, error } = result;

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <p>Hello, {data?.me?.firstName}!</p>;
};
