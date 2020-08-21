import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type TAccount = {
  __typename?: 'Account';
  amount: Scalars['Float'];
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type TQuery = {
  __typename?: 'Query';
  account?: Maybe<TAccount>;
  accounts: Array<Maybe<TAccount>>;
  categories: Array<Maybe<TCategory>>;
  category?: Maybe<TCategory>;
  me?: Maybe<TUser>;
  operation?: Maybe<TOperation>;
  operations?: Maybe<Array<Maybe<TOperation>>>;
};


export type TQueryAccountArgs = {
  id: Scalars['Int'];
};


export type TQueryCategoryArgs = {
  id: Scalars['Int'];
};


export type TQueryOperationArgs = {
  id: Scalars['Int'];
};

export type TCreateAccountInput = {
  amount: Scalars['Float'];
  title: Scalars['String'];
};

export type TUpdateAccountInput = {
  amount?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type TMutation = {
  __typename?: 'Mutation';
  createAccount: TAccount;
  createCategory: TCategory;
  createOperation: TOperation;
  deleteAccount: TAccount;
  deleteCategory: TCategory;
  deleteOperation: TOperation;
  updateAccount: TAccount;
  updateCategory: TCategory;
  updateOperation: TOperation;
};


export type TMutationCreateAccountArgs = {
  input: TCreateAccountInput;
};


export type TMutationCreateCategoryArgs = {
  input: TCreateCategoryInput;
};


export type TMutationCreateOperationArgs = {
  params: TCreateOperationInput;
};


export type TMutationDeleteAccountArgs = {
  id: Scalars['Int'];
};


export type TMutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};


export type TMutationDeleteOperationArgs = {
  id: Scalars['Int'];
};


export type TMutationUpdateAccountArgs = {
  input: TUpdateAccountInput;
};


export type TMutationUpdateCategoryArgs = {
  input: TUpdateCategoryInput;
};


export type TMutationUpdateOperationArgs = {
  params: TUpdateOperationInput;
};

export type TUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type TAccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
};

export type TCategory = {
  __typename?: 'Category';
  icon?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  operations: Array<Maybe<TOperation>>;
  title: Scalars['String'];
};

export type TCreateCategoryInput = {
  icon: Scalars['String'];
  title: Scalars['String'];
};

export type TUpdateCategoryInput = {
  id: Scalars['Int'];
  icon?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type TOperation = {
  __typename?: 'Operation';
  id: Scalars['Int'];
  amount: Scalars['Int'];
  date: Scalars['Date'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  title?: Maybe<Scalars['String']>;
};

export type TCreateOperationInput = {
  accountId: Scalars['Int'];
  amount: Scalars['Int'];
  categoryId: Scalars['Int'];
  date: Scalars['Date'];
  title: Scalars['String'];
};

export type TUpdateOperationInput = {
  accountId?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['Date']>;
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};


export type TGetAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type TGetAccountsQuery = (
  { __typename?: 'Query' }
  & { accounts: Array<Maybe<(
    { __typename?: 'Account' }
    & Pick<TAccount, 'amount' | 'id' | 'title'>
  )>> }
);

export type TCreateAccountMutationVariables = Exact<{
  input: TCreateAccountInput;
}>;


export type TCreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'Account' }
    & Pick<TAccount, 'amount' | 'id' | 'title'>
  ) }
);

export type TDeleteAccountMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TDeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & { deleteAccount: (
    { __typename?: 'Account' }
    & Pick<TAccount, 'id'>
  ) }
);


export const GetAccountsDocument = gql`
    query GetAccounts {
  accounts {
    amount
    id
    title
  }
}
    `;

/**
 * __useGetAccountsQuery__
 *
 * To run a query within a React component, call `useGetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountsQuery(baseOptions?: Apollo.QueryHookOptions<TGetAccountsQuery, TGetAccountsQueryVariables>) {
        return Apollo.useQuery<TGetAccountsQuery, TGetAccountsQueryVariables>(GetAccountsDocument, baseOptions);
      }
export function useGetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TGetAccountsQuery, TGetAccountsQueryVariables>) {
          return Apollo.useLazyQuery<TGetAccountsQuery, TGetAccountsQueryVariables>(GetAccountsDocument, baseOptions);
        }
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>;
export type GetAccountsLazyQueryHookResult = ReturnType<typeof useGetAccountsLazyQuery>;
export type GetAccountsQueryResult = Apollo.QueryResult<TGetAccountsQuery, TGetAccountsQueryVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    amount
    id
    title
  }
}
    `;
export type TCreateAccountMutationFn = Apollo.MutationFunction<TCreateAccountMutation, TCreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<TCreateAccountMutation, TCreateAccountMutationVariables>) {
        return Apollo.useMutation<TCreateAccountMutation, TCreateAccountMutationVariables>(CreateAccountDocument, baseOptions);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<TCreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<TCreateAccountMutation, TCreateAccountMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($id: Int!) {
  deleteAccount(id: $id) {
    id
  }
}
    `;
export type TDeleteAccountMutationFn = Apollo.MutationFunction<TDeleteAccountMutation, TDeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<TDeleteAccountMutation, TDeleteAccountMutationVariables>) {
        return Apollo.useMutation<TDeleteAccountMutation, TDeleteAccountMutationVariables>(DeleteAccountDocument, baseOptions);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<TDeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<TDeleteAccountMutation, TDeleteAccountMutationVariables>;