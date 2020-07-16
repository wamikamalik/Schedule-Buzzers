import React from 'react'
import { SafeAreaView, Image, TextInput, Text, ActivityIndicator, StyleSheet, ImageBackground,Dimensions, borderWidth} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import BlackButton from '../component/BlackButton';
import firebaseDb from '../firebaseDb';
import Constants from 'expo-constants'
import {Appbar, Title, Subheading} from 'react-native-paper';

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
    if(this.state.newPassword) {
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
      alert("Please enter new password")
    }
  }
  else {
    alert("Please enter current password")
  }
}

  changeEmail  =() => {
    if(this.state.password) {
    if(this.state.newEmail) {
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
    else{
      alert("Please enter new email")
    }
    }
    else {
      alert("Please enter current password")
    }
  }

  render() {
      return (
        <SafeAreaView style={styles.container}>
        
          <Appbar >
   <Appbar.Action
     icon={require('../assets/slideinw.png')}
     onPress={() => this.props.navigation.openDrawer()}
    />
     <Appbar.Content title="Account Details" />
    </Appbar>
            <Subheading>Enter Current Password:</Subheading>
            <TextInput secureTextEntry style={styles.textInput} placeholder='Password' onChangeText={this.handleUpdatePassword} value={this.state.password}/> 
            <Title>Change Email</Title>
            <Subheading>Enter new email:</Subheading>
            <TextInput style={styles.textInput} placeholder='New Email' onChangeText={this.handleUpdateEmail} value={this.state.newEmail}/> 
            <BlackButton style={styles.button} onPress={this.changeEmail}>Update Email</BlackButton>
            
            <Title>Change Password</Title>
            <Subheading>Enter new password:</Subheading>
            <TextInput secureTextEntry style={styles.textInput} placeholder='New Password' onChangeText={this.handleUpdatenewPassword} value={this.state.newPassword}/> 
            <BlackButton style={styles.button} onPress={this.changePassword}>Update Password</BlackButton>
        
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

    textInput: {
        borderWidth:2,
        backgroundColor:'white',
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