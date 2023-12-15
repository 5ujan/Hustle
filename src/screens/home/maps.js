
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../constants';

import MapView, { Marker, Region } from 'react-native-maps';
import styles from '../../Styles_holder'
import { getPaidJobs, getCommunityJobs } from '../../apiCalls';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Maps = () => {
  const isFocused = useIsFocused();
  const [markerPoints, setmarkerPoints] = useState([{
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    latitude: 27.7815,
    longitude: 85.351,
  },
  {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    latitude: 27.7265,
    longitude: 85.3691,
  },
  {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    latitude: 27.7495,
    longitude: 85.3201,
  },
  {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    latitude: 27.7215,
    longitude: 85.3201,
  },
  {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    latitude: 27.7295,
    longitude: 85.3291,
  },
  {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    latitude: 27.7115,
    longitude: 85.3251,
  }
  ]
  );

  const onRegionChange = (region) => {
   // console.log(region)
  }
  useEffect(()=>{
   async function getLocations(){
      const jobs = await getPaidJobs();
      const community = await getCommunityJobs();
      const allJobs= [...jobs, ...community]
      // console.log(allJobs)
      let found =allJobs.map((job)=>job.location)
      // console.log(found)
      setmarkerPoints([...markerPoints, ...found])      
    }
   if(isFocused) getLocations();
  },[isFocused])

  

  const onMarkerPressed = (ev) => {
    console.log(ev);
  }



  return (
    <View
      style={{
        flex: 1
      }}>

      <MapView
        style={styles.Map_View}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 27.700769,
          longitude: 85.300140,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}

      >
        {markerPoints.map((location)=>{
          return (<Marker
           
            coordinate={location}
            pinColor="#112233"
            onPress={onMarkerPressed}
          />)
        })}
        {/* <Marker
          // id='marker'
          // draggable
          coordinate={markerPoints[0]}
          // onDragEnd={(e) => setmarkerPoints(prev => [e.nativeEvent.coordinate, ...prev])}
          pinColor='#112233'
          // onPress={()=>onMarkerSelected(marker)}
          onPress={onMarkerPressed}
        />
        <Marker
          // id='marker'
          // draggable
          coordinate={markerPoints[1]}
          //onDragEnd={(e) => setmarkerPoints(e.nativeEvent.coordinate)}
          pinColor='#112233'
          // onPress={()=>onMarkerSelected(marker)}
          onPress={onMarkerPressed}
        />
        <Marker
          // id='marker'
          // draggable
          coordinate={markerPoints[2]}
          //onDragEnd={(e) => setmarkerPoints(e.nativeEvent.coordinate)}
          pinColor='#112233'
          // onPress={()=>onMarkerSelected(marker)}
          onPress={onMarkerPressed}
        />
        <Marker
        // id='marker'
        // draggable
        coordinate={markerPoints[3]}
        //onDragEnd={(e) => setmarkerPoints(e.nativeEvent.coordinate)}
        pinColor='#112233'
        // onPress={()=>onMarkerSelected(marker)}
        onPress={onMarkerPressed}
      /><Marker
      // id='marker'
      // draggable
      coordinate={markerPoints[4]}
      //onDragEnd={(e) => setmarkerPoints(e.nativeEvent.coordinate)}
      pinColor='#112233'
      // onPress={()=>onMarkerSelected(marker)}
      onPress={onMarkerPressed}
    /><Marker
    // id='marker'
    // draggable
    coordinate={markerPoints[5]}
    //onDragEnd={(e) => setmarkerPoints(e.nativeEvent.coordinate)}
    pinColor='#112233'
    // onPress={()=>onMarkerSelected(marker)}
    onPress={onMarkerPressed}
  /> */}
      </MapView>




    </View>
  );
};

export default Maps;