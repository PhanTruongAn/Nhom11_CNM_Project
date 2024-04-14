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
import {
  AntDesign,
  Ionicons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
// import ImagePicker from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import IconPickerModal from "./IconPickerModal";
import { Avatar } from "@rneui/themed";
import { useRoute } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { senderMessenger } from "../config/configSocket";
import { receiveMessenger } from "../config/configSocket";
import { retrieveMessenger } from "../config/configSocket";
import socket from "../config/configSocket";
import chatApi from "../api/chatApi";
import { lastMessenger } from "../redux/conversationSlice";
import { Pressable } from "react-native";
import { v4 as uuidv4 } from "uuid";
const ChatScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const userSender = useSelector((state) => state.userLogin.user);
  const userReceiver = route.params.user;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isIconPickerModalVisible, setIconPickerModalVisible] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState(""); // State để lưu trữ nội dung nhận được
  const [selectedMessage, setSelectedMessage] = useState(null);
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
          idMessenger: res.idMessenger,
          isDeleted: res.isDeleted,
          sender: userReceiver._id,
          text: res.text,
          receiver: userSender._id,
          createdAt: res.createdAt,
        },
      ]);
    });
    getAllChat();
  }, [socket]);

  useEffect(() => {
    socket.on("retrieveMes", (res) => {
      console.log("Res:", res);
      setMessages((prevState) => {
        const updatedMessages = prevState.map((message) => {
          if (message.idMessenger === res.idMessenger) {
            return {
              ...message,
              isDeleted: res.isDeleted,
              // text: res.text,
              // createdAt: res.createdAt,
            };
          }
          return message;
        });
        return updatedMessages;
      });
    });
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
    const data = {
      idMessenger: uuidv4(),
      sender: userSender.phone,
      receiver: userReceiver.phone,
      text: newMessage,
      createdAt: Date.now(),
    };
    if (newMessage.trim() !== "" || selectedImage) {
      setMessages([
        ...messages,
        {
          ...data,
          sender: userSender._id,
          text: newMessage,
          receiver: userReceiver._id,
          isDeleted: false,
        },
      ]);
      setNewMessage("");
      setSelectedImage(null);
    }

    senderMessenger({
      ...data,
      isDeleted: false,
    });
    const res = await chatApi.sendMessenger(data);
    console.log(res);
  };

  const handleSendWithLike = () => {
    // Tương tự như hàm handleSend, bạn có thể thêm logic xử lý khi gửi chat icon thích ở đây
    // Ví dụ: setMessages([...], setNewMessage(""), setSelectedImage(null), ...);
  };

  // Cập nhật tin nhắn được chọn khi người dùng ấn vào
  const handleSelectMessage = (messageId) => {
    if (selectedMessage === messageId) {
      // Nếu tin nhắn đã được chọn rồi, ẩn nó đi
      setSelectedMessage(null);
    } else {
      // Nếu tin nhắn chưa được chọn, hiển thị nó
      setSelectedMessage(messageId);
    }
  };
  const handleDeleteMessage = async (messageId) => {
    const updatedMessages = messages.map((message) => {
      if (message.idMessenger === messageId) {
        return { ...message, isDeleted: true };
      }
      return message;
    });
    const user = {
      idMessenger: selectedMessage,
    };
    setMessages(updatedMessages);
    const res = await chatApi.retrieveMessenger(user);
    const data = {
      ...res.DT,
      sender: userSender.phone,
      receiver: userReceiver.phone,
    };
    retrieveMessenger({ ...data });
    console.log("Data update:", res.DT);
  };
  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleSelectMessage(item.idMessenger)}>
      <View
        style={
          item.sender === userSender._id
            ? styles.sentMessage
            : styles.receivedMessage
        }
      >
        {selectedMessage === item.idMessenger && (
          <View
            style={{
              position: "absolute",
              left: -110,
              top: 30,
              backgroundColor: "#f1f1f5",
              borderRadius: 8,
              height: 25,
              width: 100,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity>
              <MaterialIcons name="delete" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="reload"
                size={20}
                color="gray"
                onPress={() => handleDeleteMessage(item.idMessenger)}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="back" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.messageContent}>
          {item.isDeleted ? "Tin nhắn đã thu hồi" : item.text}
        </Text>
        <Text style={styles.messageTime}>
          {item.isDeleted ? null : formatTime(item.createdAt)}
        </Text>
      </View>
    </Pressable>
  );

  // const headerTitle =
  // messages.length > 0 ? messages[messages.length - 1].sender : "";

  const renderBackButton = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign name="arrowleft" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{userReceiver.name}</Text>
        <TouchableOpacity style={{ position: "absolute", right: 120 }}>
          <Feather name="phone" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: "absolute", right: 66 }}>
          <Feather name="video" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: "absolute", right: 18 }}>
          <Feather name="list" size={25} color="white" />
        </TouchableOpacity>

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
          <Ionicons name="image" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconPickerButton}
          onPress={handleOpenIconPicker}
        >
          <Ionicons name="happy" size={20} color="white" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(e) => setNewMessage(e)}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          {/* <Text style={styles.sendButtonText}>Gửi</Text> */}
          <Ionicons name="send" size={20} color="white" />
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
    backgroundColor: "#c1c1bf",
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
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
    marginTop: -15,
  },
  likeButton: {
    padding: 10,
    marginLeft: "auto",
  },
  sentMessage: {
    marginTop: 15,
    alignSelf: "flex-end",
    backgroundColor: "#e5efff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    maxWidth: "50%",
  },
  receivedMessage: {
    marginTop: 15,
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    maxWidth: "50%",
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
    marginLeft: 10,
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
