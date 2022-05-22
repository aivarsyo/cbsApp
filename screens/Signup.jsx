import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { authentication, firestore } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { storeData } from "../entities/AsyncStorage";
import { SignupUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
const logo = require("../assets/cbs-students-logo.png");
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/general/Input";
import VioletButton from "../components/general/VioletButton";
import Logo from "../components/general/Logo";
import NavigateAccess from "../components/general/NavigateAccess";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  const handleSignup = async () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with", user.email);

        setDoc(doc(firestore, "users", user.uid), {
          name: name,
          email: email,
          userID: user.uid,
        });

        storeData("@user_id", user.uid);
        dispatch(SignupUser(name, email, user.uid));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAwareScrollView style={styles.container} extraHeight={200}>
      <Logo source={logo} bigTitle="Sign up to get access" />
      <View style={styles.allInputs}>
        <Input
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Full name"
          titleText="FULL NAME"
        />
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          titleText="E-MAIL"
        />
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="********"
          titleText="PASSWORD"
          secureTextEntry={true}
        />
      </View>
      <VioletButton onPress={handleSignup} buttonText="Get access" />
      <NavigateAccess
        onPress={() => {
          navigation.navigate("Login");
        }}
        text="Already have a user? "
        text2="Log in"
      />
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "white",
  },
  allInputs: {
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 25,
  },
});
