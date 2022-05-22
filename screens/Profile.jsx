import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { authentication } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { ResetUser } from "../store/actions/userActions";
const avatar = require("../assets/avatar.png");
import RoundPhoto from "../components/general/RoundPhoto";

export default function Profile() {
  const { name, email, id, photo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        console.log("sign out");
        dispatch(ResetUser());
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView style={{ paddingHorizontal: 15, minHeight: "100%" }}>
      <View style={styles.topSection}>
        <View style={styles.topSectionRowLine}>
          <RoundPhoto source={photo == undefined ? avatar : { uri: photo }} />
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.smallText}>{email}</Text>
            <Text style={styles.smallText}>
              MSc in Business Administration and E-business
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Edit Profile");
          }}
          style={styles.editButton}
        >
          <Text style={styles.editText}>Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notificationsContainer}>
        <Text style={styles.notifTitle}>Notifications</Text>
        <View style={styles.box}>
          <View style={styles.boxTextContainer}>
            <Text style={styles.boxBigText}>Chat</Text>
            <Text style={styles.boxSmallText}>
              When you receive a new message
            </Text>
          </View>
          <Switch
            value={true}
            trackColor={{ false: "#D4D4D4", true: "#DCDDEE" }}
            thumbColor={"#5050A5"}
          />
        </View>
        <View style={styles.box}>
          <View style={styles.boxTextContainer}>
            <Text style={styles.boxBigText}>Event reminder</Text>
            <Text style={styles.boxSmallText}>
              An hour before events you are 'going to'
            </Text>
          </View>
          <Switch
            value={false}
            trackColor={{ false: "#D4D4D4", true: "#DCDDEE" }}
            thumbColor={"#ffffff"}
          />
        </View>
      </View>
      <TouchableOpacity onPress={signOutUser} style={styles.logoutButton}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topSection: {
    paddingVertical: 20,
  },
  topSectionRowLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flexShrink: 1,
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  smallText: {
    marginTop: 3,
  },
  editButton: {
    backgroundColor: "#5050A5",
    borderRadius: 5,
    paddingVertical: 11,
    alignItems: "center",
    marginTop: 17,
  },
  editText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  notificationsContainer: {
    paddingVertical: 30,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#E6E6E6",
  },
  notifTitle: {
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
    color: "#32305D",
  },
  box: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 25,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  boxBigText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
  },
  boxSmallText: {
    color: "rgb(112,112,112)",
  },
  logoutButton: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 25,
    alignItems: "center",
    marginTop: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  logoutText: {
    color: "#32305D",
    fontWeight: "bold",
    fontSize: 22,
  },
});
