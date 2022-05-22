import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { authentication } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { storeData } from "../entities/AsyncStorage";
const logo = require("../assets/cbs-students-logo.png");
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/general/Input";
import VioletButton from "../components/general/VioletButton";
import Logo from "../components/general/Logo";
import NavigateAccess from "../components/general/NavigateAccess";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with", user.email);
        storeData("@user_id", user.uid);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAwareScrollView style={styles.container} extraHeight={200}>
      <Logo source={logo} bigTitle="Log in" />
      <View style={styles.allInputs}>
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
      <VioletButton onPress={handleLogin} buttonText="Log in" />
      <NavigateAccess
        onPress={() => {
          navigation.navigate("Signup");
        }}
        text="Don't have an account? "
        text2="Sign up"
      />
    </KeyboardAwareScrollView>
  );
};

export default Login;

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
