import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { useSelector, useDispatch } from "react-redux";
import { SetUserPhoto, SetUserName } from "../store/actions/userActions";
const avatar = require("../assets/avatar.png");
import { authentication, database, storage } from "../firebase";
import { ref, child, push, update } from "firebase/database";

export default function EditProfile() {
  const { name, email, id, photo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('')

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const storageRef = sRef(storage, "userProfileImages/" + id + ".jpg"); //how the image will be addressed inside the storage

      //convert image to array of bytes
      const img = await fetch(result.uri);
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes); //upload images
      await getDownloadURL(storageRef).then((photoURL) => {
        console.log(photoURL);
        dispatch(SetUserPhoto(photoURL))
      });
    }
  };

  const updateUserName = () => {
    update(ref(database, "users/" + id), {
        name: userName
      });
      dispatch(SetUserName(userName))
  }

  return (
    <View>
      <Text>Edit Profile</Text>
      <TouchableOpacity onPress={pickImage}>
        <Text>Upload</Text>
      </TouchableOpacity>
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
      <View>
      <TextInput
          placeholder="Full name"
          /* value={name} */
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        >{name}</TextInput>
        <TouchableOpacity style={styles.button} onPress={updateUserName}>
            <Text style={styles.buttonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    
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
    }
  });
