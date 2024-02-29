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

  const randomImage = () => {
    const images = [
      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709199388/Nhom11_CNM/cdi5rhhgp74ple3gmbbc.jpg",

      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709199387/Nhom11_CNM/ticao0bydhwr7acbcgjh.jpg",

      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709199387/Nhom11_CNM/tz2dlrztoarqjoml0um7.jpg",

      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709199387/Nhom11_CNM/iuhpcf7r4azzh6ust2nd.jpg",

      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709199386/Nhom11_CNM/fzdkkdsgtqkenoyvoseu.jpg",

      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709199386/Nhom11_CNM/iotnltdy8g2uykqp61uu.jpg",

      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709199386/Nhom11_CNM/fq6xzfhinkhjstvy3sym.jpg",

      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709199385/Nhom11_CNM/etehp2tbr7jaobwwn8fp.jpg",

      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709199384/Nhom11_CNM/sjlt2txlcqiz7byq1sfl.jpg",

      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709198598/Nhom11_CNM/n4lf86uufmfkc9qa4wud.jpg",
      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709200595/Nhom11_CNM/g7hs0ctih2avvds222bw.jpg",
      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709200595/Nhom11_CNM/xmrmnnmysltteyyxz8ju.jpg",
      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709200594/Nhom11_CNM/tyl5jbq0onpqgxwdtbnd.jpg",
      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709200594/Nhom11_CNM/z869adobd4meuzrji8lw.jpg",
      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709200593/Nhom11_CNM/uiuoebtfacjow06htqok.jpg",
      "https://res.cloudinary.com/dxyxfr1bj/image/upload/v1709200593/Nhom11_CNM/zga1wb9fxtsvtse5wxow.jpg",
      "",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    return randomImage;
  };

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
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            const image = randomImage();
            navigation.navigate("Information", image);
          }}
        >
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
