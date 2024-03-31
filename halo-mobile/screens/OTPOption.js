import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

const OTPOption = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputType, setInputType] = useState(null);

  const user = {
    phone: phoneNumber,
    email: email,
  };
  const handleEmailSubmit = () => {
    Alert.alert("Email submitted", `Email: ${email}`);
  };

  const handlePhoneSubmit = () => {
    Alert.alert("Phone number submitted", `Phone number: ${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={inputType === "email" ? styles.optionSelected : styles.option}
        onPress={() => setInputType("email")}
      >
        <Icon
          name="mail"
          size={24}
          color={inputType === "email" ? "white" : "#007bff"}
        />
        <Text
          style={
            inputType === "email"
              ? styles.optionTextSelected
              : styles.optionText
          }
        >
          Email
        </Text>
      </TouchableOpacity>

      {inputType === "email" && (
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={setEmail}
          value={email}
        />
      )}

      <TouchableOpacity
        style={
          inputType === "phoneNumber" ? styles.optionSelected : styles.option
        }
        onPress={() => setInputType("phoneNumber")}
      >
        <Icon
          name="mobile"
          size={24}
          color={inputType === "phoneNumber" ? "white" : "#007bff"}
        />
        <Text
          style={
            inputType === "phoneNumber"
              ? styles.optionTextSelected
              : styles.optionText
          }
        >
          Phone number
        </Text>
      </TouchableOpacity>

      {inputType === "phoneNumber" && (
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="phone-pad"
        />
      )}

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          navigation.navigate("OtpScreen", { user });
        }}
      >
        <Text style={styles.confirmButtonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginLeft: 10,
  },
  optionTextSelected: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OTPOption;
