import React from 'react'
import { SafeAreaView, Image, TextInput, Text, ActivityIndicator, StyleSheet, ImageBackground,Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import WhiteButton from '../component/WhiteButton';
import firebaseDb from '../firebaseDb';
import Constants from 'expo-constants'

class accntDetails extends React.Component {

    state = {
        password: null,
        userEmail : null,
        newEmail: null,
        newPassword: null,
    }

    handleUpdatePassword = password => this.setState({password})
    handleUpdateEmail = newEmail => this.setState({newEmail})
    handleUpdatenewPassword = newPassword => this.setState({newPassword})

reauthenticate = (currentPassword) => {
    var user = firebaseDb.auth().currentUser;
    var cred = firebaseDb.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  changePassword = () => {
    if(this.state.password) {
    this.reauthenticate(this.state.password).then(() => {
      var user = firebaseDb.auth().currentUser;
      user.updatePassword(this.state.newPassword).then(() => {
        alert("Password updated!");
      }).catch((error) => { alert(error); });
    }).catch((error) => { alert(error); });
    this.reauthenticate(this.state.password).then(() => {
    firebaseDb.firestore()
    .collection('users')
    .doc(firebaseDb.auth().currentUser.uid)
    .get()
    .then((doc) => {
        if(doc.exists) {
        doc.ref.update ({
        password: this.state.newPassword,  
    })
  }
    else {
      alert("No Such User!!")
    }
})
    })
  }
  else {
    alert("Please enter current password")
  }
}

  changeEmail  =() => {
    if(this.state.password) {
    this.reauthenticate(this.state.password).then(() => {
      var user = firebaseDb.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
        alert("Email updated!");
      }).catch((error) => { alert(error); });
    }).catch((error) => { alert(error); });
    this.reauthenticate(this.state.password).then(() =>{
      firebaseDb.firestore()
            .collection('users')
            .doc(firebaseDb.auth().currentUser.uid)
            .get()
            .then((doc) => {
                if(doc.exists) {
                doc.ref.update ({
                email: this.state.newEmail,  
            })
          }
          else {
            alert("No Such User!!")
          }
        })
      })
    }
    else {
      alert("Please enter current password")
    }
  }

  render() {
      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground style={{flex: 1, resizeMode: "cover"}} source={require('../assets/back1.png')}>
            <TouchableOpacity style={{marginTop: 20}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slideinw.png')}/>
            </TouchableOpacity>
            <Text style={styles.text}>Enter Current Password:</Text>
            <TextInput secureTextEntry style={styles.textInput} placeholder='Password' onChangeText={this.handleUpdatePassword} value={this.state.password}/> 
            <Text style={styles.texta}>Change Email</Text>
            <Text style={styles.text}>Enter new email:</Text>
            <TextInput style={styles.textInput} placeholder='New Email' onChangeText={this.handleUpdateEmail} value={this.state.newEmail}/> 
            <WhiteButton style={styles.button} onPress={this.changeEmail}>Update Email</WhiteButton>
            
            <Text style={styles.texta}>Change Password</Text>
            <Text style={styles.text}>Enter new password:</Text>
            <TextInput secureTextEntry style={styles.textInput} placeholder='New Password' onChangeText={this.handleUpdatenewPassword} value={this.state.newPassword}/> 
            <WhiteButton style={styles.button} onPress={this.changePassword}>Update Password</WhiteButton>
            </ImageBackground>
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
      backgroundColor: '#02b7cc'
    },

    textInput: {
        borderRadius:5,
        //backgroundColor:'white',
        fontSize: 20,
        //marginTop: 10,
        marginLeft: 5,
        width: (Dimensions.get('window').width>400)?400: Dimensions.get('window').width- 50,
        height: 50,
        fontWeight: "bold",
        alignSelf:'center',
        alignItems: 'center',
        //color: "white"
      },
      text: {
        fontSize: 20,
        marginTop: 10,
        marginLeft:50,
        //fontWeight:'bold',
        //color: "white",
      },
      texta: {
        fontSize: 22,
        marginTop: 30,
        marginLeft:50,
        fontWeight:'bold',
        textDecorationLine:'underline',
        //color: "white",
      },
      image: {
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        alignSelf: 'flex-start',
        height: 40,
        width:30,
        marginLeft:15
    },
    button: {
        marginTop: 20,
        borderRadius:20,
        width:250,
        height:45,
        alignSelf:'center',
      },
})


export default accntDetails