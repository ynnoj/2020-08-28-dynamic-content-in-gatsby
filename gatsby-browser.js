import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { MDXProvider } from '@mdx-js/react'
import fetch from 'isomorphic-fetch'

import './src/styles/index.css'
import Layout from './src/components/layout'

const httpLink = new HttpLink({
  uri: process.env.GATSBY_GRAPHCMS_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
  },
  fetch,
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={apolloClient}>
    <MDXProvider>{element}</MDXProvider>
  </ApolloProvider>
)

export { wrapPageElement, wrapRootElement }
