import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { COLORS, SPACING } from "../../theme/theme";
// import { Icon } from 'react-native-vector-icons/Icon'
// import EditProfile from "../../screens/EditProfile";

const MeHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Image
          source={{
            uri: "https://w.forfun.com/fetch/4a/4a5ab595c061f75ca43da1f13bb05e13.jpeg",
          }}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={styles.headerBot}>
        <View style={styles.avatar}>
          <Image
            source={{
              uri: "https://c4.wallpaperflare.com/wallpaper/90/726/326/sports-fernando-torres-soccer-spain-wallpaper-preview.jpg",
            }}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <View style={styles.editProfile}>
          <Pressable>
            <Text style={styles.editProfileText}>Add friend</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.headerName}>
        <Text style={styles.headerNameText}>props.name</Text>
      </View>
      <View style={styles.headerJoined}>
        <Text>Born February 20, 2002</Text>
        {/* <Icon name="star-outline" size={50} color="navy" /> */}
        <Text>Joined February 2024</Text>
      </View>
    </View>
  );
};

export default MeHeader;

const styles = StyleSheet.create({
  header: {
    paddingBottom: 30,
  },
  headerTop: {
    width: "100%",
    height: 150,
    backgroundColor: COLORS.primaryDarkGreyHex,
    overflow: "hidden",
  },
  headerBot: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.primaryWhiteHex,
    borderRadius: 100,
    backgroundColor: COLORS.primaryLightGrayHex,
    marginTop: -50,
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
    marginTop: SPACING.space_12,
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
