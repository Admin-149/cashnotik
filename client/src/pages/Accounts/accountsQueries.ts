import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      amount
      id
      title
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      amount
      id
      title
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: Int!) {
    deleteAccount(id: $id) {
      id
    }
  }
`;
