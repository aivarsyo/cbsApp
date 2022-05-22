import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { firestore } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  writeBatch,
  query,
  serverTimestamp,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import uuid from "react-native-uuid";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SingleChat() {
  const navigation = useNavigation();
  const { name, id, photo, chatID } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const [receiverData, setReceiverData] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    getChatInfo();
    getMessages();
    return () => {
      setMessagesData([]);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ title: receiverData.receiverName });
  });

  const getChatInfo = async () => {
    const chatRef = doc(firestore, "users/" + id + "/chatrooms", chatID);
    const chatSnap = await getDoc(chatRef);
    const chatData = chatSnap.data();

    console.log(chatData);

    let receiverID;
    let receiverName;
    chatData.participants.map((participant) => {
      participant !== id ? (receiverID = participant) : null;
    });
    chatData.names.map((participantName) => {
      participantName !== name ? (receiverName = participantName) : null;
    });

    setReceiverData({ receiverID: receiverID, receiverName: receiverName });
  };

  const getMessages = async () => {
    const messagesCol = collection(
      firestore,
      "users/" + id + "/chatrooms/" + chatID + "/messages"
    );
    const q = query(messagesCol, orderBy("sentAt"), limit(50));

    // if there are changes in db, do operations
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // all messages for this chat
      const allMessages = querySnapshot.docs.map((doc) => doc.data());
      // here we tell what to do if data changes
      querySnapshot.docChanges().forEach((change) => {
        console.log(change.type);
        const data = change.doc.data();
        // if message already exists, dont load everything again
        const messageExists = messagesData.some(
          (message) => message.messageID == data.messageID
        );
        if (messageExists == false && change.type == "added") {
          // push new message into state
          setMessagesData((prevState) => [...prevState, data]);
        } else if (change.type == "modified") {
          setMessagesData((prevState) => [...prevState, data]);
        }
      });
    });
    return unsubscribe;
  };

  const sendMessage = async () => {
    console.log("send");
    const messageID = uuid.v4();
    const batch = writeBatch(firestore);

    const senderRef = doc(
      collection(
        firestore,
        "users/" + id + "/chatrooms/" + chatID + "/messages"
      ),
      messageID
    );
    batch.set(senderRef, {
      messageID: messageID,
      sentAt: serverTimestamp(),
      userID: id,
      message: message,
      userPhoto: photo == undefined ? "" : photo,
    });

    const receiverRef = doc(
      collection(
        firestore,
        "users/" +
          receiverData.receiverID +
          "/chatrooms/" +
          chatID +
          "/messages"
      ),
      messageID
    );
    batch.set(receiverRef, {
      messageID: messageID,
      sentAt: serverTimestamp(),
      userID: id,
      message: message,
      userPhoto: photo == undefined ? "" : photo,
    });

    // Commit the batch
    await batch.commit().then(() => {
      updateChatroom();
    });
  };

  const updateChatroom = async () => {
    // update time for the last message
    const batch = writeBatch(firestore);

    const senderRef = doc(
      collection(firestore, "users/" + id + "/chatrooms"),
      chatID
    );
    batch.update(senderRef, {
      lastMessage: message,
      lastMessageAt: serverTimestamp(),
    });

    const receiverRef = doc(
      collection(firestore, "users/" + receiverData.receiverID + "/chatrooms"),
      chatID
    );
    batch.update(receiverRef, {
      lastMessage: message,
      lastMessageAt: serverTimestamp(),
    });

    await batch.commit().then(() => {
      setMessage(""); /* text input resets */
    });
  };

  ///////////////////////////////
  // render every message //

  const messages = messagesData.map((message) => {
    if (message.sentAt) {
      const time = message.sentAt
        .toDate()
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      return message.userID !== id ? (
        <View key={message.messageID} style={styles.messageContainerFriend}>
          <View style={styles.bubbleContainerFriend}>
            <Text style={styles.textInBubbleFriend}>{message.message}</Text>
          </View>
          <Text style={{ fontSize: 10 }}>{time}</Text>
        </View>
      ) : (
        <View key={message.messageID} style={styles.messageContainer}>
          <View style={styles.bubbleContainer}>
            <Text style={styles.textInBubble}>{message.message}</Text>
          </View>
          <Text style={{ fontSize: 10, textAlign: "right" }}>{time}</Text>
        </View>
      );
    }
  });
  /////////////////////////////////

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        borderTopWidth: 1,
        borderColor: "#F2F2F2",
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          style={styles.convoContainer}
          ref={scrollRef}
          onContentSizeChange={() => scrollRef.current.scrollToEnd()}
        >
          {messages}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write message"
            placeholderTextColor="rgba(35,35,35, 0.2)"
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={styles.input}
          ></TextInput>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => (message !== "" ? sendMessage() : null)}
          >
            <Ionicons
              name="send"
              style={
                message !== ""
                  ? styles.sendButtonActive
                  : styles.sendButtonDisabled
              }
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "80%",
  },
  sendButton: {},
  sendButtonActive: {
    fontSize: 25,
    color: "#5050A5",
  },
  sendButtonDisabled: {
    fontSize: 25,
    color: "#EEEEEE",
  },
  convoContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  messageContainerFriend: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "70%",
    marginTop: 5,
  },
  bubbleContainerFriend: {
    backgroundColor: "#EEEEEE",
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 10,
    borderBottomLeftRadius: 3,
  },
  textInBubbleFriend: {
    //color: "white",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "70%",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  bubbleContainer: {
    backgroundColor: "#5050A5",
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 3,
  },
  textInBubble: {
    color: "white",
  },
});
