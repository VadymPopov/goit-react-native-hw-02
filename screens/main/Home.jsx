import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MapScreen from './MapScreen';
import CommentsScreen from './CommentsScreen';
import PostsScreen from './PostsScreen';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = createStackNavigator();

export default function Home({navigation, route}){
  return(
    <HomeScreen.Navigator initialRouteName="Posts">
      <HomeScreen.Screen options={{headerShown: false}} name='Posts' component={PostsScreen}/>
      <HomeScreen.Screen options={{headerShown: false}} name='MapScreen' component={MapScreen}/>
      <HomeScreen.Screen options={{headerShown: false}} name='Comments' component={CommentsScreen}/>
    </HomeScreen.Navigator>
  )
};
