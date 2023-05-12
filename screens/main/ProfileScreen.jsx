import React, {useState, useEffect} from 'react';
import CrossIcon from '../../assets/images/svg/CrossIcon';
import { StyleSheet, View, Text, ImageBackground, Image,TouchableOpacity,FlatList  } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import {signOut} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase/config';

import { authSignOutUser } from '../../redux/auth/authOperations';
import { useDispatch, useSelector } from 'react-redux';

// Create a reference to the posts collection
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function ProfileScreen(){
    const [isAvatarShown, setIsAvatarShown] = useState(true);
    const [userPosts, setUserPosts]=useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {userId} = useSelector(state=>state.auth);

    
    const getUserPosts = async()=>{
        const dbRef = await collection(db, "posts");
        const q = query(dbRef, where("userId", "==", userId));
        onSnapshot(q, (data) =>
    setUserPosts(data.docs.map((doc) => ({ ...doc.data()})))
    )
};

    useEffect( ()=>{
        (async () => {
            await getUserPosts();
          })();
    },[]);
  
    const avatarToggle = () => {
      setIsAvatarShown((value) => !value);
    };

    const onHandleLogOut = () =>{
        navigation.navigate('Login');
        signOut(auth)
    }

    return (
           <ImageBackground style={styles.image} source={require('../../assets/images/mountains-bg.png')}>
                <View style={styles.container}>
                    <View>
                        
                        <View style={styles.avatar}>
                            <View style={styles.avatarBg}>
                                {isAvatarShown && (
                                <Image style={styles.avatarImg} source={require('../../assets/images/avatar.jpg')}/>)}
                                <TouchableOpacity style={styles.addBtn} onPress={()=>avatarToggle()}>
                                <CrossIcon  isShown={isAvatarShown} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.logout} onPress={()=>navigation.navigate('Login')}><Feather name="log-out" size={24} color="#BDBDBD" /></TouchableOpacity>
                        </View>
                        <Text style={styles.mainTitle}>Name</Text>

                <View>
                    <FlatList data={userPosts} keyExtractor={(item, indx)=>indx.toString()} renderItem={({item})=>(<View style={styles.photoContainer}>
                    <Image style={styles.photo} source={{uri: item.photo}} />
                    <View>
                        <Text style={styles.title}>{item.comment}</Text>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Comments', {postId: item.id})} style={styles.iconContainer}>
                                    <FontAwesome name="comment" size={24} color="#FF6C00" />
                                    <Text style={styles.numbers}>0</Text>
                                </TouchableOpacity>
                                <View style={styles.iconContainer}>
                                    <AntDesign name="like2" size={24} color="#FF6C00" />
                                    <Text style={styles.numbers}>0</Text>
                                </View>
                                <View style={styles.locationContainer}>
                            <TouchableOpacity  onPress={()=>{navigation.navigate('MapScreen', {location:item.location})}}>
                                <Ionicons  name="ios-location-outline" size={24} color="#BDBDBD" />
                            </TouchableOpacity>
                            <Text style={styles.location}>{item.locationTitle}</Text>
                        </View>
                            </View>
                    </View>

                    </View>)}/>
                </View>
                </View>
                </View>
            </ImageBackground>
        );
      }
      
      const styles = StyleSheet.create({
        image: {
          flex: 1 ,
          resizeMode: "cover",
          justifyContent: "flex-end",
        },
        backgroundContainer:{
            height: 240,
            backgroundColor:'rgba(232, 232, 232, 1)',
            borderRadius:8,
            borderColor:"#E8E8E8",
            borderWidth: 1,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            marginTop:32
        },
        container: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 16,
          paddingTop: 92,
       },
        avatar:{
          position: "absolute",
          left: 0,
          right: 0,
          transform: [{ translateY: -150 }],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        avatarBg: {
          position: "relative",
          minWidth: 120,
          minHeight: 120,
          backgroundColor: "#F6F6F6",
          borderRadius: 16,
        },
        avatarImg: {
          borderRadius: 16,
        },
        addBtn: {
            position: "absolute",
            bottom: 14,
            right: -13,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: 25,
            height: 25,
            backgroundColor: "#fff",
            borderRadius: 13,
        },
        logout:{
            position: "absolute",
            bottom: 16,
            right: 0,
        },
        mainTitle:{
            fontSize:30,
            lineHeight:35,
            fontWeight:'500',
            alignSelf:'center',
        },

        iconContainer:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            marginRight:24,
            justifyContent:'space-between'
        },
        title:{
            fontSize:16,
            lineHeight:19,
            fontWeight:'500',
            marginVertical:8
        },
        numbers:{
            fontSize:16,
            lineHeight:19,
            marginLeft: 6,
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
        photoContainer: {
            marginBottom: 10,
        },
        photo:{
            height:200,
            borderRadius: 10,
            marginHorizontal: 10,
    
        },
      });