import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity , Dimensions, Image, Text, ImageBackground, FlatList, Button, Picker,} from 'react-native';
import firebaseDb from '../firebaseDb';
import Constants from 'expo-constants'
import BlackButton from '../component/BlackButton'
import SomeButton from '../component/SomeButton'
import {Appbar, Title , Subheading, Card} from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps';
import RNLocation from "react-native-location";
import {getDistance} from 'geolib'
// import MapViewDirections from 'react-native-maps-directions';

// const origin = {latitude: 37.3318456, longitude: -122.0296002};
// const destination = {latitude: 37.771707, longitude: -122.4053769};
// const GOOGLE_MAPS_APIKEY = 'AIzaSyCM1VVnqn4HPaeByt4E53EAr2jJM8QzU3U';

const { width, height } = Dimensions.get('window');

export default class buses extends Component {
    state = {
        Location: null,
        ELocation: null,
        buses: null,
        stops: null,
        k: null,
        i: null,
        lat: 1.309976,
        long: 103.788458,
        userlat:null,
        userlong:null,
        mind:null,
        region : {
          latitude: 1.309976,
          longitude: 103.788458,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05*width/height,
        }

    };

    distance = (coordinate1, coordinate2) => {
      const toRadian = n => (n * Math.PI) / 180
      let lat2 = coordinate2.lat
      let lon2 = coordinate2.lon
      let lat1 = coordinate1.lat
      let lon1 = coordinate1.lon
      let R = 6371 // km
      let x1 = lat2 - lat1
      let dLat = toRadian(x1)
      let x2 = lon2 - lon1
      let dLon = toRadian(x2)
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      let d = R * c
      return d
    }

    componentDidMount() {
      const locations = ["AS5", "BIZ2", "Botanic Gardens MRT","COM2","Central Library", "College Green",
      "EA", "Kent Ridge MRT Station","Kent Vale","LT13","LT27","Museum","NUS IT","Oei Tiong Ham (BTC)",
      "Opp HSSML","Opp Kent Ridge MRT Station","Opp NUSS","Opp TCOMS","Opp University Hall","Opp University Health Centre",
      "Opp YIH","PGP","PGPR","Raffles Hall","S17","TCOMS","University Hall","University Health Centre",
      "University Town","Ventus, Opp LT13","Yusof Ishak House"]
      let d = []
      let i = 0 
      let j = 0
      let mind = 2349999990
      // locations.map(loc=>{
      //   firebaseDb.firestore()
      // .collection('busdetails')
      // .doc('routes')
      // .collection(loc)
      // .doc('location')
      // .get()
      // .then((doc)=>{
      //   //alert(doc.data().lat)
      //    d.push(this.distance({lat: 1.291954, lon: 103.783805},
      //     {lat: doc.data().lat, lon: doc.data().long}))
      //    j = d.indexOf(Math.min(...d));
      //    //alert(j)
      //    this.setState({Location: locations[j]})
      //    firebaseDb.firestore()
      //    .collection('busdetails')
      //    .doc('routes')
      //    .collection(locations[j])
      //    .doc('location')
      //    .get()
      //    .then((doc)=>{
      //      this.setState({lat:doc.data().lat, long:doc.data().long})
      //    })
      // })
      // })
      for(i=0;i<locations.length;i++) {
      var loc = locations[i];
      firebaseDb.firestore()
      .collection('busdetails')
      .doc('routes')
      .collection(loc)
      .doc('location')
      .get()
      .then((doc)=>{
        //alert(doc.data().lat)
         d.push(this.distance({lat: this.state.userlat, lon: this.state.userlong},
          {lat: doc.data().lat, lon: doc.data().long}))
         j = d.indexOf(Math.min(...d));
         //alert(j)
         this.setState({Location: locations[j]})
         firebaseDb.firestore()
         .collection('busdetails')
         .doc('routes')
         .collection(locations[j])
         .doc('location')
         .get()
         .then((doc)=>{
           this.setState({lat:doc.data().lat, long:doc.data().long})
         })
      })
      }
    }

    componentWillMount() {
      RNLocation.configure({
        distanceFilter: 5.0
      });
      
      RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "fine",
          rationale: {
            title: "Location permission",
            message: "We would like to use your location to help you find the bus stop",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }
        }
      }).then(granted => {
        if (granted) {
          this._startUpdatingLocation();
        }
      });
    }
  
    _startUpdatingLocation = () => {
      this.locationSubscription = RNLocation.subscribeToLocationUpdates(
        locations => {
          this.setState({ userlat: locations[0].latitude, userlong:locations[0].longitude });
        }
      );
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
              i = snapshot.docs.length-1
              this.setState({i:i})
              snapshot.forEach(doc => {
                bus.push(doc.id)
                l++;
                if(l = i+1) {
                    firebaseDb.firestore()
                    .collection('busdetails')
                    .doc('routes')
                    .collection(this.state.Location)
                    .doc('location')
                    .get()
                    .then((doc)=>{
                      this.setState({lat:doc.data().lat, long: doc.data().long})
                    })
                }
              })
              //alert(i)
              for(j=0;j<bus.length-1;j++) {
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
                <View style={styles.container1}>
              <MapView
              style = {styles.map}
              region={{
                latitude: this.state.lat,
                longitude: this.state.long,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01*width/height,
              }}
              >
                <Marker
                coordinate={{latitude: this.state.lat,
                  longitude: this.state.long,}}
                title={this.state.Location}
                />
                {this.state.userlat&&<Marker
                coordinate={{latitude: this.state.userlat,
                  longitude: this.state.userlong,}}
                title={'Your Location'}
                />}
                 {/* <MapViewDirections
                 mode={'WALKING'}
                  origin={{latitude:1.293439,longitude:103.772008}}
                  destination={{latitude:1.294305,longitude:103.773763}}
                  apikey={GOOGLE_MAPS_APIKEY}
                  /> */}
              </MapView>
              </View>
              {/* <Overlay image={require('../assets/homeback.png')} bounds={[[35.68184060244454, 139.76531982421875],[35.679609609368576, 139.76806640625]]} opacity={2.0}/> */}
              <Card elevation={30} style={{ backgroundColor:"transparent", height:225}}>
                <ScrollView>
                <ImageBackground source = {require('../assets/homeback.png')} style={{resizeMode:"cover"}}>
                <Card.Content>
                <View><Title style={styles.text1}>Starting Location</Title></View>
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
                </Card.Content>
                </ImageBackground>
                </ScrollView>
              </Card>
                

              {/* </View> */}
            
            {/* <View style={{alignContent: "center", justifyContent:"center", alignItems:"center"}}>
                <Text> Click on an item to view details!</Text>
            </View> */}
            {/* </View> */}

            </SafeAreaView>  
  
        ) 
    }  
  }  
  const styles = StyleSheet.create ({  
    container:{ 
      marginBottom: 10,
      backgroundColor: "#ffebcd",
      flex: 4, flexDirection:"column"
     
    },
    top: {
      backgroundColor:"#c17eef"
  },
  container1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
