import gql from 'graphql-tag';

export interface LoginData {
  accessToken: string;
}

export interface LoginVars {
  username: string;
  password: string;
}

export const LOGIN = gql`
  mutation login($input: AuthInput) {
    login(input: $input) {
      accessToken
    }
  }
`;
