import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Category from "../components/discover/Category";
// images
const still4 = require("../assets/stills/image-4.jpeg");
const still5 = require("../assets/stills/image-5.jpeg");
const still6 = require("../assets/stills/image-6.jpeg");

export default function Discover() {
  return (
    <View style={styles.discoverContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={{ minHeight: "100%" }}>
          <View style={styles.inputContainer}>
            <Ionicons name="search" style={styles.icon} />
            <TextInput
              placeholder="Search for events, posts and more"
              style={styles.input}
              placeholderTextColor="#BABADD"
            />
          </View>
          <Category
            image={still4}
            color="rgba(133,55,131, 0.7)"
            category="ALL EVENTS"
          />
          <Category
            image={still5}
            color="rgba(88,86,122, 0.7)"
            category="ALL STUDENT ORGANISATIONS"
          />
          <Category
            image={still6}
            color="rgba(17,127,94, 0.7)"
            category="ALL POSTS"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  discoverContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    color: "#32305D",
    fontSize: 24,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
});
