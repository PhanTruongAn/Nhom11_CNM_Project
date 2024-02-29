import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Modal,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import ImagePicker from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import IconPickerModal from "./IconPickerModal";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", sender: "John", content: "Hello!" },
    { id: "2", sender: "You", content: "Hi there!" },
    // ... more messages
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isIconPickerModalVisible, setIconPickerModalVisible] = useState(false);

  const iconRef = useRef(null);
  const navigation = useNavigation();

  const handleImagePick = () => {
    // ImagePicker.showImagePicker((response) => {
    //   if (!response.didCancel && !response.error) {
    //     setSelectedImage(response.uri);
    //   }
    // });
  };

  const handleOpenIconPicker = () => {
    setIconPickerModalVisible(true);
  };

  const handleIconPick = (selectedIcon) => {
    // Cập nhật biểu tượng khi người dùng chọn
    // setSelectedIcon(selectedIcon);
    // setIconPickerModalVisible(false);
  };

  const handleSend = () => {
    if (newMessage.trim() !== "" || selectedImage) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          content: newMessage,
          image: selectedImage,
        },
      ]);
      setNewMessage("");
      setSelectedImage(null);
    }
  };

  const handleSendWithLike = () => {
    // Tương tự như hàm handleSend, bạn có thể thêm logic xử lý khi gửi chat icon thích ở đây
    // Ví dụ: setMessages([...], setNewMessage(""), setSelectedImage(null), ...);
  };

  const renderItem = ({ item }) => (
    <View
      style={
        item.sender === "You" ? styles.sentMessage : styles.receivedMessage
      }
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.messageImage} />
      )}

      <Text style={styles.messageContent}>{item.content}</Text>
    </View>
  );

  const headerTitle =
    messages.length > 0 ? messages[messages.length - 1].sender : "";

  const renderBackButton = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {renderBackButton()}
        <Text style={styles.headerText}>John</Text>
        <TouchableOpacity
          onPress={handleSendWithLike}
          style={styles.likeButton}
        ></TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={handleImagePick}
        >
          <Ionicons name="image" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconPickerButton}
          onPress={handleOpenIconPicker}
        >
          <Ionicons name="happy" size={24} color="white" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Gửi</Text>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isIconPickerModalVisible}
        transparent={true}
        animationType="slide"
      >
        <IconPickerModal onIconPick={handleIconPick} ref={iconRef} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  likeButton: {
    padding: 10,
    marginLeft: "auto",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#3498db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    maxWidth: "70%",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    maxWidth: "70%",
  },
  messageImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  messageContent: {
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagePickerButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#3498db",
  },
  iconPickerButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#3498db",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginRight: 10,
  },
  sendButton: {
    flexDirection: "row",
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    marginRight: 5,
  },
});

export default ChatScreen;
