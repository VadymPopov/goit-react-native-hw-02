import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore'; 

import { useSelector } from "react-redux";
import uuid from 'react-native-uuid';

export default function PostsScreen(){
    const [posts, setPosts]=useState([]);
    const navigation= useNavigation();
    const { login, userEmail, userAvatar } = useSelector((state) => state.auth);

    const getDataFromFirestore = async () => {
        const dbRef = await collection(db, "posts");
        onSnapshot(dbRef, (data) =>
          setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
      };
      
  useEffect(()=>{
    (async () => {
        await getDataFromFirestore();
      })();
    },[]);


    return(
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Image style={styles.avatar} source={{ uri: userAvatar }} />
                <View style={styles.text}>
                    <Text style={styles.name}>{login}</Text>
                    <Text style={styles.email}>{userEmail}</Text>
                </View>
            </View>

            <FlatList style={{paddingLeft:16,
                paddingRight: 16,
            }} data={posts} keyExtractor={() => uuid.v4()} renderItem={({ item }) => (
                <View>
                    <View style={styles.imgContainer}>
                        <Image style={styles.image} source={{uri: item.photo}} />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Comments', {postId: item.id, photo: item.photo})} style={styles.commentContainer}>
                            <FontAwesome name="comment" size={24} color={
                        !item.comments
                          ? "#BDBDBD"
                          : "#FF6C00"
                      } />
                        </TouchableOpacity>
                        <View style={styles.locationContainer}>
                            <TouchableOpacity  onPress={()=>{navigation.navigate('MapScreen', {location:item.location, title:item.title})}}>
                                <Ionicons  name="ios-location-outline" size={24} color="#BDBDBD" />
                            </TouchableOpacity>
                            <Text style={styles.location}>{item.locationTitle}</Text>
                        </View>
                    </View>
                </View>)}
            />
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop:32,
        backgroundColor: '#fff'
    },
    userContainer:{
        flexDirection: 'row',
        paddingLeft:16,
        marginBottom: 32
    },
    text:{
        marginLeft:8,
    },
    name:{
        fontSize:24,
        fontWeight:'bold',
    },
    email:{
        color:'rgba(33, 33, 33, 0.8)',
        fontSize:16,
        fontWeight:'regular',   
    },
    avatar:{
        width:60,
        height:60,
        borderRadius: 10,
    },
    imgContainer: {
        height: 240,
        marginBottom: 8
    },
    image:{
        height:240,
        borderRadius: 8,
    },
    title:{
        fontSize:16,
        lineHeight:19,
        fontWeight:'500',
        marginBottom:11
    },
    numbers:{
        fontSize:16,
        lineHeight:19,
        marginLeft: 6,
    },
    iconContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: 32
    },
    commentContainer: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    locationContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:141,
    },
    location:{
        fontSize:16,
        lineHeight:19,
        textDecorationLine:'underline'
    },
});