import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FriendListScreen = ({ navigation }) => {
  const [isFriendsTab, setFriendsTab] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const fadeAnim = new Animated.Value(0);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

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

  fadeIn();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View
          style={{
            ...styles.searchContainer,
            opacity: fadeAnim,
            transform: [{ perspective: 1000 }, { rotateX: "20deg" }],
          }}
        >
          <Ionicons
            name="search"
            size={24}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </Animated.View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              isFriendsTab && styles.activeTab,
              {
                opacity: fadeAnim,
                transform: [{ perspective: 1000 }, { rotateX: "20deg" }],
              },
            ]}
            onPress={() => setFriendsTab(true)}
          >
            <Ionicons
              name="people"
              size={24}
              color={isFriendsTab ? "white" : "#555"}
            />
            <Text
              style={[styles.tabText, isFriendsTab && styles.activeTabText]}
            >
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              !isFriendsTab && styles.activeTab,
              {
                opacity: fadeAnim,
                transform: [{ perspective: 1000 }, { rotateX: "20deg" }],
              },
            ]}
            onPress={() => setFriendsTab(false)}
          >
            <Ionicons
              name="business"
              size={24}
              color={!isFriendsTab ? "white" : "#555"}
            />
            <Text
              style={[styles.tabText, !isFriendsTab && styles.activeTabText]}
            >
              Groups
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ perspective: 1000 }, { rotateX: "20deg" }],
        }}
      >
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
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
    backgroundColor: "#eee",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
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
  listContainer: {
    flex: 1,
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
