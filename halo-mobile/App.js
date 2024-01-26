import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
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
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Registration /> */}
    </>
  );
};
export default App;
