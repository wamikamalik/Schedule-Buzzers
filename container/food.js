import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity , Dimensions, Image, Text, ImageBackground, FlatList, Button, Picker,} from 'react-native';
import firebaseDb from '../firebaseDb';
import Constants from 'expo-constants'
import WhiteButton from '../component/WhiteButton'

class food extends Component {


    state = {
        
        Location: null,
        places: null,
        names: null,
    };

   // handleUpdateLocation = Location=> this.setState({Location})
  
    
    getDetails = () => {
      
          firebaseDb.firestore()
          .collection('foodplaces')
          .doc('locations')
          .collection(this.state.Location)
          .get()
          .then(snapshot => {
            const places=[]
            const names=[]
            snapshot.forEach(doc => {
             
                names.push(doc.id)
                 places.push(doc.data())
           })
            
          //  modules.push(" ")
            this.setState({places: places, names: names})
          })
  
    }
  
    render() {

        const placenames=[];
        this.state.names&&this.state.names.map( place =>{
            placenames.push({key: place})
        })
        return (
  
           <SafeAreaView style={styles.container}>
             
              <ImageBackground style={{flex: 1, resizeMode: "contain" }} source={require('../assets/back1.png')}>
              <TouchableOpacity style={{ position: "absolute", top: 10, left: 10}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slidein.png')}/>
                  </TouchableOpacity>
                 <Text style={styles.textb}>Find me Food!</Text>
                <Text style={styles.text1}>Location</Text>
                <Picker style={styles.pickerStyle}
          
                         selectedValue={(this.state && this.state.Location) || 'Select Location'}
                        onValueChange={(value) => {this.setState({Location: value});}}>
                      <Picker.Item label=" Select Location" value="null" />
                      <Picker.Item label="Bukit Timah Campus" value="Bukit Timah Campus" />
                      <Picker.Item label="Faculty of Engineering,YIH,USC" value="Faculty of Engineering,YIH,USC" />
                      <Picker.Item label="Museum" value="Museum" />
                      <Picker.Item label="Prince George's Park" value="Prince George's Park" />
                      <Picker.Item label="School of Business,School of computing,Faculty of Arts and Social Sciences,Ventus,Shaw Foundation Alumni House" value="School of Business,School of computing,Faculty of Arts and Social Sciences,Ventus,Shaw Foundation Alumni House" />
                      <Picker.Item label="Science,University hall,Medicine" value="Science,University hall,Medicine" />
                      <Picker.Item label="University Town,Yale NUS" value="University Town,Yale NUS" />
                </Picker>
             <WhiteButton
              style={styles.button1}
              onPress={this.getDetails}
            >Search</WhiteButton>
           
            <View style={{flex: 2, flexDirection:'row'}}>
            <ScrollView horizontal={true}>
            <View style={{marginLeft:20, marginRight:20}}>
                <FlatList
                data={placenames}
                keyExtractor={item => item.key}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                />
            </View>
            </ScrollView>
            <View style={{alignContent: "center", justifyContent:"center", alignItems:"center"}}>
                <Text> Click on an item to view details!</Text>
            </View>
            </View>
            </ImageBackground>
          
            </SafeAreaView>  
  
        ) 
    }  
  }  
  const styles = StyleSheet.create ({  
    container:{ marginTop: Constants.statusBarHeight,
      flex: 1,
     
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
    padding: 10,
    fontSize: 18,
    height: 44,
    color:"black"
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

  export default food;