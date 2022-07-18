import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      username
      token
    }
  }
`;