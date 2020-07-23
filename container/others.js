import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity , Dimensions, Image, Text, ImageBackground, SectionList} from 'react-native';
// import { Table, TableWrapper, Row, Cell,Col, Rows,Cols } from 'react-native-table-component';
import firebaseDb from '../firebaseDb';
import {NavigationContainer} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import about from './about'
import TermsCond from './TermsCond'
import accntDetails from './accntDetails'
import  Profilepage  from './Profilepage'
import Constants from 'expo-constants'
import {Appbar, Title, Subheading} from 'react-native-paper'

const Tab = createMaterialBottomTabNavigator();

function others() {
  return (

    <Tab.Navigator independent={true} 
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            return <Image source={require('../assets/profile.png')} style={styles.image1} />;
          } else if (route.name === 'Account') {
            return <Image source={require('../assets/accnt.png')} style={styles.image1} />;
          }
          else if (route.name === 'About us') {
            return <Image source={require('../assets/abouticon.png')} style={styles.image1} />;
          }
          else if (route.name === 'TnC') {
            return <Image source={require('../assets/tc.png')} style={styles.image1} />;
          }

          // You can return any component that you like here!
          
        },
      })}
      activeColor="white"
      inactiveColor="black"
      barStyle={{ backgroundColor: '#a984ed', marginBottom:5 }}>
      <Tab.Screen name="Profile" component={Profilepage} />
      <Tab.Screen name="Account" component={accntDetails} />
      <Tab.Screen name="About us" component={about} />
      <Tab.Screen name="TnC" component={TermsCond} />
    </Tab.Navigator>
 

  );
}
const styles = StyleSheet.create ({
    image1: {
        height: 30,
        width:30,
        borderColor:'black',
        marginLeft: 5
    },
})

export default others

