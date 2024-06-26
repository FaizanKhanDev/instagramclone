import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import Router from './src/navigation/Router';
import store from './src/redux/store';
const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="black" />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
