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
import { Avatar } from "@rneui/themed";
const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.user);
  //Hàm tách lấy 2 chữ cái đầu họ và tên
  const layChuCaiDau = (tenDayDu) => {
    // Tách chuỗi thành mảng các từ
    const fullName = tenDayDu.split(" ");

    // Lấy chữ cái đầu của họ
    const ho = fullName[0][0].toUpperCase();

    // Lấy chữ cái đầu của tên
    const ten = fullName[fullName.length - 1][0].toUpperCase();
    // Trả về kết quả

    const result = ho + "" + ten;
    return result;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Avatar
          size={80}
          rounded
          title={layChuCaiDau(user.name)}
          containerStyle={{ backgroundColor: user.avatar.color }}
        />
        {/* <View style={styles.avatarPlaceholder} /> */}
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* Settings Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons
            name="person"
            size={24}
            color="#2B4F6D"
            style={styles.icon}
          />
          <Text style={styles.itemText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="mail" size={24} color="#2B4F6D" style={styles.icon} />
          <Text style={styles.itemText}>Change Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="key" size={24} color="#2B4F6D" style={styles.icon} />
          <Text style={styles.itemText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons
            name="log-out"
            size={24}
            color="#2B4F6D"
            style={styles.icon}
          />
          <Text style={styles.itemText}>Logout</Text>
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
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#C0C0C0", // Placeholder background color
    marginBottom: 10,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2B4F6D",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ECF0F3",
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SettingsScreen;
