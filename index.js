/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://b42-challenge.azurewebsites.net/',
  cache: new InMemoryCache(),
});

// const MainApp = () => (
//   <ApolloProvider client={apolloClient}>
//     <App client={apolloClient} />
//   </ApolloProvider>
// );

AppRegistry.registerComponent(appName, () => App);
