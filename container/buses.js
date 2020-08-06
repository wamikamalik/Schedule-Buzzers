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
        ELocation: null,
        buses: null,
        stops: null,
        k: null,
        i: null,

    };

    HandleSearch = () => {
        let stops = []
        const buses = []
        const bus = []
        let i = 0
        let j = 0
        let k = 0
        let l = 0
        this.setState({buses:null})
        if(this.state.Location!=null && this.state.Location!=''&&this.state.ELocation!=null && this.state.ELocation!='') {
            firebaseDb.firestore()
            .collection('busdetails')
            .doc('routes')
            .collection(this.state.Location)
            .get()
            .then(snapshot => {
              i = snapshot.docs.length
              this.setState({i:i})
              snapshot.forEach(doc => {
                bus.push(doc.id)
              })
              //alert(i)
              for(j=0;j<bus.length;j++) {
                let b = bus[j]
                //alert(j)
                firebaseDb.firestore()
                .collection('busdetails')
                .doc('routes')
                .collection(this.state.Location)
                .doc(bus[j])
                .collection("goesto")
                .doc(this.state.ELocation)
                .get()
                .then((doc1)=>{
                  if(doc1.exists) {
                    //alert(b)
                    buses.push(b)
                    //alert(buses)
                    this.setState({buses:buses})
                  }
                  else {
                    //alert(j)
                    k++;
                    this.setState({k:k})
                  }
                })
              }
            })
        }
        else {
            alert("Please choose the Locations")
        }
    }

    render() {

        const busnames=[];
        let i = 0;
        const details=[];
        let data;

        // this.state.stops&&this.state.stops.map( stop => {
        //   data = "Stops at " + stop
        //   details.push(data)
        // })
        this.state.buses&&this.state.buses.map( bus =>{
            busnames.push({key: bus})
            i++;
            //alert(JSON.stringify(busnames))
        })

        //alert(this.state.k)
        if(this.state.buses==null&&this.state.k==this.state.i&&this.state.i!=null) {
          //alert("hi")
          busnames.push({key:"No direct buses available."})
          //this.setState({k:null,i:null})
        }

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
                <Title style={styles.text1}>Starting Location</Title>
                <View
                    style={{
                      
                        borderColor: 'black',
                        borderTopWidth:1,
                        borderBottomWidth:1,
                     //   borderRadius: 10,
                        alignSelf: 'center',
                        
                    }}>
                <Picker style={styles.pickerStyle} selectedValue={(this.state && this.state.Location) || 'Select the closest location'} onValueChange={(value) => {this.setState({Location: value});}}>
                    <Picker.Item label=" Select the closest location" value="null" />
                    <Picker.Item label="AS5" value="AS5" />
                    <Picker.Item label="BIZ2" value="BIZ2" />
                    <Picker.Item label="Botanic Gardens MRT" value="Botanic Gardens MRT" />
                    <Picker.Item label="COM2" value="COM2" />
                    <Picker.Item label="Central Library" value="Central Library" />
                    <Picker.Item label="College Green" value="College Green" />
                    <Picker.Item label="EA" value="EA" />
                    <Picker.Item label="Kent Ridge MRT Station" value="Kent Ridge MRT Station" />
                    <Picker.Item label="Kent Vale" value="Kent Vale" />
                    <Picker.Item label="LT13" value="LT13" />
                    <Picker.Item label="LT27" value= 'LT27'/>
                    <Picker.Item label="Museum" value="Museum" />
                    <Picker.Item label="NUS IT" value="NUS IT" />
                    <Picker.Item label="Oei Tiong Ham (BTC)" value="Oei Tiong Ham (BTC)" />
                    <Picker.Item label="Opp HSSML" value="Opp HSSML" />
                    <Picker.Item label="Opp Kent Ridge MRT Station" value="Opp Kent Ridge MRT Station" />
                    <Picker.Item label="Opp NUSS" value="Opp NUSS" />
                    <Picker.Item label="Opp TCOMS" value="Opp TCOMS" />
                    <Picker.Item label="Opp University Hall" value="Opp University Hall" />
                    <Picker.Item label="Opp University Health Centre" value="Opp University Health Centre" />
                    <Picker.Item label="Opp YIH" value="Opp YIH" />
                    <Picker.Item label="PGP" value="PGP" />
                    <Picker.Item label="PGPR" value="PGPR" />
                    <Picker.Item label="Raffles Hall" value="Raffles Hall" />
                    <Picker.Item label="S17" value="S17" />
                    <Picker.Item label="TCOMS" value="TCOMS" />
                    <Picker.Item label="University Hall" value="University Hall" />
                    <Picker.Item label="University Health Centre" value="University Health Centre" />
                    <Picker.Item label="University Town" value="University Town" />
                    <Picker.Item label="Ventus, Opp LT13" value="Ventus, Opp LT13" />
                    <Picker.Item label="Yusof Ishak House" value="Yusof Ishak House" />
                </Picker>
                </View>
                <Title style={styles.text1}>Destination</Title>
                <View
                    style={{
                      
                        borderColor: 'black',
                        borderTopWidth:1,
                        borderBottomWidth:1,
                     //   borderRadius: 10,
                        alignSelf: 'center'
                    }}>
                <Picker style={styles.pickerStyle} selectedValue={(this.state && this.state.ELocation) || 'Select the closest location'} onValueChange={(value) => {this.setState({ELocation: value});}}>
                <Picker.Item label=" Select the closest location" value="null" />
                    <Picker.Item label="AS5" value="AS5" />
                    <Picker.Item label="BIZ2" value="BIZ2" />
                    <Picker.Item label="Botanic Gardens MRT" value="Botanic Gardens MRT" />
                    <Picker.Item label="COM2" value="COM2" />
                    <Picker.Item label="Central Library" value="Central Library" />
                    <Picker.Item label="College Green" value="College Green" />
                    <Picker.Item label="EA" value="EA" />
                    <Picker.Item label="Kent Ridge MRT Station" value="Kent Ridge MRT Station" />
                    <Picker.Item label="Kent Vale" value="Kent Vale" />
                    <Picker.Item label="LT13" value="LT13" />
                    <Picker.Item label="LT27" value= 'LT27'/>
                    <Picker.Item label="Museum" value="Museum" />
                    <Picker.Item label="NUS IT" value="NUS IT" />
                    <Picker.Item label="Oei Tiong Ham (BTC)" value="Oei Tiong Ham (BTC)" />
                    <Picker.Item label="Opp HSSML" value="Opp HSSML" />
                    <Picker.Item label="Opp Kent Ridge MRT Station" value="Opp Kent Ridge MRT Station" />
                    <Picker.Item label="Opp NUSS" value="Opp NUSS" />
                    <Picker.Item label="Opp TCOMS" value="Opp TCOMS" />
                    <Picker.Item label="Opp University Hall" value="Opp University Hall" />
                    <Picker.Item label="Opp University Health Centre" value="Opp University Health Centre" />
                    <Picker.Item label="Opp YIH" value="Opp YIH" />
                    <Picker.Item label="PGP" value="PGP" />
                    <Picker.Item label="PGPR" value="PGPR" />
                    <Picker.Item label="Raffles Hall" value="Raffles Hall" />
                    <Picker.Item label="S17" value="S17" />
                    <Picker.Item label="TCOMS" value="TCOMS" />
                    <Picker.Item label="University Hall" value="University Hall" />
                    <Picker.Item label="University Health Centre" value="University Health Centre" />
                    <Picker.Item label="University Town" value="University Town" />
                    <Picker.Item label="Ventus, Opp LT13" value="Ventus, Opp LT13" />
                    <Picker.Item label="Yusof Ishak House" value="Yusof Ishak House" />
                </Picker>
                </View>
                <BlackButton
                style={styles.button1}
                onPress={this.HandleSearch}
                >Search</BlackButton>
                <Title style={styles.text1}>The Buses you can take are:</Title>
           {/* <View style={{flex: 1, alignItems:"center", justifyContent:"center"}}> */}
            
            <View style={{flex: 1, alignItems:"center", justifyContent:"center", marginTop:15}}>
                <FlatList
                data={busnames}
                keyExtractor={item => item.key}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
    container:{ 
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
      color: "black",
    //  fontSize: 20,
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
