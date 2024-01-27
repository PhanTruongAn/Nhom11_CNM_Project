import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

const Login = ({ navigation }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Text style={styles.title}>Đăng nhập</Text>
      </View>
      <View style={styles.formContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={styles.inputContainer}>
            <Icon name="mail" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại hoặc email"
              placeholderTextColor="#ABABAB"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} style={styles.icon} />
            <TextInput
              style={styles.input}
              secureTextEntry={showPass ? false : true}
              placeholder="Mật khẩu"
              placeholderTextColor="#ABABAB"
            />
            <Icon
              onPress={() => {
                setShowPass(!showPass);
              }}
              name={showPass ? "eye" : "eye-with-line"}
              color={showPass ? "black" : "#ABABAB"}
              size={25}
              style={styles.eyeIcon}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          // Xử lý quên mật khẩu
        }}
      >
        <Text style={styles.forgotPassword}>Quên mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomeChat");
        }}
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text>Bạn chưa có tài khoản ?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Registration");
          }}
        >
          <Text style={styles.registerText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#1faeeb",
    fontSize: 35,
    fontWeight: "500",
  },
  formContainer: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    alignSelf: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ABABAB",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#ABABAB",
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 10,
    color: "#ABABAB",
  },
  eyeIcon: {
    marginRight: 10,
  },
  forgotPassword: {
    marginLeft: 90,
    color: "#1faeeb",
    marginTop: -18,
  },
  loginButton: {
    width: "70%",
    height: 40,
    backgroundColor: "#1faeeb",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  registerContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  registerText: {
    marginLeft: 5,
    color: "#1faeeb",
  },
});

export default Login;
