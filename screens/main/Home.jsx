import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from 'react-native';

// icons import
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";

// screens import
import ProfileScreen from './ProfileScreen';
import CreatePostsScreen from './CreatePostsScreen';
import PostsScreen from './PostsScreen';


const MainTab = createBottomTabNavigator();
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

export default function Home(){
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

return (
    <MainTab.Navigator
      initialRouteName='PostsScreen'
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
        options={() => ({
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
              onPress={signOut}>
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
        name='Posts'
        component={PostsScreen}
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
          tabBarStyle: { display: 'none' },
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
};