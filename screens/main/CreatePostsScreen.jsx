import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

import { db, storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import * as ImagePicker from "expo-image-picker";

import { FontAwesome } from '@expo/vector-icons';


export default function CreatePostsScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [locationTitle, setLocationTitle] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [title, setTitle] = useState("");

    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);

    const {userId, login} = useSelector((state)=>state.auth);

    const locationRef = useRef();
    

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === "granted");
            } catch (error) {
                console.log(error)
            }
          })();
      }, []);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("Permission to access location was denied");
          }
    
          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setLocation(coords);
        })();
      }, []);
    
    const takePhoto = async ()=>{
        const photo = await camera.takePictureAsync();
        setPhoto(photo.uri)
    };

    const sendPhoto = ()=>{
        writeDataToFirestore()
        setLocationTitle("");
        setTitle("");
        setPhoto(null);
        navigation.navigate('Posts');
    };

    const uploadPhotoToServer = async ()=>{
        const response = await fetch(photo);
        const file = await response.blob();

        const uniquePostId = Date.now().toString();
        const storageRef = await ref(storage, `postImage/${uniquePostId}`);

        const uploadPhoto = await uploadBytes(storageRef, file);
        const takePhoto = await getDownloadURL(uploadPhoto.ref);

        return takePhoto;
    };

    const writeDataToFirestore = async () => {
        try {
            const photo = await uploadPhotoToServer()
          const docRef = await addDoc(collection(db, 'posts'), {
           photo,
           location,
           locationTitle,
           title,
           userId,
           login
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }
  };

  const photoSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    return(
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera} type={type}>
                {photo && <Image source={{uri: photo}} style={{height: "100%",
        width: "100%"}} />}
                {!photo && <View style={styles.snap}>
                    <TouchableOpacity  onPress={takePhoto}>
                        <Ionicons name="camera" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>}
            </Camera>

            <TouchableOpacity style={styles.addPhotoBtn} onPress={()=>photoSelect()}>
                <Text style={styles.text}>{photo ? "Edit photo" : "Upload"}</Text>
            </TouchableOpacity>
            <View>
            <TextInput 
                value={title}
                onChangeText={setTitle}
                placeholder="Title..."
                style={styles.input}
                textAlign={'left'}
                onSubmitEditing={() => {
                    locationRef.current.focus();
                  }}
                  blurOnSubmit={false}
            />

            <View style={styles.locationContainer}>
                <Ionicons style={styles.location} name="ios-location-outline" size={24} color="#BDBDBD" />
                <TextInput
                value={locationTitle}
                onChangeText={setLocationTitle}
                placeholder="Location..."
                textAlign={'left'}
                ref={locationRef}
                />
            </View>
           
            <TouchableOpacity disabled={!photo ? true : false} style={photo ? styles.postBtn : styles.postBtnDisabled } onPress={sendPhoto}>
                <Text style={photo ? styles.postBtnLabel : styles.postBtnLabelDisabled}>Post</Text>
            </TouchableOpacity>

            </View>
            <TouchableOpacity onPress={() => setPhoto("")} style={styles.deleteBtn}>
                    <FontAwesome name="trash-o" size={24} color="#DADADA"/>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop:32,
    },
    camera:{
        height: 240,
        backgroundColor:'rgba(232, 232, 232, 1)',
        borderColor:"#E8E8E8",
        borderWidth: 1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 8,
        overflow: 'hidden',
        borderRadius:8
    },
    snap:{
        position: 'absolute',
        width:60,
        height:60,
        backgroundColor:"rgba(255, 255, 255, 0.3)",
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 30
    },
    text:{
        fontSize:16,
        lineHeight:19,
        color:'#BDBDBD',
        
    },
    addPhotoBtn:{
        marginBottom:32,
    },
    input:{
        fontSize:16,
        lineHeight:19,
        borderBottomColor:'#E8E8E8',
        borderBottomWidth:1,
        marginBottom:16,
        height: 50,
    },
    postBtn: {
        alignItems: 'center',
        backgroundColor: '#FF6C00',
        paddingHorizontal: 118,
        paddingVertical: 16,
        borderRadius: 100,
        marginTop: 16,
    },
    postBtnLabel: {
        color: "#fff"
    },
    postBtnDisabled: {
        backgroundColor:'#F6F6F6',
        alignItems: 'center',
        paddingHorizontal: 118,
        paddingVertical: 16,
        borderRadius: 100,
        marginTop: 16,
    },
    postBtnLabelDisabled: {
        color: "#BDBDBD"
    },
    locationContainer:{
        fontSize:16,
        lineHeight:19,
        borderBottomColor:'#E8E8E8',
        borderBottomWidth:1,
        marginBottom:16,
        height: 50,
        paddingLeft: 24,
        justifyContent: 'center'

    },
    location:{
      position: 'absolute',
    },
    deleteBtn: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F6F6",
        borderRadius: 20,
        width: 70,
        height: 40,
        alignSelf: "center",
        marginTop: 120,
    }
});