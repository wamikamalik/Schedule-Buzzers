import React from 'react'
import { View, KeyboardAvoidingView, Image, Text, StyleSheet,Dimensions } from 'react-native'
import firebaseDb from '../firebaseDb'
import BlackButton from '../component/BlackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {CheckBox} from 'react-native-elements'
import Constants from 'expo-constants'
import {Appbar, Title, Subheading, TextInput} from 'react-native-paper';

class SignUpContainer extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    password1:'',
    signUpSuccess: false,
    done: false,
    checked: false,
    photo: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
  }

  handleUpdateName = name => this.setState({name})

  handleUpdateEmail = email => this.setState({email})

  handleUpdatePassword = password => this.setState({password})

  handleUpdatePassword1 = password1 => this.setState({password1})

  handleCreateUser = () => {
    firebaseDb.auth().createUserWithEmailAndPassword(this.state.email, this.state.password) 
    .then((res) => {
      res.user.updateProfile({
        displayName: this.state.name,
        email: this.state.email
      })
      var uid = res.user.uid;
      this.handleUser(uid)
      this.props.navigation.navigate("Main")
    })
    .catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      var errorMessage = error.message;
      // if (errorCode == 'auth/weak-password') {
      //   alert('The password is too weak.');
      // } else {
        alert(errorMessage);
      //}
      console.log(error);
    });
  // .add({
  //   name: this.state.name,
  //   email: this.state.email,
  //   password: this.state.password
  //  })
  //.then(() => this.setState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   password1:'',
  //   signUpSuccess: true,
  //   done: true
  // }))
  
  }

  handleUser = (uid) => {
    firebaseDb.firestore()
    .collection('users')
    .doc(uid)
    .set ({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phoneNumber: null,
      photoURL: this.state.photo
    })
    .catch(err => console.error(err))
  }
  render() {
    const { name, email, password, password1, signUpSuccess, done } = this.state;

    return (
     <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Name" label="Name" mode = "outlined" onChangeText={this.handleUpdateName} value={name}/>
        <TextInput style={styles.textInput} placeholder="Email" label="Email" mode="outlined" onChangeText={this.handleUpdateEmail} value={email}/>
        <TextInput secureTextEntry style={styles.textInput} placeholder="Password" label="Password" mode="outlined"
        onChangeText={this.handleUpdatePassword} value={password}/>
        <TextInput secureTextEntry style={styles.textInput} placeholder="Repeat Password" label="Repeat Password" mode="outlined"
        onChangeText={this.handleUpdatePassword1} value={password1}/>
        <CheckBox containerStyle={{backgroundColor: '#ffebcd',borderColor:'#ffebcd'}} 
        title ={<View>
          <Text style={styles.textA}>I agree to the </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Terms')}><Text style={styles.texta}>Terms of Service and Privacy Policy</Text></TouchableOpacity>
          </View>} checked={this.state.checked} onPress={() => this.setState({checked: !this.state.checked})}/>
        <BlackButton style={styles.button} onPress={() => {
          if (name.length && email.length && password.length && password == password1 && this.state.checked == true) {
            this.handleCreateUser()
            //this.handleUser()
          }
          else {
            this.setState({
              name: '',
              email: '',
              password: '',
              password1:'',
              signUpSuccess: false,
              done: true
            }) 
          }
        }}>
          Sign Up
        </BlackButton>
        {
          signUpSuccess == true && <Text style={styles.text}>Sign Up Successful!</Text> 
          || signUpSuccess == false && done && <Text style={styles.textB}>Sign Up Unsuccessful!</Text>
        }
        <Text style={styles.textC}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignIn')}><Text style={styles.textC}> Sign in</Text></TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebcd'
  },
  textInput: {
    // borderRadius:5,
    // borderWidth: 2,
    backgroundColor:'white',
    fontSize: 20,
    marginBottom: 8,
    width: (Dimensions.get('window').width>400)?400:Dimensions.get('window').width-40,
  },
  button: {
    marginTop: 20,
    borderRadius:20,
    width:150,
    height:45
  },
  text: {
    fontSize: 20,
    color: 'green',
    marginTop: 40
  },
  textA: {
    //marginTop:25,
    textAlign: "center",
    fontSize: 15
  },
  texta:{
    //marginTop:25,
    textAlign: "center",
    fontSize: 15,
    textDecorationLine:'underline'
  },
  textB: {
    fontSize: 20,
    color: 'red',
    marginTop: 40
  },
  textC: {
    marginTop : 10,
    //color: 'white',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  }
})

export default SignUpContainer
