import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import CheckUser from "../entities/CheckUser";
import Event from "../components/feed/Event";
import BlogPost from "../components/feed/BlogPost";
import OrgPage from "../components/feed/OrgPage";
// organisations photos
const organisation1 = require("../assets/organisations/organisation-1.jpeg");
const organisation2 = require("../assets/organisations/organisation-2.png");
const organisation3 = require("../assets/organisations/organisation-3.png");
const organisation4 = require("../assets/organisations/organisation-4.png");
const organisation5 = require("../assets/organisations/organisation-5.jpeg");
// still photos
const still1 = require("../assets/stills/image-1.jpeg");
const still2 = require("../assets/stills/image-2.jpeg");
const still3 = require("../assets/stills/image-3.jpeg");
// events photos
const event1 = require("../assets/events/event-1.jpeg");
const event4 = require("../assets/events/event-4.jpeg");
const event5 = require("../assets/events/event-5.jpeg");

export default function Home() {

  return (
    <ScrollView>
      <View style={styles.feedContainer}>
        <CheckUser />
        <Event
          photo={event1}
          title="Christmas with CBS Yoga"
          organiser="CBS Yoga"
          date="MON, 1. APR"
          time="15.00 - 18.00"
          location="Dalgas Have, 2000 Frederiksberg"
        />
        <BlogPost
          postType="BLOG"
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor..."
          time="3h"
          likes="73"
          comments="31"
          authorPhoto={organisation3}
          author="CBS Investment Club"
        />
        <Event
          photo={event4}
          title="CBS Film presents - Ghost World"
          organiser="CBS Film"
          date="MON, 1. APR"
          time="15.00 - 18.00"
          location="Husets Biograf, Rådhusstræde 13, 2th"
        />
        <OrgPage
          cover={still2}
          orgPhoto={organisation1}
          name="CBS Jam"
          description="Lorem ipsum dolor sit amet, consectetur adipi scing elit. Fusce quam nisl, imperdiet semper elit quis, eleifend luctus ligula..."
        />
        <BlogPost
          articlePhoto={still1}
          postType="BLOG"
          title="Studying during corona events offers opportunities for tremendo..."
          time="4d"
          likes="73"
          comments="31"
          authorPhoto={organisation4}
          author="CBS Students"
        />
        <BlogPost
          postType="AUDIO"
          title="CBS Gin Podcast EP7 - A gin-gin situation"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."
          time="3mo"
          likes="73"
          comments="31"
          authorPhoto={organisation5}
          author="CBS Gin"
        />
        <Event
          photo={event5}
          title="CBS Surf Portugal week 27"
          organiser="CBS Surf"
          date="MON, 1. APR"
          time="SUN, 8. APR"
          location="Lapoint Surf Camp Portugal - Ericeira"
        />
        <OrgPage
          cover={still3}
          orgPhoto={organisation2}
          name="CBS Outdoor &amp; Adventure"
          description="Lorem ipsum dolor sit amet, consectetur adipi scing elit. Fusce quam nisl, imperdiet semper elit quis, eleifend luctus ligula..."
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  feedContainer: {
    padding: 20,
  },
});
