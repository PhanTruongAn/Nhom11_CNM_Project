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
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Friends" component={FriendListComponent} />
        <Tab.Screen name="Groups" component={GroupListComponent} />
      </Tab.Navigator>
    </View>
  );
};

const FriendListComponent = () => {
  const friendsData = [
    { id: "1", name: "Friend 1" },
    { id: "2", name: "Friend 2" },
    // ... more friends
  ];

  return (
    <FlatList
      data={friendsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
          <Ionicons name="person" size={24} color="black" style={styles.icon} />
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.itemContainer}>
          <Ionicons name="people" size={24} color="black" style={styles.icon} />
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
});

export default FriendListScreen;
