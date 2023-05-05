import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function MapScreen({ route }) {
  const [location, setLocation]=useState(null);
  useEffect(()=>{
        if(route.params){
        setLocation((prevState)=>[...prevState, route.params])}
  }, [route.params]);

  
    return(
        <View style={styles.container}>
            <Text>Hello</Text>
            <MapView style={styles.map} 
            region={{...location, latitudeDelta:0.0922, longitudeDelta:0.0421}} mapType="standard" showsUserLocation={true} >
                {location && <Marker title='travel photo' coordinate={location} description='Hello'/>}
            </MapView>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: "100%",
        height: "100%",
    },
});