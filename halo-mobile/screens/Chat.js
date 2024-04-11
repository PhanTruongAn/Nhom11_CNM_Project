import React, { useState, useRef, useEffect } from "react";
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
import { useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { senderMessenger } from "../config/configSocket";
import { receiveMessenger } from "../config/configSocket";
import socket from "../config/configSocket";
import chatApi from "../api/chatApi";
const ChatScreen = () => {
  const userSender = useSelector((state) => state.userLogin.user);

  const route = useRoute();
  const userReceiver = route.params.user;
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isIconPickerModalVisible, setIconPickerModalVisible] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState(""); // State để lưu trữ nội dung nhận được
  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };
  console.log("Messages:", messages);
  const getAllChat = async () => {
    const data = {
      sender: userSender.phone,
      receiver: userReceiver.phone,
    };
    const res = await chatApi.getAllChat(data);
    setMessages(res.DT);
  };
  useEffect(() => {
    socket.on("receiveMessenger", (res) => {
      console.log("Res:", res);
      setMessages((prevState) => [
        ...prevState,
        {
          sender: userReceiver.name,
          text: res.text,
          receiver: userSender.name,
          createdAt: res.createdAt,
        },
      ]);
    });
    getAllChat();
  }, [socket]);

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

  const handleSend = async () => {
    if (newMessage.trim() !== "" || selectedImage) {
      setMessages([
        ...messages,
        {
          _id: messages.length + 1,
          sender: userSender._id,
          text: newMessage,
          receiver: userReceiver._id,
          createdAt: Date.now(),
        },
      ]);
      setNewMessage("");
      setSelectedImage(null);
    }
    const data = {
      sender: userSender.phone,
      receiver: userReceiver.phone,
      text: newMessage,
      createdAt: Date.now(),
    };
    senderMessenger({
      sender: data.sender,
      receiver: data.receiver,
      text: data.text,
      createdAt: data.createdAt,
    });
    const res = await chatApi.sendMessenger(data);
    console.log(res);
  };

  const handleSendWithLike = () => {
    // Tương tự như hàm handleSend, bạn có thể thêm logic xử lý khi gửi chat icon thích ở đây
    // Ví dụ: setMessages([...], setNewMessage(""), setSelectedImage(null), ...);
  };

  const renderItem = ({ item }) => (
    <View
      style={
        item.sender === userSender._id
          ? styles.sentMessage
          : styles.receivedMessage
      }
    >
      {/* {item.image && (
        <Image source={{ uri: item.image }} style={styles.messageImage} />
      )} */}
      <Text style={styles.messageContent}>{item.text}</Text>
      <Text style={styles.messageTime}>{formatTime(item.createdAt)}</Text>
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
        <Text style={styles.headerText}>{userReceiver.name}</Text>
        <TouchableOpacity
          onPress={handleSendWithLike}
          style={styles.likeButton}
        ></TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        // keyExtractor={(item) => item.id}
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
          onChangeText={(e) => setNewMessage(e)}
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
    backgroundColor: "#dcdfe6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingVertical: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  messageTime: {
    fontSize: 12,
    color: "gray",
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
    backgroundColor: "#e5efff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    maxWidth: "70%",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "white",
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
    fontSize: 15,
    fontWeight: "500",
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
