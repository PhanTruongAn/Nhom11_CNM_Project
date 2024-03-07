import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import extendFunctions from "../constants/extendFunctions";
import { Avatar } from "@rneui/themed";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.user);

  // Hàm tách lấy 2 chữ cái đầu họ và tên

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Avatar
          size={80}
          rounded
          title={extendFunctions.getAvatarName(user.name)}
          containerStyle={{ backgroundColor: user.avatar.color }}
        />
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* Settings Sections */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            const image = extendFunctions.randomImage();
            navigation.navigate("Information", image);
          }}
        >
          <View style={styles.itemContainer}>
            <Ionicons
              name="person"
              size={24}
              color="#2B4F6D"
              style={styles.icon}
            />
            <Text style={styles.itemText}>Edit Profile</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#2B4F6D"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("OtpScreen");
          }}
          style={styles.item}
        >
          <View style={styles.itemContainer}>
            <Ionicons
              name="key"
              size={24}
              color="#2B4F6D"
              style={styles.icon}
            />
            <Text style={styles.itemText}>Change Password</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#2B4F6D"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.item}>
          <View style={styles.itemContainer}>
            <Ionicons
              name="log-out"
              size={24}
              color="#2B4F6D"
              style={styles.icon}
            />
            <Text style={styles.itemText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B4F6D",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between", // Đảm bảo biểu tượng ">" nằm ở phía bên phải
    alignItems: "center",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    borderBottomColor: "red",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    alignSelf: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SettingsScreen;
