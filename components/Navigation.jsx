import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Discover from "../screens/discover";
import Chat from "../screens/chat";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import LoggedIn from "../screens/LoggedIn";
import Home from "../screens/home"
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from "../entities/AsyncStorage";
import {onAuthStateChanged} from "firebase/auth";
import { authentication } from "../firebase";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function NavigationComponent() {

    const [token, setToken] = useState(undefined)
    
    useEffect(() => {
      const unsubcribe = onAuthStateChanged(authentication, (user) => {
        user ? setToken(1) : setToken(undefined)
      });
      return unsubcribe;
    });
    
  return (
      
    <NavigationContainer>
        {token !== undefined ?(
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: "#5050A5",
          tabBarInactiveTintColor: "#B7B7B7",
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 15,
            textTransform: "uppercase",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
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
          component={MenuStack}
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
        ) : (
            <Stack.Navigator>
            <Stack.Screen
              name="Signup"
              options={{ headerShown: false }}
              component={Signup}
            />
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={Login}
            />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}

function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
      />
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
