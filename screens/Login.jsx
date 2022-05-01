import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { authentication } from "../firebase";
  import {
    onAuthStateChanged,
    signInWithEmailAndPassword
  } from "firebase/auth";
  import { useNavigation } from "@react-navigation/core";
  import {storeData} from '../entities/AsyncStorage';
  
  const Login = () => {
    const [email, setEmail] = useState("");
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
  
    const handleLogin = () => {
      signInWithEmailAndPassword(authentication, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with", user.email);
          storeData('@user_id', user.uid)
        })
        .catch((error) => alert(error.message));
    };
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default Login;
  
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
  });
  