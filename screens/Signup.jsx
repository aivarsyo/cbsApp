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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { ref, set } from "firebase/database";
import { storeData } from "../entities/AsyncStorage";
import {
  setUserName,
  setUserEmail,
  setUserID,
} from "../store/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

const Signup = () => {
  const { name, email, id } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(authentication, (user) => {
      if (user) {
        navigation.navigate("LoggedIn");
      }
    });
    return unsubcribe;
  });

  const handleSignup = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with", user.email);
        //console.log(email)

        set(ref(database, "users/" + user.uid), {
          name: name,
          email: email,
        });

        storeData("@user_id", user.uid);
        dispatch(setUserID(user.uid));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full name"
          value={name}
          onChangeText={(text) => dispatch(setUserName(text))}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => dispatch(setUserEmail(text))}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        ></TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={styles.userExists}
        >
          <Text>Already have a user?</Text>
          <Text>Log in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  userExists: {
    display: "flex",
    flexDirection: "row",
  },
});
