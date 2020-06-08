import React from 'react'
import { View, Image, TextInput, Text, ActivityIndicator, StyleSheet } from 'react-native'
import WhiteButton from '../component/WhiteButton';
import firebaseDb from '../firebaseDb';
import { TouchableOpacity } from 'react-native-gesture-handler';

class SignInContainer extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    signIn: false,
    exists: false
  }

  handleUpdateName = name => this.setState({name})

  handleUpdateEmail = email => this.setState({email})

  handleUpdatePassword = password => this.setState({password})

  handleSignIn = () => {
    firebaseDb.auth().signInWithEmailAndPassword(this.state.email, this.state.password) .then(() => 
    this.props.navigation.navigate("Main")
    // this.setState ({
    //   name: '',
    //   email: '',
    //   password: '',
    //   signIn: true,
    //   exists: true})
    )
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      });
  }
      

  render() {
    const { name, email, password, signIn, exists } = this.state;

    return (
      <View style={styles.container}>
        {/* <TextInput style={styles.textInput} placeholder="Name" onChangeText={this.handleUpdateName} value={name}/>  */}
        <TextInput style={styles.textInput} placeholder="Email" onChangeText={this.handleUpdateEmail} value={email}/>
        <TextInput secureTextEntry style={styles.textInput} placeholder="Password" 
        onChangeText={this.handleUpdatePassword} value={password}/>
        <WhiteButton style={styles.button} onPress={this.handleSignIn}>
          Sign In
        </WhiteButton>
        <Text style={styles.textA}>By proceeding you agree to the </Text><TouchableOpacity onPress={()=>this.props.navigation.navigate('Terms')}><Text style={styles.texta}>Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.textC}>Don't have an account?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}><Text style={styles.textC}> Sign up!</Text></TouchableOpacity>
        
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
    backgroundColor: '#2ec4b6'
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: "white",
    fontSize: 20,
    marginBottom: 8,
    width: 400,
    height: 50
  },
  button: {
    marginTop: 42,
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
    marginTop: 10,
    textAlign: "center",
    fontSize: 15
  },
  texta: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    textDecorationLine:"underline"
  }, 
  textC: {
    marginTop : 10,
    color: 'white',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  } 
})

export default SignInContainer
