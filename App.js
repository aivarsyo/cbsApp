import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/home";
import Discover from "./screens/discover";
import Chat from "./screens/chat";
import Menu from "./screens/menu";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import LoggedIn from "./screens/LoggedIn";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: "#5050A5",
          tabBarInactiveTintColor: "#B7B7B7",
          tabBarLabelStyle: {
            fontSize: 15,
            textTransform: "uppercase",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={LoginSignupStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home-sharp"
                style={{ color: focused ? "#5050A5" : "#B7B7B7", fontSize: 20 }}
              ></Ionicons>
            ),
          }}
        />
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="search-sharp"
                style={{ color: focused ? "#5050A5" : "#B7B7B7", fontSize: 20 }}
              ></Ionicons>
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="chatbubbles-sharp"
                style={{ color: focused ? "#5050A5" : "#B7B7B7", fontSize: 20 }}
              ></Ionicons>
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="menu-sharp"
                style={{ color: focused ? "#5050A5" : "#B7B7B7", fontSize: 20 }}
              ></Ionicons>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function LoginSignupStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" options={{headerShown: false}} component={Signup} />
      <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
      <Stack.Screen name="LoggedIn" component={LoggedIn} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
