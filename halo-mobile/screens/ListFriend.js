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

const FriendListScreen = ({ navigation }) => {
  const [isFriendsTab, setFriendsTab] = useState(true);
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

  const dataToShow = isFriendsTab ? friendsData : groupsData;
  const filteredData = dataToShow.filter((item) =>
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
        <View style={styles.searchContainer} onTouchStart={onFocusSearch}>
          <Ionicons
            name="search"
            size={24}
            color="white" // Màu trắng
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
                color="black" // Màu đen
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, isFriendsTab && styles.activeTab]}
            onPress={() => setFriendsTab(true)}
          >
            <Ionicons
              name="people"
              size={24}
              color={isFriendsTab ? "darkblue" : "#555"}
            />
            <Text
              style={[styles.tabText, isFriendsTab && styles.activeTabText]}
            >
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, !isFriendsTab && styles.activeTab]}
            onPress={() => setFriendsTab(false)}
          >
            <Ionicons
              name="business"
              size={24}
              color={!isFriendsTab ? "darkblue" : "#555"}
            />
            <Text
              style={[styles.tabText, !isFriendsTab && styles.activeTabText]}
            >
              Groups
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
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
    backgroundColor: "#3498db", // Màu xanh dương đậm
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
  tabContainer: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "lightblue",
  },
  tabText: {
    color: "#555",
    fontWeight: "bold",
    marginLeft: 10,
  },
  activeTabText: {
    color: "white",
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default FriendListScreen;
