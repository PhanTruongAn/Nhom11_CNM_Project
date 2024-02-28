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
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
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
                headerTitle: "Chỉnh sửa thông tin",
              }}
              name="EditInformation"
              component={EditInformation}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
        {/* <Information /> */}
      </Provider>
    </>
  );
};
export default App;
