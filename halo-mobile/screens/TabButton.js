import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatListScreen from "./HomeChat";
import FriendListScreen from "./ListFriend";
import SettingsScreen from "./Setting";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="FriendListScreen"
        component={FriendListScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
