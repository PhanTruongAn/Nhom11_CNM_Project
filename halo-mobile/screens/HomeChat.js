import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatListItem = ({ name, message, time, unreadCount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarPlaceholder} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.time}>{time}</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text>{unreadCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const ChatListScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <ChatListItem
        name="Tomikien - Điều Pham Quang Đức"
        message="Đã gửi một sticker"
        time="31 phút"
        unreadCount={0}
      />
      {/* Thêm các mục chat khác tại đây */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#ddd", // Màu sắc hoặc hình nền tạm thời để thay thế cho ảnh
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
