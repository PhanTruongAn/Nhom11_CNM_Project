import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatListScreen = ({ navigation }) => {
  const [chatList, setChatList] = useState([
    {
      id: "1",
      name: "Friend 1",
      message: "Hello",
      time: "12:30 PM",
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Friend 2",
      message: "Hi there",
      time: "1:45 PM",
      unreadCount: 0,
    },
    // ... more chat items
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const filteredChatList = chatList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current.clear();
  };

  const onFocusSearch = () => {
    navigation.navigate("SearchScreen");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatScreen");
      }}
      style={styles.itemContainer}
    >
      <View style={styles.avatarPlaceholder} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.searchContainer} onTouchStart={onFocusSearch}>
        <Ionicons
          name="search"
          size={24}
          color="#555"
          style={styles.searchIcon}
        />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons
              name="close-circle"
              size={24}
              color="#555"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredChatList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#3498db", // Màu xanh dương
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
  },
  searchIcon: {
    marginRight: 10,
    color: "white",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "black",
  },
  clearIcon: {
    marginLeft: 10,
    color: "black",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#ddd",
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    color: "#777",
  },
  info: {
    alignItems: "flex-end",
  },
  time: {
    color: "#777",
  },
  unreadBadge: {
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});

export default ChatListScreen;
