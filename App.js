import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
import { Provider } from 'react-redux';
import { store } from "./src/redux/store";



const App = () => { 
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar backgroundColor="black" />
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
