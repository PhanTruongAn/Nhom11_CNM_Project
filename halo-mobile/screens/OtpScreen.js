import React, { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/core";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { firebaseConfig } from "../firebase/setup";
// import firebase from "firebase/compat/app";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import userApi from "../api/userApi";
import Icon from "react-native-vector-icons/AntDesign";

const OtpScreen = ({ navigation }) => {
  const route = useRoute();
  const data = route.params.user;
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [captchaVisible, setCaptchaVisible] = useState(true);
  const recaptchaVerifier = useRef(null);
  /////////////////////

  let phone = "+84 " + data.phone.slice(1);
  const handlerSendOtp = async () => {
    // const phoneProvider = new firebase.auth.PhoneAuthProvider();
    // phoneProvider
    //   .verifyPhoneNumber(phone, recaptchaVerifier.current)
    //   .then(setVerificationId);
    // console.log("Check provider:", phoneProvider);
  };
  const handleSubmitOtp = async () => {
    // const credential = firebase.auth.PhoneAuthProvider.credential(
    //   verificationId,
    //   otp
    // );
    // firebase
    //   .auth()
    //   .signInWithCredential(credential)
    //   .then(() => {
    //     setOtp("");
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //   });
    let req = await userApi.register(data);
    alert("Đăng ký thành công!");
    Alert.alert("Đăng ký thành công!");
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.message}>
          Mã OTP đã được gửi đến email: {data.email}
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontSize: 16,
            color: "black",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          {data.phone}
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: "#1faeeb",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
          onPress={handlerSendOtp}
        >
          <Text style={styles.submitButtonText}>Gửi OTP</Text>
        </TouchableOpacity>

        {/* <View style={{ marginTop: 5 }}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
        </View> */}

        <View style={styles.otpContainer}>
          <TextInput
            onFocus={() => setCaptchaVisible(false)}
            style={styles.otpInput}
            placeholder="Nhập mã OTP"
            placeholderTextColor={"gray"}
            onChangeText={(e) => setOtp(e)}
          />
        </View>
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}></Text>
        </View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            otp.length == 6 && { backgroundColor: "#1faeeb" }, // Màu nền khác khi otp khác rỗng
          ]}
          onPress={handleSubmitOtp}
        >
          <Text style={styles.submitButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  message: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -200,
  },
  otpContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  otpInput: {
    fontSize: 16,
    fontWeight: 500,
    marginTop: 20,
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
    textAlign: "center",
    fontSize: 20,
  },
  countdownContainer: {
    marginBottom: 10,
  },
  countdownText: {
    fontSize: 16,
    color: "gray",
  },
  resendButton: {
    marginTop: 10,
  },
  resendButtonText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: "#9cebfd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default OtpScreen;
