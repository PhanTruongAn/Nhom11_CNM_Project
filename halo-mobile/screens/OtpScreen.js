import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [inputRefs, setInputRefs] = useState([]);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      // Xử lý khi hết thời gian OTP
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (value && index < 5) {
      inputRefs[index + 1].focus();
    }
  };

  const handleResendOtp = () => {
    // Xử lý gửi lại mã OTP
    setCountdown(60); // Reset lại thời gian đếm ngược
    Alert.alert("Thông báo", "Gửi lại mã OTP thành công!");
  };

  const handleSubmitOtp = () => {
    // Xử lý xác nhận mã OTP
    Alert.alert("Thông báo", "Mã OTP đã được xác nhận!");
    // navigation.navigate("ChangePassScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={styles.backButton}
        >
          <Icon name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Nhập mã OTP</Text>
      </View>
      <Text style={styles.message}>
        Mã OTP đã được gửi đến email: quangdung@gmail.com
      </Text>
      <View style={styles.content}>
        <View style={styles.otpContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs[index] = ref;
              }}
              style={styles.otpInput}
              value={otp[index]}
              onChangeText={(value) => handleOtpChange(index, value)}
              maxLength={1}
              keyboardType="numeric"
              autoFocus={index === 0 ? true : false}
            />
          ))}
        </View>
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>
            {countdown > 0
              ? `Hết mã OTP sau ${countdown} giây`
              : "Yêu cầu mã OTP mới"}
          </Text>
        </View>
        <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
          <Text style={styles.resendButtonText}>Gửi lại mã OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitOtp}>
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
    marginTop: 10,
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
    width: 40,
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
    marginTop: 20,
    backgroundColor: "#007bff",
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
