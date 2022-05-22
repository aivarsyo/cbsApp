import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const Event = (props) => {
  return (
    <View style={styles.eventContainer}>
      <Image source={props.photo} style={styles.eventPhoto}></Image>
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "transparent"]}
        start={{ x: 0.5, y: 0.8 }}
        end={{ x: 0.5, y: 0.0 }}
        style={styles.linearGradient}
      />
      <View style={styles.textContainer}>
        <Text style={styles.eventTitle}>{props.title}</Text>
        <Text style={styles.eventOrganiser}>{props.organiser}</Text>
        <View style={styles.lineContainer}>
          <Ionicons name="time" style={styles.icon} />
          <Text style={styles.time}>
            {props.date} &#8226; {props.time}
          </Text>
        </View>
        <View style={styles.lineContainer}>
          <Ionicons name="location" style={styles.icon} />
          <Text style={styles.location}>{props.location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  eventContainer: {
    height: 170,
    borderRadius: 6,
    justifyContent: "flex-end",
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
  eventPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    borderRadius: 6,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 6,
  },
  textContainer: {
    marginLeft: 10,
    marginBottom: 10,
  },
  eventTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  eventOrganiser: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 4,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  icon: {
    color: "white",
    fontSize: 16,
    marginRight: 7,
  },
  time: {
    color: "white",
    fontWeight: "bold",
  },
  location: {
    color: "white",
  },
});
