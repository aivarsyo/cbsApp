import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { authentication, database, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { ref, child, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeData, storeData } from "../entities/AsyncStorage";
import { useSelector, useDispatch } from "react-redux";
import {
  RestoreUser,
  ResetUser,
  SetUserPhoto,
} from "../store/actions/userActions";
import { useFocusEffect } from "@react-navigation/native";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
const avatar = require("../assets/avatar.png");

export default function Profile() {
  const { name, email, id, photo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  /* useFocusEffect(
    React.useCallback(() => {
      //alert('Screen was focused');
      // Do something when the screen is focused
      console.log(id)
      id == undefined ? getUserData() : console.log("state exists");
      return () => {
        //alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])) */

  useEffect(() => {
    id == undefined ? getUserData() : console.log("state exists");
  });

  const getUserData = async () => {
    try {
      // get user id from async storage
      const userID = await AsyncStorage.getItem("@user_id");
      if (userID !== null) {
        // with the user id select the user from database
        const dbRef = ref(database);
        get(child(dbRef, `users/${userID}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              //console.log(snapshot.val());
              const user = snapshot.val();
              // with data retrieved from db, set it in state

              console.log(user);
              //dispatch(RestoreUser(user, userID))
              getProfilePhoto(user, userID);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (e) {
      //alert(e);
      console.error(e);
    }
  };

  const getProfilePhoto = async (user, userID) => {
    //console.log(id)
    const storageRef = sRef(storage, "userProfileImages/" + userID + ".jpg");
    await getDownloadURL(storageRef)
      .then((photoURL) => {
        console.log(photoURL);
        dispatch(RestoreUser(user, userID, photoURL));
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            dispatch(RestoreUser(user, userID, undefined));
            break;
        }
      });
  };

  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        console.log("sign out");
        dispatch(ResetUser());
        //navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      {photo == undefined ? (
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={avatar}
        />
      ) : (
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={{ uri: photo }}
        />
      )}
      <Text>{email}</Text>
      <Text>{name}</Text>
      <Text>{id}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Edit Profile");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Edit profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOutUser} style={styles.button}>
        <Text style={styles.buttonText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
