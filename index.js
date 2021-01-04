/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';

const MainApp = () => (
    <App />
);

AppRegistry.registerComponent(appName, () => MainApp);
