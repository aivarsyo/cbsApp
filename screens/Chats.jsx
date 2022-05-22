import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { SetChatID } from "../store/actions/userActions";
import { SetUserPhotos } from "../store/actions/photosActions";
import Ionicons from "react-native-vector-icons/Ionicons";
const avatar = require("../assets/avatar.png");
import { authentication, database, storage, firestore } from "../firebase";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";

export default function Chats() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { name, email, id, photo, chatID } = useSelector(
    (state) => state.userReducer
  );
  const [chatroomsData, setChatroomsData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getChatrooms();
    /* return () => {
      setChatroomsData([]);
      setAllUsers([]);
    }; */
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("New Chat");
          }}
        >
          <Ionicons
            name="create-outline"
            style={{ fontSize: 30, color: "#5050A5" }}
          ></Ionicons>
        </TouchableOpacity>
      ),
    });
  });

  const openChat = (chatID) => {
    dispatch(SetChatID(chatID));
    navigation.navigate("Single Chat");
  };

  const getProfilePhoto = (userID) => {
    const storageRef = sRef(storage, "userProfileImages/" + userID + ".jpg");
    getDownloadURL(storageRef)
      .then((photoURL) => {
        // get profile photo for this user and push it to the state
        setAllUsers((prevState) => ({ ...prevState, [userID]: photoURL }));
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            // if user doesn't have a photo, still push it to object, but with value null
            setAllUsers((prevState) => ({ ...prevState, [userID]: null }));
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log("unauthorized");
            break;
          case "storage/canceled":
            // User canceled the upload
            console.log("upload cancelled");
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            console.log("unknown error");
            break;
        }
      });
  };

  const getChatrooms = async () => {
    const chatroomsCol = collection(firestore, "users/" + id + "/chatrooms");
    const q = query(chatroomsCol, orderBy("lastMessageAt", "desc"));

    // if there are changes in db, do operations
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // all chatrooms for this user
      const allChats = querySnapshot.docs.map((doc) => doc.data());
      // here we tell what to do if data changes
      querySnapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        // if chat already exists, dont load everything again
        const chatExists = chatroomsData.some(
          (chat) => chat.chatID == data.chatID
        );
        if (chatExists == false && change.type == "added") {
          // push new chat into state
          setChatroomsData((prevState) => [...prevState, data]);
          // get profile photo for participant
          data.participants.map((participant) => {
            participant !== id ? getProfilePhoto(participant) : null;
          });
        } else if (change.type == "modified") {
          // update state with all the data
          setChatroomsData(allChats);
        }
      });
    });
    return unsubscribe;
  };

  ///////////////////////////////////////////
  // go through the data of this chatroom & place variables in DOM //

  const chats = chatroomsData.map((chat) => {
    if (chat.lastMessageAt) {
      // last message's time and make it nice looking
      const time = chat.lastMessageAt
        .toDate()
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      // last message's date and make it nice looking
      const date = chat.lastMessageAt
        .toDate()
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
      // today's date for the user at that moment to compare
      const today = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
      const message = chat.lastMessage.slice(0, 35);
      return (
        <TouchableOpacity
          key={chat.chatID}
          style={styles.conversationContainer}
          onPress={() => openChat(chat.chatID)}
        >
          <View style={styles.leftSideContainer}>
            {chat.participants.map((participant) => {
              if (participant !== id) {
                const photo = allUsers[participant];
                return (
                  <Image
                    key={participant}
                    style={styles.photo}
                    source={photo == null ? avatar : { uri: photo }}
                  />
                );
              }
            })}
            <View style={styles.textContainer}>
              {chat.names.map((participant) =>
                participant !== name ? (
                  <Text key={participant} style={styles.userName}>
                    {participant}
                  </Text>
                ) : null
              )}
              <Text style={styles.lastMessage}>
                {chat.lastMessage.length > 22 ? message + "..." : message}
              </Text>
            </View>
          </View>
          <Text>{today == date ? time : date}</Text>
        </TouchableOpacity>
      );
    }
  });

  //////////////////////////////////////////////////////////

  return (
    <View>
      {chatroomsData == "" ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40%",
          }}
        >
          <Text style={{ fontSize: 17, maxWidth: "50%", textAlign: "center" }}>
            No conversations have been started yet
          </Text>
        </View>
      ) : (
        <ScrollView style={{ minHeight: "100%" }}>{chats}</ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  conversationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  leftSideContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  textContainer: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 15,
  },
});
