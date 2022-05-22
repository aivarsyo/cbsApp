import { View } from "react-native";
import React, { useEffect } from "react";
import { storage, firestore } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { RestoreUser } from "../store/actions/userActions";
import { ref as sRef, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

export default function CheckUser() {
  const { id } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    id == undefined ? getUserData() : null;
  });

  const getUserData = async () => {
    try {
      // get user id from async storage
      const userID = await AsyncStorage.getItem("@user_id");
      if (userID !== null) {
        // with the user id select the user from database

        const docRef = doc(firestore, "users", userID);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();
        console.log(user);

        getProfilePhoto(user, userID);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getProfilePhoto = async (user, userID) => {
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
  return <View></View>;
}
