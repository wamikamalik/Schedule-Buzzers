import React from 'react'
import { View, SafeAreaView, Image, Text, ActivityIndicator,Dimensions, StyleSheet, Button, ImageBackground } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BlackButton from '../component/BlackButton';
import firebaseDb from '../firebaseDb';
import * as ImagePicker from 'expo-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import Constants from 'expo-constants'
import {Appbar, Title, Subheading,TextInput} from 'react-native-paper'
import {decode, encode} from 'base-64';

if (!global.btoa) {
global.btoa = encode;
}
if (!global.atob) {
global.atob = decode;
}

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
    // enable this option so that the response data conversion handled automatically
    auto : true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array, 
    // the response body will be considered as binary data and the data will be stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type 
    // contains string `application/octet`.
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()

class Profilepage extends React.Component {

    state = {
        name: null,
        userEmail : null,
        phoneNo : null,
        photo: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
        photo1:'',
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
              //  let imageRef = firebaseDb.app().storage("gs://schedule-buzzers-2.appspot.com").ref(this.state.photo1);
              //  imageRef
              //    .getDownloadURL()
              //    .then((url) => {
              //      //from url you can fetched the uploaded image easily
              //      //allowedNodeEnvironmentFlags(url)
              //      this.setState({photo: url});
              //    })
              //    .catch((e) => console.log('getting downloadURL of image error => ', e));
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
                //photoURL: this.state.photo ==null?'':this.state.photo,   
            })
            //let file = new Blob(this.state.photo)
            let uploadBlob = null
            fs.readFile(this.state.photo,'base64')
            .then((data)=>{
              return Blob.build(data, {type: 'application/octet-stream;BASE64'})
            }).then((blob)=>{
              uploadBlob = blob
              firebaseDb.app().storage("gs://schedule-buzzers-2.appspot.com").ref().child(this.state.name).put(blob,{contentType: 'application/octet-stream'})
              // .on('state_changed', function(snapshot){
              //   //You can check the image is now uploaded in the storage bucket
              //   alert(snapshot)
              //   firebaseDb.firestore()
              // .collection('users')
              // .doc(firebaseDb.auth().currentUser.uid)
              // .get()
              // .then((doc) => {
              //     if(doc.exists) {
              //     doc.ref.update ({
              //     photoURL: snapshot,   
              //     })
              //     }
              // })
              // })
              // console.log(`has been successfully uploaded.`);
              .snapshot.ref.getDownloadURL().then(function(downloadURL){
                  uploadBlob.close()
                  firebaseDb.firestore()
                  .collection('users')
                  .doc(firebaseDb.auth().currentUser.uid)
                  .get()
                  .then((doc) => {
                      if(doc.exists) {
                      doc.ref.update ({
                      photoURL: downloadURL,   
                      })
                      }
                  })
              })
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
              <View style={{marginLeft:15, marginRight: 15}}>
                <Subheading>(*Only local changes for Google users.)</Subheading>
                <Image style={styles.imagea} source={{uri: this.state.photo}}></Image>
                <BlackButton style={styles.buttona} onPress={this.selectImage}>Change</BlackButton>

                <Title style = {styles.text1}>Name</Title><TextInput style={styles.textInput} mode="outlined" label="Name" placeholder={this.state.name} onChangeText={this.handleUpdateName} value={this.state.name}/>
                
                <Title style = {styles.text1}>Phone No</Title><TextInput style={styles.textInput}mode="outlined" label="Phone No" placeholder={this.state.phoneNo} onChangeText={this.handleUpdatePhone} value={this.state.phoneNo}/>
                
                <Title style = {styles.text1}>Email</Title><Text style={styles.email}>{this.state.userEmail}</Text>
                
                <Subheading >To change email or password go to account details</Subheading>

                
                <BlackButton style={styles.button} onPress={this.UpdateUser}>Update Details</BlackButton>
                </View>
               </ScrollView>
            </SafeAreaView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: { 
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
    // borderWidth:2,
    // backgroundColor:'white',
    fontSize: 20,
    //marginTop: 10,
    marginLeft: 5,
    //width: (Dimensions.get('window').width>400)?400: Dimensions.get('window').width- 50,
    //height: 50,
    //fontWeight: "bold",
    //alignSelf:'center',
   // alignItems: 'center',
    //color: "white"
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
      marginBottom: 10
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
      text1: {
       // fontSize: 20,
        marginTop: 10,
        //marginLeft:50,
        fontWeight:'bold',
       color: "black",
       alignSelf:'center'
      },
})

export default Profilepage