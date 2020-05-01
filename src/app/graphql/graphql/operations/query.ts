import gql from "graphql-tag";

export const listBooks = gql`
  query {
    books {
      id
      name
      editorial
      registerDate
      year
      language
      author {
        id
        name
        lastname
        email
      }
    }
  }
`;
