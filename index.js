/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName, graphqlUrl} from './app.json';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache()
});

const MainApp = () => (
  <ApolloProvider client={apolloClient}>
    <App client={apolloClient} />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => MainApp);
