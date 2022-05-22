import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Logo = (props) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={props.source} style={styles.logo} />
      </View>
      <Text style={styles.bigTitle}>{props.bigTitle}</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: "center",
    width: 130,
    height: 130,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bigTitle: {
    color: "#32305D",
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 30,
  },
});
