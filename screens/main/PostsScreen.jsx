import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function PostsScreen(){
    return(
        <View  style={styles.container}>
            
            <View style={styles.userContainer}>
                <Image style={styles.image} source={require('../../assets/images/avatar.jpg')} />
                <View style={styles.text}>
                    <Text style={styles.name}>Name</Text>
                    <Text style={styles.email}>email</Text>
                </View>
            </View>
            
        </View>
    )

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingLeft:16,
        paddingRight:16,
        paddingTop:32,
        backgroundColor: '#fff'
    },
    userContainer:{
        flex:1,
        flexDirection: 'row',
    
        
    },
    text:{
        marginLeft:8,
    },
    name:{
        fontSize:13,
        fontWeight:'bold',
    },
    email:{
        color:'rgba(33, 33, 33, 0.8)',
        fontSize:11,
        fontWeight:'regular',
        
        
    },
    image:{
        width:60,
        height:60,
        borderRadius: 10,

    }
});