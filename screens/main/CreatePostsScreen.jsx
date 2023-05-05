import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";


const initialState = {
    title:'',
    location: '',
  };

export default function CreatePostsScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [description, setDescription] = useState(initialState);
    const locationRef = useRef();
    
    const titleHandler = (value)=>setDescription((prevState)=>({...prevState, title: value}));
    const locationHandler = (value)=>setDescription((prevState)=>({...prevState, location: value}));

    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);

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
        setDescription(initialState);
        setPhoto(null);
        navigation.navigate('Posts', {photo, description, location});
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
                        <Ionicons name="camera" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>}
            </Camera>
            <TouchableOpacity style={styles.addPhotoBtn} onPress={()=>{}}>
                <Text style={styles.text}>{photo ? "Edit photo" : "Upload"}</Text>
            </TouchableOpacity>
            <View>
            <TextInput 
                value={description.title}
                onChangeText={titleHandler}
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
                value={description.location}
                onChangeText={locationHandler}
                placeholder="Location..."
                textAlign={'left'}
                ref={locationRef}
                />
            </View>
           
            <TouchableOpacity disabled={!photo ? true : false} style={photo ? styles.postBtn : styles.postBtnDisabled } onPress={sendPhoto}>
                <Text style={photo ? styles.postBtnLabel : styles.postBtnLabelDisabled}>Post</Text>
            </TouchableOpacity>
            </View>
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
        borderRadius:8,
        borderColor:"#E8E8E8",
        borderWidth: 1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 8,

    },
    snap:{
        position: 'absolute',
        width:60,
        height:60,
        backgroundColor: 'rgb(255, 255, 255)',
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
    }
});