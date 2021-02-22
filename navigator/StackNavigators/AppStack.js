import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "../../Screens/MainApp";
import { Colors } from "../../Colors";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../../firebaseConf";

const Stack = createStackNavigator();

const customButton = (props) => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={30}
    color={Colors.PRIMARY_COLOR}
    {...props}
  />
);
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ImageShare"
        component={MainScreen}
        options={{
          headerStyle: {
            backgroundColor: "white",
            elevation: 5,
          },
          headerTitleStyle: {
            textAlign: "center",
            color: Colors.PRIMARY_COLOR,
            fontSize: 30,
          },
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={customButton}>
              <Item
                title="search"
                iconName="ios-log-out"
                onPress={() =>
                  firebase
                    .auth()
                    .signOut()
                    .then(function () {
                      // Sign-out successful.
                    })
                    .catch(function (error) {
                      alert("something went wrong ... try again");
                    })
                }
              />
            </HeaderButtons>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
