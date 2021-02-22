import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AuthStackNav from './navigator/StackNavigators/AuthentificationStack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer1';
import { useSelector } from 'react-redux';
import Container from './Container';
// You can import from local files


// or any pure javascript modules available in npm
const rootStore = createStore(reducer);

export default function App() {
  return (
    <Provider store={rootStore}> 
      <Container />
    </Provider>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
*/
