import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './Application';
import { ChakraProvider } from "@chakra-ui/react"
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from 'apollo-link';
import { getAccessToken, SetAccessToken } from './helpers/constants/token';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(operation => {
          const token = getAccessToken();
          if(token){
            operation.setContext({
              headers: {
                authorization: `bearer ${token}` 
              }
            })
          }
          
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);


const link : any = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if(!token) return true ;
    try {
      const {exp} = jwtDecode(token) as any;
      if(Date.now() >= exp * 1000){
        return false
      }
      return true;
    }catch{
      return false
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_user_token", {
      method: "POST",
      credentials: "include"
    });
  },
  handleFetch: accessToken => {
    SetAccessToken(accessToken);
  },
  handleError: err => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  }
});

const client : any  = new ApolloClient({
  link: ApolloLink.from([
    link,
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include"
    })
  ]),
  cache
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Application />
      </ChakraProvider>
    </ApolloProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
