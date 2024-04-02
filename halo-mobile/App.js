import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import BottomTabNavigator from "./screens/TabButton";
import ChatScreen from "./screens/Chat";
import Information from "./screens/Information";
import EditInformation from "./screens/EditInformation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SearchScreen from "./screens/SearchScreen";
import ChangePassScreen from "./screens/ChangePassScreen";
import OtpScreen from "./screens/OtpScreen";
import MeScreen from "./screens/MeScreen";
import OTPOption from "./screens/OTPOption";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
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
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="ChatScreen"
            component={ChatScreen}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="SearchScreen"
            component={SearchScreen}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Information"
            component={Information}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="EditInformation"
            component={EditInformation}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ChangePassScreen"
            component={ChangePassScreen}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              title: "Nhập mã OTP",
              headerStyle: {
                backgroundColor: "#007bff",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
            name="OtpScreen"
            component={OtpScreen}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="MeScreen"
            component={MeScreen}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              title: "Chọn loại OTP",
              headerStyle: {
                backgroundColor: "#007bff",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
            name="OTPOption"
            component={OTPOption}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Information /> */}
    </Provider>
  );
};
export default App;
