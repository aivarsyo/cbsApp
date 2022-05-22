import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const OrgPage = (props) => {
  return (
    <View style={styles.organisationContainer}>
      <View style={styles.upperPart}>
        <View style={styles.coverContainer}>
          <Image source={props.cover} style={styles.cover} />
        </View>
        <View style={styles.row}>
          <View style={styles.orgPhotoContainer}>
            <Image source={props.orgPhoto} style={styles.orgPhoto} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="checkmark" style={styles.icon} />
              <Text style={styles.buttonText}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.description}>
          {props.description}{" "}
          <Text style={{ color: "#5050A5", fontWeight: "bold" }}>more</Text>
        </Text>
      </View>
    </View>
  );
};

export default OrgPage;

const styles = StyleSheet.create({
  organisationContainer: {
    backgroundColor: "white",
    borderRadius: 6,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  upperPart: {
    height: 180,
  },
  coverContainer: {
    height: 130,
  },
  cover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 50,
  },
  orgPhotoContainer: {
    width: 100,
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orgPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
  button: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#5050A5",
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  icon: {
    color: "#5050A5",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonText: {
    color: "#5050A5",
    fontWeight: "bold",
    marginLeft: 7,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  description: {
    lineHeight: 18,
  },
});
