import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const ChangePassScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleSavePassword = () => {
    // Kiểm tra mật khẩu mới và mật khẩu nhập lại có khớp nhau không
    if (newPassword !== confirmNewPassword) {
      alert("Mật khẩu mới không khớp. Vui lòng nhập lại.");
      return;
    }
    // Thực hiện xử lý lưu mật khẩu
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    // Đặt lại trạng thái của các trường sau khi lưu mật khẩu thành công
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <Icon name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Đổi mật khẩu</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Mật khẩu cũ"
            secureTextEntry={!showOldPassword}
            style={styles.input}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowOldPassword(!showOldPassword)}
          >
            <Icon
              name={showOldPassword ? "eye" : "eyeo"}
              size={20}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Mật khẩu mới"
            secureTextEntry={!showNewPassword}
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Icon
              name={showNewPassword ? "eye" : "eyeo"}
              size={20}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry={!showConfirmNewPassword}
            style={styles.input}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
          >
            <Icon
              name={showConfirmNewPassword ? "eye" : "eyeo"}
              size={20}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  backButton: {
    paddingHorizontal: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  button: {
    backgroundColor: "#007bff",
    width: "80%",
    height: 35,
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 12,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: 600,
    alignSelf: "center",
  },
});
export default ChangePassScreen;
