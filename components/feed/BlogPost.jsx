import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BlogPost = (props) => {
  return (
    <View style={styles.articleContainer}>
      {props.articlePhoto !== undefined ? (
        <View style={styles.articlePhotoContainer}>
          <Image source={props.articlePhoto} style={styles.articlePhoto} />
        </View>
      ) : null}
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Ionicons
            name={props.postType == "BLOG" ? "newspaper" : "headset"}
            style={styles.icon}
          />
          <Text style={styles.postType}>{props.postType}</Text>
        </View>
        <Text style={styles.title}>{props.title}</Text>
        {props.text !== undefined ? (
          <Text style={styles.text}>{props.text}</Text>
        ) : null}
        <View style={styles.spacedRow}>
          <Text style={styles.time}>{props.time}</Text>
          <View style={styles.row}>
            <View style={[styles.row, { marginRight: 18 }]}>
              <Ionicons name="thumbs-up" style={styles.icon} />
              <Text style={styles.number}>{props.likes}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="chatbox-ellipses" style={styles.icon} />
              <Text style={styles.number}>{props.comments}</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.row,
            {
              borderTopWidth: 1,
              borderColor: "#EEEEEE",
              alignItems: "flex-start",
              paddingTop: 15,
            },
          ]}
        >
          <View style={styles.authorPhotoContainer}>
            <Image source={props.authorPhoto} style={styles.authorPhoto} />
          </View>
          <Text style={styles.organisation}>{props.author}</Text>
        </View>
      </View>
    </View>
  );
};

export default BlogPost;

const styles = StyleSheet.create({
  articleContainer: {
    borderRadius: 6,
    backgroundColor: "white",
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
  articlePhotoContainer: {
    height: 170,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  contentContainer: {
    padding: 15,
  },
  articlePhoto: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: "#5050A5",
    fontSize: 13,
    marginRight: 5,
  },
  postType: {
    fontWeight: "700",
    color: "#5050A5",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 10,
  },
  text: {
    marginVertical: 10,
  },
  spacedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  time: {
    color: "#AAAAAA",
  },
  number: {
    color: "#5050A5",
    fontWeight: "700",
  },
  authorPhotoContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  authorPhoto: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  organisation: {
    fontWeight: "bold",
    marginLeft: 6,
  },
});
