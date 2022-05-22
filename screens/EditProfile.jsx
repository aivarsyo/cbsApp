import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { useSelector, useDispatch } from "react-redux";
import { SetUserPhoto, SetUserName } from "../store/actions/userActions";
const avatar = require("../assets/avatar.png");
import { authentication, database, storage, firestore } from "../firebase";
import { ref, child, push, update } from "firebase/database";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import VioletButton from "../components/general/VioletButton";
import RoundPhoto from "../components/general/RoundPhoto";

export default function EditProfile() {
  const { name, email, id, photo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    /* (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })(); */
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.cancelled) {
      const storageRef = sRef(storage, "userProfileImages/" + id + ".jpg"); //how the image will be addressed inside the storage

      //convert image to array of bytes
      const img = await fetch(result.uri);
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes); //upload images
      await getDownloadURL(storageRef).then((photoURL) => {
        console.log(photoURL);
        dispatch(SetUserPhoto(photoURL));
      });
    }
  };

  const updateUserName = async () => {
    if (userName !== "") {
      const userRef = doc(firestore, "users", id);
      await updateDoc(userRef, {
        name: userName,
      });
      dispatch(SetUserName(userName));
      navigation.goBack();
    }
  };

  const checkMediaPermission = async()=>{
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else{
        pickImage()
      }
    }
  }

  return (
    <ScrollView style={{ paddingHorizontal: 15, minHeight: "100%" }}>
      <View style={styles.topSection}>
        <View style={styles.uploadContainer}>
          <Text style={styles.title}>PROFILE PICTURE</Text>
          <TouchableOpacity onPress={checkMediaPermission} style={styles.uploadButton}>
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
        <RoundPhoto source={photo == undefined ? avatar : { uri: photo }} />
      </View>
      <View style={{ marginTop: 45 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>WHAT IS YOUR NAME?</Text>
          <TextInput
            placeholder="Full name"
            placeholderTextColor="rgba(35,35,35, 0.2)"
            onChangeText={(text) => setUserName(text)}
            style={styles.input}
          >
            {name}
          </TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>STUDY PROGRAMME</Text>
          <TextInput
            placeholder="Study programme"
            placeholderTextColor="rgba(35,35,35, 0.2)"
            multiline={true}
            style={styles.input}
          >
            MSc in Business Administration and E-business
          </TextInput>
        </View>
        <VioletButton onPress={updateUserName} buttonText="Save changes" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  uploadContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  uploadButton: {
    backgroundColor: "#5050A5",
    borderRadius: 5,
    paddingVertical: 11,
    alignItems: "center",
    marginTop: 17,
    width: 170,
  },
  uploadText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  inputContainer: {
    marginBottom: 25,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    paddingVertical: 10,
    color: "#32305D",
    fontSize: 17,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
