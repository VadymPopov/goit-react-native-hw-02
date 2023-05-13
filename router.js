import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from "react-native";

// icons import
import { AntDesign } from "@expo/vector-icons";

// screen import
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import MapScreen from "./screens/main/MapScreen";
import CommentsScreen from "./screens/main/CommentsScreen";
import Home from "./screens/main/Home";


const AuthStack = createNativeStackNavigator();
const MainStack = createStackNavigator();

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName='Login'
         screenOptions={{headerShown: false}}>
        <AuthStack.Screen name='Registration' component={RegistrationScreen} />
        <AuthStack.Screen name='Login' component={LoginScreen} />
      </AuthStack.Navigator>
    );
  }

    return(
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen options={{headerShown: false}} name='Home' component={Home}/>
        <MainStack.Screen options={({ navigation }) => ({headerShown: true, headerLeft: () => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginLeft: 16 }}
                onPress={() => navigation.navigate('Posts')}>
                <AntDesign
                  name='arrowleft'
                  size={24}
                  color='rgba(33, 33, 33, 0.8)'
                />
              </TouchableOpacity>
            )})} name='MapScreen' component={MapScreen}/>
           
        <MainStack.Screen  tabBarStyle={ {display: 'none' }} options={({ navigation }) => ({headerShown: true, headerLeft: () => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginLeft: 16 }}
                onPress={() => navigation.navigate('Posts')}>
                <AntDesign
                  name='arrowleft'
                  size={24}
                  color='rgba(33, 33, 33, 0.8)'
                />
              </TouchableOpacity>
            )})} name='Comments' component={CommentsScreen}/>
      </MainStack.Navigator>
    )
}
