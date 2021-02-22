import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppStack from "./AppStack";
import CustomCamera from "../../Screens/Camera";
import Icon from "react-native-vector-icons/Ionicons";

import { Colors } from "../../Colors";

const Tab = createBottomTabNavigator();

const AppTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          tabStyle: {
            width: "100%",
          },
        }}
      >
        <Tab.Screen
          name="Main"
          component={AppStack}
          options={{
            tabBarIcon: () => (
              <View style={{ width: 40 }}>
                <Icon name="ios-apps" color={Colors.PRIMARY_COLOR} size={40} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Camm"
          component={CustomCamera}
          options={{
            tabBarIcon: () => (
              <View style={{ width: 40 }}>
                <Icon
                  name="ios-camera"
                  color={Colors.PRIMARY_COLOR}
                  size={40}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppTab;
