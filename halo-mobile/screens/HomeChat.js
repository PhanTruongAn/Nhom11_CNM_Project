import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "./SearchScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, updateUser } from "../redux/userSlice";

const ChatListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false); // Flag to track if useEffect is done
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Flag to track if data is loaded from Redux
  const [chatList, setChatList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("login");
        if (data) {
          dispatch(updateUser(JSON.parse(data)));
          console.log("DataStorage:", JSON.parse(data));
        }
        setIsDataLoaded(true); // Marking data as loaded from Redux
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Lấy dữ liệu user từ Redux store chỉ khi dữ liệu đã được cập nhật
  const userLogin = useSelector((state) => {
    if (isDataLoaded) {
      return state.userLogin.user;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (userLogin !== null) {
      setIsReady(true); // Marking useEffect as done when user data is available
      setChatList(userLogin.friends);
    }
  }, [userLogin]);

  console.log("DataRedux:", userLogin);
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

  if (!isReady) {
    // Wait for useEffect to complete
    return null;
  }

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.searchContainer} onPress={onFocusSearch}>
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
      </TouchableOpacity>
      <FlatList
        data={filteredChatList}
        // keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#3498db", // Màu xanh dương
    borderRadius: 5,
    paddingHorizontal: 10,
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
    color: "white",
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
