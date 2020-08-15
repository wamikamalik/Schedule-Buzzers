import React from 'react'
import { View, SafeAreaView, Image, Text, ActivityIndicator, StyleSheet, ImageBackground,Dimensions, borderWidth} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import BlackButton from '../component/BlackButton';
import firebaseDb from '../firebaseDb';
import Constants from 'expo-constants'
import {Appbar, Title, Subheading,TextInput} from 'react-native-paper';

class accntDetails extends React.Component {

    state = {
        password: null,
        userEmail : null,
        newEmail: null,
        newPassword: null,
        opene: false,
        openp: false
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
        
          <Appbar style={styles.top}>
   <Appbar.Action
     icon={require('../assets/slideinw.png')}
     onPress={() => this.props.navigation.openDrawer()}
    />
     <Appbar.Content title="Account Details" />
    </Appbar>
    <View style={{marginLeft:15, marginRight: 15}}>
            <Subheading>(*Not for Google users of the app.)</Subheading>
            <Subheading>Enter Current Password:</Subheading>
            <TextInput secureTextEntry style={styles.textInput} mode ="outlined" label="Current Password" placeholder='Password' onChangeText={this.handleUpdatePassword} value={this.state.password}/> 
            <View style={{marginTop: 10,flex:2,flexDirection:"row", marginRight: 15}}>
              <View style={{width:(Dimensions.get('window').width/2), height:50}}>
                <TouchableOpacity onPress = {()=>{this.setState({opene:!this.state.opene})}}><Title>Change Email </Title></TouchableOpacity>
                </View>
                <View style={{width:(Dimensions.get('window').width/2-40), height:50, alignItems:"flex-end"}}>
                  {!this.state.opene&&<TouchableOpacity onPress = {()=>{this.setState({opene:!this.state.opene})}}><Title style={{ fontSize:30}}>+</Title></TouchableOpacity>}
                  {this.state.opene&&<TouchableOpacity onPress = {()=>{this.setState({opene:!this.state.opene})}}><Title style={{ fontSize:30}}>-</Title></TouchableOpacity>}
                </View>
              </View>
            <View style={{marginTop:40}}>
            {this.state.opene&&<Subheading>Enter new email:</Subheading>}
            {this.state.opene&&<TextInput style={styles.textInput} mode ="outlined" label="New Email" placeholder='New Email' onChangeText={this.handleUpdateEmail} value={this.state.newEmail}/>}
            {this.state.opene&&<BlackButton style={styles.button} onPress={this.changeEmail}>Update Email</BlackButton>}
            </View>
            <View style={{marginTop: 10,flex:2,flexDirection:"row", marginRight: 15}}>
              <View style={{width:(Dimensions.get('window').width/2), height:50}}>
                <TouchableOpacity onPress = {()=>{this.setState({openp:!this.state.openp})}}><Title>Change Password </Title></TouchableOpacity>
                </View>
                <View style={{width:(Dimensions.get('window').width/2-40), height:50, alignItems:"flex-end"}}>
                  {!this.state.openp&&<TouchableOpacity onPress = {()=>{this.setState({openp:!this.state.openp})}}><Title style={{ fontSize:30}}>+</Title></TouchableOpacity>}
                  {this.state.openp&&<TouchableOpacity onPress = {()=>{this.setState({openp:!this.state.openp})}}><Title style={{ fontSize:30}}>-</Title></TouchableOpacity>}
                </View>
              </View>
            <View style={{marginTop:40}}>
            {/* <TouchableOpacity onPress = {()=>{this.setState({openp:!this.state.openp})}}><Title style={{marginTop:10,alignSelf:"center"}}>Change Password v</Title></TouchableOpacity> */}
            {this.state.openp&&<Subheading>Enter new password:</Subheading>}
            {this.state.openp&&<TextInput secureTextEntry style={styles.textInput} mode ="outlined" label="New Password" placeholder='New Password' onChangeText={this.handleUpdatenewPassword} value={this.state.newPassword}/>}
             {this.state.openp&&<BlackButton style={styles.button} onPress={this.changePassword}>Update Password</BlackButton>}
             </View>
            </View>
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
    button: {
        marginTop: 20,
        borderRadius:20,
        width:250,
        height:45,
        alignSelf:'center',
      },
})


export default accntDetails