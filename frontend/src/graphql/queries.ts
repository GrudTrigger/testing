import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($skip: Int = 0, $limit: Int = 10, $filter: UsersFilterInput) {
    users(skip: $skip, limit: $limit, filter: $filter) {
      id
      email
      name
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      name
    }
  }
`;
