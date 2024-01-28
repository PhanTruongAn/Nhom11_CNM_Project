import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import userApi from "../api/userApi";

const Login = ({ navigation }) => {
  const [showPass, setShowPass] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const handlerLogin = async () => {
    const user = {
      phone: phone,
      password: password,
    };
    if (phone !== "" && password !== "") {
      let res = await userApi.login(user);
      if (res.data.EM) {
        alert(res.data.EM);
        Alert.alert(res.data.EM);
      } else {
        alert("Đăng nhập thành công!");
        Alert.alert("Đăng nhập thành công!");
        navigation.navigate("HomeChat");
        setPhone("");
        setPassword("");
      }
    } else {
      alert("Hãy nhập đầy đủ thông tin!");
      Alert.alert("Hãy nhập đầy đủ thông tin!");
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ top: 120, marginLeft: 10 }}>
        <Text style={styles.title}>Đăng nhập</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 19,
                fontWeight: "500",
                alignSelf: "flex-start",
                marginLeft: 20,
              }}
            >
              Phone
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Icon name="phone" size={25} style={styles.icon} />
            <TextInput
              value={phone}
              onChangeText={(e) => setPhone(e)}
              style={styles.input}
              placeholder="Số điện thoại"
              placeholderTextColor="#ABABAB"
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 19,
                fontWeight: "500",
                alignSelf: "flex-start",
                marginLeft: 20,
              }}
            >
              Password
            </Text>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={25} style={styles.icon} />
              <TextInput
                value={password}
                onChangeText={(e) => setPassword(e)}
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
          <TouchableOpacity
            onPress={() => {
              // Xử lý quên mật khẩu
            }}
          >
            <Text style={styles.forgotPassword}>Quên mật khẩu ?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handlerLogin} style={styles.loginButton}>
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
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1faeeb",
    justifyContent: "center",
  },

  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "500",
  },
  formContainer: {
    width: "100%",
    height: "75%",
    marginTop: 150,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inputContainer: {
    alignSelf: "center",
    width: "90%",
    height: 50,
    borderBottomWidth: 1,
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
    color: "#1faeeb",
    marginTop: -10,
    marginLeft: 20,
  },
  loginButton: {
    width: "80%",
    height: 40,
    backgroundColor: "#1faeeb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  registerContainer: {
    marginTop: 5,
    alignSelf: "center",
    flexDirection: "row",
  },
  registerText: {
    marginLeft: 5,
    color: "#1faeeb",
  },
});

export default Login;
