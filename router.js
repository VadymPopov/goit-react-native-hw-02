import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TouchableOpacity, View, Text } from "react-native";

// icons import
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import Home from "./screens/main/Home";

import ProfileScreen from "./screens/main/ProfileScreen";
import PostsScreen from "./screens/main/PostsScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName='Login'
        options={{ headerShown: false }}>
        <AuthStack.Screen name='Registration' component={RegistrationScreen} />
        <AuthStack.Screen name='Login' component={LoginScreen} />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        showLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingBottom: 11,
          paddingLeft: 93,
          paddingRight: 93,
        },
        tabBarItemStyle: { borderRadius: 20, width: 70, height: 40 },
      }}>
      <MainTab.Screen
        options={({ navigation }) => ({
          title: "Posts",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "Medium",
            fontSize: 17,
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate("Login")}>
              <Feather name='log-out' size={24} color='#BDBDBD' />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='grid-outline'
              size={24}
              color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
        })}
        name='Home'
        component={Home}
      />

      <MainTab.Screen
        options={({ navigation }) => ({
          title: "Create Posts",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: "Medium",
            fontSize: 17,
          },
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("Posts")}>
              <AntDesign
                name='arrowleft'
                size={24}
                color='rgba(33, 33, 33, 0.8)'
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name='plus'
              size={13}
              color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
        })}
        name='CreatePosts'
        component={CreatePostsScreen}
      />

      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name='user'
              size={24}
              color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
            />
          ),
        }}
        name='Profile'
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
