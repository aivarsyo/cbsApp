import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { authentication, database } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { ref, child, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserName,
  setUserEmail,
  setUserID,
} from "../store/actions/userActions";

export default function Menu() {
  const { name, email, id } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    // do the function every time "menu" is opened
    const unsubscribe = navigation.addListener("focus", () => {
      //id == "" ? getUserData() : console.log("state exists");
      getUserData();
      return unsubscribe;
    });
  }, [navigation]);

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
              /* dispatch(setUserName(user.name));
              dispatch(setUserEmail(user.email));
              dispatch(setUserID(userID)); */
              //topLevelAction(user, userID)
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

  const topLevelAction = (user, userID) => dispatch => {
    return Promise.all([dispatch(setUserName(user.name)), dispatch(setUserEmail(user.email)), dispatch(setUserID(userID))])
}

  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <TouchableOpacity onPress={signOutUser} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <Text>{email}</Text>
      <Text>{name}</Text>
      <Text>{id}</Text>
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
