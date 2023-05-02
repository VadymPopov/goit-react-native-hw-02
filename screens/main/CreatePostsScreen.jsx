import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function CreatePostsScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <View style={styles.addPhoto}>
                    <TouchableOpacity  onPress={()=>{}}>
                        <Ionicons name="camera" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.addPhotoBtn} onPress={()=>{}}>
                <Text style={styles.text}>Add photo</Text>
            </TouchableOpacity>
            <View>
            <TextInput 
                // onChangeText={}
                placeholder="Title..."
                style={styles.input}
                textAlign={'left'}
                // onFocus={()=>{setIsShowKeyboard(true)}}
            />

            <View style={styles.locationContainer}>
                <Ionicons style={styles.location} name="ios-location-outline" size={24} color="#BDBDBD" />
                <TextInput
                // onChangeText={}
                placeholder="Location..."
                textAlign={'left'}
                // onFocus={()=>{setIsShowKeyboard(true)}}
                />
            </View>
           
            <TouchableOpacity disabled style={styles.postBtn} onPress={()=>{}}>
                <Text style={styles.text}>Post</Text>
            </TouchableOpacity>
            </View>
        </View>
    )

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop:32,
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
        marginBottom: 8,

    },
    addPhoto:{
        width:60,
        height:60,
        backgroundColor: 'rgb(255, 255, 255)',
        display:'flex',
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
    postBtn:{
        alignItems: 'center',
        backgroundColor:'rgba(232, 232, 232, 1)',
        paddingHorizontal: 118,
        paddingVertical: 16,
        borderRadius: 100,
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