import React from 'react'
import { SafeAreaView, Image, TextInput, Text, ActivityIndicator, StyleSheet, Button, ImageBackground } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BlackButton from '../component/BlackButton';
import firebaseDb from '../firebaseDb';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'
import {Appbar, Title, Subheading} from 'react-native-paper'

class Profilepage extends React.Component {

    state = {
        name: null,
        userEmail : null,
        phoneNo : null,
        photo: '',
    }

    selectImage = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
        if (pickerResult.cancelled === true) {
          return;
        }
    
          this.setState({
            photo: pickerResult.uri
          })
        }

    handleUpdateName = name => this.setState({name})

    handleUpdatePhone = phoneNo => this.setState({phoneNo})

    componentDidMount () {
        var user = firebaseDb.auth().currentUser;
    
        if (user) {
          this.setState({ 
              //name: user.displayName,
              userEmail: user.email,
            
          })
        } 
        else {
          // No user is signed in.
          this.setState({
              userEmail:"none",
          })
        }
        firebaseDb.firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc)=>{
            if(doc.exists) {
               this.setState({
                    name: doc.data().name,
                    phoneNo: doc.data().phoneNumber,
                    photo: doc.data().photoURL
               }) 
            }
        })
    }

    UpdateUser = () => {  
          firebaseDb.auth().currentUser.updateProfile({
            displayName: this.state.name,
            email: this.state.userEmail,
            phoneNumber: this.state.phoneNo,
            photoURL: this.state.photo,  
          });
          firebaseDb.firestore()
            .collection('users')
            .doc(firebaseDb.auth().currentUser.uid)
            .get()
            .then((doc) => {
                if(doc.exists) {
                doc.ref.update ({
                name: this.state.name,
                phoneNumber: this.state.phoneNo,
                photoURL: this.state.photo ==null?'':this.state.photo,   
            })
            alert("Updated!!")
          }
          })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                   <Appbar style={styles.top}>
   <Appbar.Action
     icon={require('../assets/slideinw.png')}
     onPress={() => this.props.navigation.openDrawer()}
    />
     <Appbar.Content title="Profile" />
    </Appbar>
             
              <ScrollView>
              
                <Subheading>Google users of the app can change these in their google settings only</Subheading>
                <Image style={styles.imagea} source={{uri: this.state.photo}}></Image>
                <BlackButton style={styles.buttona} onPress={this.selectImage}>Change</BlackButton>

                <Title>Name:</Title><TextInput style={styles.textInput} placeholder={this.state.name} onChangeText={this.handleUpdateName} value={this.state.name}/>
                
                <Title>Phone No:</Title><TextInput style={styles.textInput} placeholder={this.state.phoneNo} onChangeText={this.handleUpdatePhone} value={this.state.phoneNo}/>
                
                <Title>Email:</Title><Text style={styles.email}>{this.state.userEmail}</Text>
                
                <Title>To change email or password go to account details</Title>

                
                <BlackButton style={styles.button} onPress={this.UpdateUser}>Update Details</BlackButton>
               </ScrollView>
            </SafeAreaView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: { marginTop: Constants.statusBarHeight,
      flex: 1,
      flexDirection: 'column',
      //justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: '#ffebcd'
    },
    top: {
      backgroundColor:"#c17eef"
  },
    textInput: {
        borderRadius:5,
        backgroundColor:'white',
        fontSize: 20,
        //marginTop: 10,
        //marginLeft: 5,
        // width: 400,
        // height: 50,
        fontWeight: "bold",
        alignSelf:'center',
        alignItems: 'center',
        borderWidth:2,
        //color: 'white'
      },
      email: {
        borderRadius:5,
        //backgroundColor:'white',
        fontSize: 20,
        //marginTop: 10,
        //marginLeft: 5,
        // width: 400,
        // height: 50,
        fontWeight: "bold",
        alignSelf:'center',
        alignItems: 'center',
        //color: 'white'
      },
      text: {
        fontSize: 20,
        marginTop: 10,
        marginLeft:50,
        //fontWeight:'bold',
       // color: "white",
      },
      image: {
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        alignSelf: 'flex-start',
        height: 40,
        width:30,
        marginLeft:15
    },
    imagea: {
      height:140,
      width:140,
      borderRadius: 70,
      alignSelf:'center',
      marginTop: 25,
      marginBottom: 2
    },
    button: {
        marginTop: 25,
        borderRadius:20,
        width:200,
        height:45,
        alignSelf:'center',
      },
      buttona: {
        marginBottom: 20,
        borderRadius:15,
        width:100,
        height:35,
        alignSelf:'center',
        justifyContent: "center"
      },
})

export default Profilepage