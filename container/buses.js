import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity , Dimensions, Image, Text, ImageBackground, FlatList, Button, Picker,} from 'react-native';
import firebaseDb from '../firebaseDb';
import Constants from 'expo-constants'
import BlackButton from '../component/BlackButton'
import SomeButton from '../component/SomeButton'
import {Appbar, Title , Subheading} from 'react-native-paper'

export default class buses extends Component {
    state = {
        Location: null,
        buses: null,
        stops: null
    };

    HandleSearch = () => {
        let stops = []
        let buses = []
        if(this.state.Location!=null && this.state.Location!='') {
            firebaseDb.firestore()
            .collection('busdetails')
            .doc('stops')
            .collection(this.state.Location)
            .get()
            .then(snapshot => {
            snapshot.forEach(doc => {
                stops.push(doc.data().stops)
                buses.push(doc.id)
            })
                this.setState({buses:buses, stops:stops})
            })
        }
        else {
            alert("Please choose a Location")
        }
    }
    render() {

        const busnames=[];
        let i = 0;
        const details=[];
        let data;

        this.state.stops&&this.state.stops.map( stop => {
          data = "Stops at " + stop
          details.push(data)
        })
        this.state.buses&&this.state.buses.map( bus =>{
            busnames.push({key: bus, data:details[i]})
            i++;
        })

        return (
  
           <SafeAreaView style={styles.container}>
               <Appbar style={styles.top}>
                <Appbar.Action
                icon={require('../assets/slideinw.png')}
                onPress={() => this.props.navigation.openDrawer()}
                />
                <Appbar.Content title="Which bus goes there?" />
                </Appbar>
                <ScrollView>
                <Text style={styles.text1}>Location</Text>
                <Picker style={styles.pickerStyle} selectedValue={(this.state && this.state.Location) || 'Select the closest location'} onValueChange={(value) => {this.setState({Location: value});}}>
                    <Picker.Item label=" Select the closest location" value="null" />
                    <Picker.Item label="FASS" value="FASS" />
                    <Picker.Item label="E3,E4,E5" value="E3,E4,E5" />
                    <Picker.Item label="EA" value="EA" />
                    <Picker.Item label="Business" value="Business" />
                    <Picker.Item label="FOS" value="FOS" />
                    <Picker.Item label="Science Drive" value="Science Drive" />
                    <Picker.Item label="Saw Swee Hock School Of Public Health" value="Saw Swee Hock School of Public Health" />
                    <Picker.Item label="University Town" value="University Town" />
                    <Picker.Item label="USP" value="USP" />
                    <Picker.Item label="Yale NUS" value="Yale NUS" />
                    <Picker.Item label="Yong Siew Toh Conservatory of Music" value= 'Yong Siew Toh Conservatory of Music'/>
                    <Picker.Item label="Medicine" value="Medicine" />
                    <Picker.Item label="Nursing" value="Nursing" />
                    <Picker.Item label="Dentistry" value="Dentistry" />
                    <Picker.Item label="Law" value="Law" />
                    <Picker.Item label="Prince George's Park" value="Prince Georges Park" />
                    <Picker.Item label="RVRC" value="RVRC" />
                    <Picker.Item label="Computing" value="Computing" />
                    <Picker.Item label="Lee Kuan Yew School of Public Policy" value="Lee Kuan Yew School of Public Policy" />
                    <Picker.Item label="School of Design and Environment" value="School of Design and Environment" />
                    <Picker.Item label="TCOMS" value="TCOMS" />
                </Picker>
                <BlackButton
                style={styles.button1}
                onPress={this.HandleSearch}
                >Search</BlackButton>
                <Text style={styles.text1}>Click on a bus name to see the stops</Text>
           {/* <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}> */}
            
            <View style={{flex: 1, alignItems:"center", justifyContent:"center", marginTop:15}}>
                <FlatList
                data={busnames}
                keyExtractor={item => item.key}
                renderItem={({item}) => <SomeButton style={styles.item} onPress={()=>{alert(item.data)}}>{item.key}</SomeButton>}
                />
            </View>
            
            {/* <View style={{alignContent: "center", justifyContent:"center", alignItems:"center"}}>
                <Text> Click on an item to view details!</Text>
            </View> */}
            {/* </View> */}
            </ScrollView>
            </SafeAreaView>  
  
        ) 
    }  
  }  
  const styles = StyleSheet.create ({  
    container:{ marginTop: Constants.statusBarHeight,
      marginBottom: 10,
      flex: 1,
      backgroundColor: "#ffebcd"
     
    },
    top: {
      backgroundColor:"#c17eef"
  },
    image: {
      justifyContent: 'flex-start',
      alignItems:'flex-start',
      alignSelf: 'flex-start',
      height: 40,
      width:30,
      marginLeft:15
   
  },
  item: {
    //padding: 10,
    fontSize: 18,
    height: 44,
    color:"black",
    marginTop: 10,
    borderRadius: 15,
  },
    pickerStyle:{
        marginLeft : 50,
        height:50,
        width: (Dimensions.get('window').width>400)?400: Dimensions.get('window').width- 50,
        color: '#344953',
        //flexDirection: "",
      justifyContent: "center",
      alignSelf: "center"
    },
    textb: {
      //color: "white",
      fontSize: 28,
      fontWeight:"bold",
      alignSelf:'center',
      marginTop:30,
      textDecorationLine:"underline",
      justifyContent: 'center',
      textDecorationLine: "underline"
      
    },
    text1: {
      //color: "white",
      fontSize: 20,
      marginTop: 20,
      alignSelf: "center",
      justifyContent: 'center',
  
    },
    button1: {
      marginTop: 10,
          borderRadius:20,
          width: 150,
          height:50,
          alignSelf:'center',
          justifyContent:"center",
          alignItems:"center" 
        
    },   
  })
