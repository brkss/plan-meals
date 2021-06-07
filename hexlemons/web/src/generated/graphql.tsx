import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  status: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
};

export type Bowl = {
  __typename?: 'Bowl';
  id: Scalars['Float'];
  title: Scalars['String'];
  ticket: Scalars['String'];
  user: User;
  elements: Array<BowlElement>;
};

export type BowlElement = {
  __typename?: 'BowlElement';
  id: Scalars['Float'];
  title: Scalars['String'];
  image: Scalars['String'];
  calories: Scalars['Float'];
  category: BowlElementCategory;
  user: User;
  bowls: Bowl;
};

export type BowlElementCategory = {
  __typename?: 'BowlElementCategory';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  elements: Array<BowlElement>;
};

export type CreateBowlElementInput = {
  title: Scalars['String'];
  calories: Scalars['String'];
  category: Scalars['String'];
  image: Scalars['Upload'];
};


export type DefaultResponse = {
  __typename?: 'DefaultResponse';
  status: Scalars['Boolean'];
  message: Scalars['String'];
  errors?: Maybe<Array<Error>>;
};

export type Error = {
  __typename?: 'Error';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type LoginUserInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResponse;
  register: AuthResponse;
  createBowlElement: DefaultResponse;
};


export type MutationLoginArgs = {
  data: LoginUserInput;
};


export type MutationRegisterArgs = {
  data: RegisterUserInput;
};


export type MutationCreateBowlElementArgs = {
  data: CreateBowlElementInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me: Scalars['String'];
  helloBowl: Scalars['String'];
  bowlElementCategories: Array<BowlElementCategory>;
};

export type RegisterUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  name: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  tokenVersion: Scalars['Float'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  bowls: Bowl;
  bowlElements: Array<BowlElement>;
};

export type BowlElementCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type BowlElementCategoriesQuery = (
  { __typename?: 'Query' }
  & { bowlElementCategories: Array<(
    { __typename?: 'BowlElementCategory' }
    & Pick<BowlElementCategory, 'id' | 'title' | 'description'>
  )> }
);

export type CreateBowlElementMutationVariables = Exact<{
  title: Scalars['String'];
  calories: Scalars['String'];
  category: Scalars['String'];
  image: Scalars['Upload'];
}>;


export type CreateBowlElementMutation = (
  { __typename?: 'Mutation' }
  & { createBowlElement: (
    { __typename?: 'DefaultResponse' }
    & Pick<DefaultResponse, 'status' | 'message'>
    & { errors?: Maybe<Array<(
      { __typename?: 'Error' }
      & Pick<Error, 'field' | 'message'>
    )>> }
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LoginMutationVariables = Exact<{
  identifier: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'status' | 'accessToken' | 'message'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'status' | 'message' | 'accessToken'>
  ) }
);


export const BowlElementCategoriesDocument = gql`
    query BowlElementCategories {
  bowlElementCategories {
    id
    title
    description
  }
}
    `;

/**
 * __useBowlElementCategoriesQuery__
 *
 * To run a query within a React component, call `useBowlElementCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBowlElementCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBowlElementCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBowlElementCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<BowlElementCategoriesQuery, BowlElementCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BowlElementCategoriesQuery, BowlElementCategoriesQueryVariables>(BowlElementCategoriesDocument, options);
      }
export function useBowlElementCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BowlElementCategoriesQuery, BowlElementCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BowlElementCategoriesQuery, BowlElementCategoriesQueryVariables>(BowlElementCategoriesDocument, options);
        }
export type BowlElementCategoriesQueryHookResult = ReturnType<typeof useBowlElementCategoriesQuery>;
export type BowlElementCategoriesLazyQueryHookResult = ReturnType<typeof useBowlElementCategoriesLazyQuery>;
export type BowlElementCategoriesQueryResult = Apollo.QueryResult<BowlElementCategoriesQuery, BowlElementCategoriesQueryVariables>;
export const CreateBowlElementDocument = gql`
    mutation CreateBowlElement($title: String!, $calories: String!, $category: String!, $image: Upload!) {
  createBowlElement(
    data: {title: $title, calories: $calories, category: $category, image: $image}
  ) {
    status
    message
    errors {
      field
      message
    }
  }
}
    `;
export type CreateBowlElementMutationFn = Apollo.MutationFunction<CreateBowlElementMutation, CreateBowlElementMutationVariables>;

/**
 * __useCreateBowlElementMutation__
 *
 * To run a mutation, you first call `useCreateBowlElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBowlElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBowlElementMutation, { data, loading, error }] = useCreateBowlElementMutation({
 *   variables: {
 *      title: // value for 'title'
 *      calories: // value for 'calories'
 *      category: // value for 'category'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateBowlElementMutation(baseOptions?: Apollo.MutationHookOptions<CreateBowlElementMutation, CreateBowlElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBowlElementMutation, CreateBowlElementMutationVariables>(CreateBowlElementDocument, options);
      }
export type CreateBowlElementMutationHookResult = ReturnType<typeof useCreateBowlElementMutation>;
export type CreateBowlElementMutationResult = Apollo.MutationResult<CreateBowlElementMutation>;
export type CreateBowlElementMutationOptions = Apollo.BaseMutationOptions<CreateBowlElementMutation, CreateBowlElementMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginDocument = gql`
    mutation Login($identifier: String!, $password: String!) {
  login(data: {identifier: $identifier, password: $password}) {
    status
    accessToken
    message
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $username: String!, $password: String!) {
  register(
    data: {name: $name, email: $email, username: $username, password: $password}
  ) {
    status
    message
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;