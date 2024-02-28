import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
const Information = ({ navigation }) => {
  const user = useSelector((state) => state.userLogin.user);
  const danhSachTu = user.name.split(" ");
  const ho = danhSachTu[0][0].toUpperCase();
  const ten = danhSachTu[danhSachTu.length - 1][0].toUpperCase();
  const result = ho + "" + ten;
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Icon
          name="arrowleft"
          size={25}
          style={{ paddingLeft: 20, paddingTop: 20 }}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Avatar
          size={50}
          rounded
          title={result}
          containerStyle={{ backgroundColor: user.avatar.color }}
        />
        <Text style={styles.headerName}>{user.name}</Text>
      </View>
      <View style={styles.information}>
        <Text style={styles.information_title}>Thông tin cá nhân</Text>
        <View style={styles.index_container}>
          <View style={styles.custom}>
            <Text style={styles.index}>Giới tính</Text>
            <Text style={{ marginLeft: "20%", padding: 7 }}>{user.sex}</Text>
          </View>
          <View style={styles.custom}>
            <Text style={styles.index}>Ngày sinh </Text>
            <Text style={{ marginLeft: "17%", padding: 7 }}>
              {user.dateOfBirth}
            </Text>
          </View>
          <View style={styles.custom}>
            <Text style={styles.index}>Điện thoại </Text>
            <Text style={{ marginLeft: "15%", padding: 7 }}>{user.phone}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("EditInformation");
            }}
          >
            <Icon name="edit" size={20} style={styles.icon} />
            <Text
              style={{ alignSelf: "center", marginLeft: 5, fontWeight: 600 }}
            >
              Chỉnh sửa
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    width: "80%",
    height: 50,
    marginTop: 80,
    flexDirection: "row",
    marginLeft: 20,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 600,
    alignSelf: "center",
    marginLeft: 20,
  },
  information: {
    backgroundColor: "white",
    width: "100%",
    height: 280,
    marginTop: 10,
  },
  information_title: {
    fontSize: 16,
    fontWeight: 500,
    padding: 17,
  },
  index_container: {
    width: "95%",
    height: "55%",
    marginLeft: 17,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  custom: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#dadada",
  },
  index: {
    padding: 7,
  },
  button: {
    backgroundColor: "#dadada",
    width: "80%",
    height: 35,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
  },
});
