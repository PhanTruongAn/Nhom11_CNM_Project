import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
const Login = ({ navigation }) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ marginTop: 80 }}>
        <Text style={{ color: "#1faeeb", fontSize: 30, fontWeight: "500" }}>
          Đăng nhập
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 150,
          // backgroundColor: "#9cebfd",
          marginTop: 30,
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
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#ABABAB",
              marginLeft: 10,
              marginTop: 15,
              outlineStyle: "none",
            }}
            placeholder="Số điện thoại hoặc email"
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
      </View>
      <TouchableOpacity>
        <View>
          <Text
            style={{
              marginLeft: 90,
              color: "#1faeeb",
            }}
          >
            Quên mật khẩu
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "60%",
          height: 48,
          backgroundColor: "#1faeeb",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: 500 }}>
          Đăng nhập
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Text>Bạn chưa có tài khoản ?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Registration");
          }}
        >
          <Text style={{ marginLeft: 5, color: "#1faeeb" }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

// const styles = StyleSheet.create({});
