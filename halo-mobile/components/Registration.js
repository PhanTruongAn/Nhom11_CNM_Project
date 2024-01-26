import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import userApi from "../api/userApi";
const Registration = ({ navigation }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setConfirmShowPass] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handlerRegis = async () => {
    const user = {
      name: name,
      phone: phone,
      email: email,
      password: password,
    };
    if (password != "" || password === confirmPass) {
      try {
        await userApi.register(user);
        navigation.navigate("Login");
        alert("Đăng ký thành công!");
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Mật khẩu xác nhận không đúng!");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ marginTop: 80 }}>
        <Text style={{ color: "#1faeeb", fontSize: 30, fontWeight: "500" }}>
          Đăng ký
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 150,
          // backgroundColor: "#9cebfd",
          marginTop: 120,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            width: "70%",
            height: "35%",
            borderWidth: 1,
            borderRadius: 5,
            borderStyle: "solid",
            borderColor: "#ABABAB",
          }}
        >
          <TextInput
            value={name}
            onChangeText={(e) => setName(e)}
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#ABABAB",
              marginLeft: 10,
              marginTop: 15,
              outlineStyle: "none",
            }}
            placeholder="Họ và tên"
          ></TextInput>
        </View>
        <View
          style={{
            marginTop: 20,
            alignSelf: "center",
            width: "70%",
            height: "35%",
            borderWidth: 1,
            borderRadius: 5,
            borderStyle: "solid",
            borderColor: "#ABABAB",
          }}
        >
          <TextInput
            value={phone}
            onChangeText={(e) => setPhone(e)}
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#ABABAB",
              marginLeft: 10,
              marginTop: 15,
              outlineStyle: "none",
            }}
            placeholder="Số điện thoại"
          ></TextInput>
        </View>
        <View
          style={{
            marginTop: 20,
            alignSelf: "center",
            width: "70%",
            height: "35%",
            borderWidth: 1,
            borderRadius: 5,
            borderStyle: "solid",
            borderColor: "#ABABAB",
          }}
        >
          <TextInput
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#ABABAB",
              marginLeft: 10,
              marginTop: 15,
              outlineStyle: "none",
            }}
            placeholder="Email"
          ></TextInput>
        </View>
        <View
          style={{
            marginTop: 20,
            alignSelf: "center",
            width: "70%",
            height: "35%",
            borderWidth: 1,
            borderRadius: 5,
            borderStyle: "solid",
            borderColor: "#ABABAB",
          }}
        >
          <TextInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#ABABAB",
              marginLeft: 10,
              marginTop: 15,
              outlineStyle: "none",
            }}
            secureTextEntry={showPass ? false : true}
            placeholder="Mật khẩu"
          ></TextInput>
          <Icon
            onPress={() => {
              setShowPass(!showPass);
            }}
            name={showPass ? "eye" : "eye-with-line"}
            size={25}
            style={{ alignSelf: "flex-end", marginTop: -23, marginRight: 10 }}
          ></Icon>
        </View>
        <View
          style={{
            marginTop: 20,
            alignSelf: "center",
            width: "70%",
            height: "35%",
            borderWidth: 1,
            borderRadius: 5,
            borderStyle: "solid",
            borderColor: "#ABABAB",
          }}
        >
          <TextInput
            onChangeText={(e) => setConfirmPass(e)}
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#ABABAB",
              marginLeft: 10,
              marginTop: 15,
              outlineStyle: "none",
            }}
            secureTextEntry={showConfirmPass ? false : true}
            placeholder="Xác nhận mật khẩu"
          ></TextInput>
          <Icon
            onPress={() => {
              setConfirmShowPass(!showConfirmPass);
            }}
            name={showConfirmPass ? "eye" : "eye-with-line"}
            size={25}
            style={{ alignSelf: "flex-end", marginTop: -23, marginRight: 10 }}
          ></Icon>
        </View>
      </View>
      <TouchableOpacity
        onPress={handlerRegis}
        style={{
          width: "60%",
          height: 48,
          backgroundColor: "#1faeeb",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 130,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: 500 }}>
          Đăng ký
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Text>Bạn đã có tài khoản ?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ marginLeft: 5, color: "#1faeeb" }}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({});
