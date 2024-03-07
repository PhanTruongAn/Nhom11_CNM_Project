import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
// import Status from "../components/body/Status";
import { COLORS, SPACING } from "../theme/theme";
import { useRoute } from "@react-navigation/core";
import { Avatar } from "@rneui/themed";
import Icon from "react-native-vector-icons/AntDesign";
import extendFunctions from "../constants/extendFunctions";
const MeScreen = ({ navigation }) => {
  const route = useRoute();
  const user = route.params;
  return (
    <ScrollView style={styles.viewParent}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          ></TouchableOpacity>
          <Image
            source={{
              uri: extendFunctions.randomImage(),
            }}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          style={{
            top: -170,
            marginLeft: 18,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrowleft" size={25} color={"white"} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerBot}>
          <View style={styles.avatar}>
            <Avatar
              size={70}
              rounded
              title={extendFunctions.getAvatarName(user.name)}
              containerStyle={{ backgroundColor: user.avatar.color }}
            />
          </View>
          <View style={styles.editProfile}>
            <TouchableOpacity>
              <Text style={styles.editProfileText}>Add friend</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerName}>
          <Text style={styles.headerNameText}>{user.name}</Text>
        </View>
        <View style={styles.headerJoined}>
          <Text>{user.dateOfBirth}</Text>
          {/* <Icon name="star-outline" size={50} color="navy" /> */}
          <Text>Joined February 2024</Text>
        </View>
      </View>
      <View style={styles.headerStatus}>
        <Text style={styles.statusText}>How do you feel, today?</Text>
      </View>
    </ScrollView>
  );
};

export default MeScreen;

const styles = StyleSheet.create({
  viewParent: {
    height: 5000,
  },
  headerStatus: {
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.primaryBlackRGBA,
  },
  statusText: {
    color: COLORS.primaryBlackHex,
    fontSize: 16,
    fontWeight: "500",
  },
  header: {
    paddingBottom: 30,
  },
  headerTop: {
    width: "100%",
    height: 190,
    backgroundColor: COLORS.primaryDarkGreyHex,
    overflow: "hidden",
  },
  headerBot: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    marginTop: -65,
    marginLeft: 18,
    overflow: "hidden",
  },
  editProfile: {
    width: 100,
    height: 36,
    borderWidth: 1,
    borderColor: COLORS.primaryDarkGreyHex,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.space_18,
  },
  editProfileText: {
    fontSize: 15,
    color: COLORS.primaryBlackHex,
    fontWeight: "bold",
  },
  headerName: {
    marginLeft: 20,
  },
  headerNameText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primaryBlackHex,
  },
  headerJoined: {
    marginLeft: 20,
    marginTop: 5,
  },
});
