import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import BottomTabNavigator from "./screens/TabButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={Registration}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeChat"
            component={BottomTabNavigator}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Login /> */}
    </>
  );
};
export default App;
