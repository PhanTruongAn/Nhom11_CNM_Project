import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@rneui/themed";
import extendFunctions from "../constants/extendFunctions";
import friendApi from "../api/friendApi";
import { updateUser } from "../redux/userSlice";
const Tab = createMaterialTopTabNavigator();

const FriendListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const friendsData = [
    { id: "1", name: "Friend 1" },
    { id: "2", name: "Friend 2" },
    // ... more friends
  ];

  const groupsData = [
    { id: "1", name: "Group 1" },
    { id: "2", name: "Group 2" },
    // ... more groups
  ];

  const filteredFriendsData = friendsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroupsData = groupsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  const onFocusSearch = () => {
    navigation.navigate("SearchScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={onFocusSearch}
        >
          <Ionicons
            name="search"
            size={24}
            color="white"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons
                name="close-circle"
                size={24}
                color="black"
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "darkblue",
          inactiveTintColor: "#555",
          labelStyle: { fontWeight: "bold" },
          indicatorStyle: { backgroundColor: "lightblue" },
          style: { backgroundColor: "#eee", borderRadius: 5 },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Friends") {
              iconName = "people";
            } else if (route.name === "Groups") {
              iconName = "business";
            } else if (route.name === "Friend Request") {
              iconName = "people-circle";
            } else if (route.name === "Add Friend") {
              iconName = "list";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={20} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Friends" component={FriendListComponent} />
        <Tab.Screen name="Add Friend" component={FriendRequestComponent} />
        <Tab.Screen name="Friend Request" component={AddFriendComponent} />
        <Tab.Screen name="Groups" component={GroupListComponent} />
      </Tab.Navigator>
    </View>
  );
};

const FriendListComponent = () => {
  const user = useSelector((state) => state.userLogin.user);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={user.friends}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <View>
            <Avatar
              size={50}
              rounded
              title={extendFunctions.getAvatarName(item.name)}
              containerStyle={{ backgroundColor: item.avatar.color }}
            />
          </View>
          <Text style={styles.itemText}>{item.name}</Text>
          <TouchableOpacity
            style={{
              width: 70,
              height: 40,
              justifyContent: "center",
              backgroundColor: "red",
              borderRadius: 10,
              position: "absolute",
              right: 10,
            }}
            onPress={async () => {
              const data = {
                phoneSender: user.phone,
                phoneReceiver: item.phone,
              };
              const req = await friendApi.deleteFriend(data);
              console.log("CheckReq:", req);
              dispatch(updateUser(req.DT));
            }}
          >
            <Text style={{ fontSize: 16, alignSelf: "center", color: "white" }}>
              Xóa bạn
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
const AddFriendComponent = () => {
  const user = useSelector((state) => state.userLogin.user);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={user.friendRequests}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <View>
            <Avatar
              size={50}
              rounded
              title={extendFunctions.getAvatarName(item.name)}
              containerStyle={{ backgroundColor: item.avatar.color }}
            />
          </View>
          <Text style={styles.itemText}>{item.name}</Text>
          <TouchableOpacity
            style={{
              width: 80,
              height: 30,
              justifyContent: "center",
              backgroundColor: "green",
              borderRadius: 10,
              position: "absolute",
              right: 70,
            }}
            onPress={async () => {
              const data = {
                phoneSender: user.phone,
                phoneReceiver: item.phone,
              };
              const req = await friendApi.confirmAddFriend(data);
              console.log("CheckReq:", req);
              dispatch(updateUser(req.DT));
            }}
          >
            <Text style={{ fontSize: 15, alignSelf: "center", color: "white" }}>
              Chấp nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 50,
              height: 30,
              justifyContent: "center",
              backgroundColor: "red",
              borderRadius: 10,
              position: "absolute",
              right: 10,
            }}
            onPress={async () => {
              const data = {
                phoneSender: user.phone,
                phoneReceiver: item.phone,
              };
              const req = await friendApi.cancelAddFriendByReceiver(data);
              dispatch(updateUser(req.DT));
            }}
          >
            <Text style={{ fontSize: 15, alignSelf: "center", color: "white" }}>
              Hủy
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
const FriendRequestComponent = () => {
  const user = useSelector((state) => state.userLogin.user);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={user.sendFriendRequests}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <View>
            <Avatar
              size={50}
              rounded
              title={extendFunctions.getAvatarName(item.name)}
              containerStyle={{ backgroundColor: item.avatar.color }}
            />
          </View>
          <Text style={styles.itemText}>{item.name}</Text>
          <TouchableOpacity
            style={{
              width: 70,
              height: 40,
              justifyContent: "center",
              backgroundColor: "red",
              borderRadius: 10,
              position: "absolute",
              right: 10,
            }}
            onPress={async () => {
              const data = {
                phoneSender: user.phone,
                phoneReceiver: item.phone,
              };
              const req = await friendApi.cancelAddFriend(data);
              dispatch(updateUser(req.DT));
            }}
          >
            <Text style={{ fontSize: 16, alignSelf: "center", color: "white" }}>
              Hủy bỏ
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const GroupListComponent = () => {
  const groupsData = [
    { id: "1", name: "Group 1" },
    { id: "2", name: "Group 2" },
    // ... more groups
  ];

  return (
    <FlatList
      data={groupsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Ionicons name="people" size={24} color="black" style={styles.icon} />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
});

export default FriendListScreen;
