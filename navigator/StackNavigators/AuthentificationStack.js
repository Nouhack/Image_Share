import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignIn from '../../Screens/Sign_In';
import SignUp from '../../Screens/Sign_Up'

const Stack = createStackNavigator();

const AuthentificationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthentificationStack;
