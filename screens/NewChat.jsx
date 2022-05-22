import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { firestore, authentication, storage } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
  writeBatch,
  query,
  where,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import uuid from "react-native-uuid";
import { SetChatID } from "../store/actions/userActions";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
const avatar = require("../assets/avatar.png");

export default function NewChat() {
  const { name, email, id, photo } = useSelector((state) => state.userReducer);
  const [usersData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsers();
    return () => {
      setUsersData([]);
    };
  }, []);

  const createNewChat = async (receiverID, receiverName) => {
    const chatID = uuid.v4();
    const batch = writeBatch(firestore);

    const senderRef = doc(
      collection(firestore, "users/" + id + "/chatrooms"),
      chatID
    );
    batch.set(senderRef, {
      participants: [id, receiverID],
      chatID: senderRef.id,
      names: [name, receiverName],
      lastMessage: "",
      lastMessageAt: serverTimestamp(),
    });

    const receiverRef = doc(
      collection(firestore, "users/" + receiverID + "/chatrooms"),
      chatID
    );
    batch.set(receiverRef, {
      participants: [id, receiverID],
      chatID: receiverRef.id,
      names: [name, receiverName],
      lastMessage: "",
      lastMessageAt: serverTimestamp(),
    });

    // Commit the batch
    await batch.commit().then(() => {
      dispatch(SetChatID(chatID));
      navigation.navigate("Single Chat");
    });
  };

  const getUsers = async () => {
    const usersCol = collection(firestore, "users");
    const q = query(usersCol, orderBy("name"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // all users data
      const allUsers = querySnapshot.docs.map((doc) => doc.data());
      // here we tell what to do if data changes
      querySnapshot.docChanges().forEach((change) => {
        console.log(change.type);
        const data = change.doc.data();
        // if user already exists, dont load everything again
        const userExists = usersData.some((user) => user.userID == data.userID);
        if (userExists == false && change.type == "added") {
          // push new user into state
          setUsersData((prevState) => [...prevState, data]);
          // get profile photo for user
          data.userID !== id ? getProfilePhoto(data.userID) : null;
        } else if (change.type == "modified") {
          // update state with all the data
          setUsersData(allUsers);
        }
      });
    });
    return unsubscribe;
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

  const users = usersData.map((user) => {
    const photo = allUsers[user.userID];
    return user.userID !== id ? (
      <TouchableOpacity
        key={user.userID}
        style={styles.userContainer}
        onPress={() => createNewChat(user.userID, user.name)}
      >
        <Image
          key={user.userID}
          style={styles.photo}
          source={photo !== null ? { uri: allUsers[user.userID] } : avatar}
        />

        <Text style={styles.userName}>{user.name}</Text>
      </TouchableOpacity>
    ) : null;
  });

  return <ScrollView style={{ minHeight:"100%" }}>{users}</ScrollView>;
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  photo:{
    width: 60, 
    height: 60, 
    borderRadius: 50
  },
  userName:{
    fontSize:18,
    fontWeight:"bold",
    marginLeft: 10
  },
});
