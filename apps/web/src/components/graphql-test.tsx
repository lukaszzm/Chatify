import { useQuery } from "@apollo/client";

import { gql } from "@/__generated__/gql";

const GET_USER = gql(/* GraphQL */ `
  query Query($id: String!) {
    user(id: $id) {
      firstName
    }
  }
`);

export const GraphQLTest = () => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { id: "clwj00yhz000059klo8di1xnz" },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return <p>Hello {data.user.firstName}!</p>;
};
