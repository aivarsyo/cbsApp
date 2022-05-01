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

export default function Menu() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // do the function every time "menu" is opened
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
      return unsubscribe;
    });
  }, [navigation]);

  const getUserData = async () => {
    try {
      // get user id from async storage
      const value = await AsyncStorage.getItem("@user_id");
      if (value !== null) {
        // with the user id select the user from database
        const dbRef = ref(database);
        get(child(dbRef, `users/${value}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              //console.log(snapshot.val());
              const data = snapshot.val();
              // with data retrieved from db, set it in variables
              setUserEmail(data.email);
              setUserName(data.name);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (e) {
      // error reading value
      alert(e);
    }
  };

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
      <Text>{userEmail}</Text>
      <Text>{userName}</Text>
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
