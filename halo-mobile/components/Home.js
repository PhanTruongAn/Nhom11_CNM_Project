import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View style={{ marginTop: 70 }}>
          <Text
            style={{
              color: "#1faeeb",
              fontSize: 45,
              fontWeight: 600,
            }}
          >
            HALO
          </Text>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: "#9cebfd",
          width: "100%",
          height: "30%",
          marginTop: 20,
        }}
      ></View>
      <TouchableOpacity
        style={{
          width: "55%",
          height: "8%",
          backgroundColor: "#1faeeb",
          marginTop: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
        }}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.text}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "55%",
          height: "8%",
          backgroundColor: "#c4c4c4",
          marginTop: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
        }}
        onPress={() => {
          navigation.navigate("Registration");
        }}
      >
        <Text style={styles.text}>Đăng ký</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 70 }}>
        <TouchableOpacity>
          <Text style={{ fontSize: 15, marginRight: 20 }}>Tiếng việt</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 15 }}>English</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 400,
    color: "white",
  },
});

export default Home;
