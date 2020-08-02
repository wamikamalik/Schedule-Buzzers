import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Image, Text, ImageBackground } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants'
import WhiteButton from "./component/WhiteButton";
import SignUpContainer from "./container/SignUpContainer"
import SignInContainer from "./container/SignInContainer"
import Main from "./container/Main"
import TermsCond from "./component/TermsCond"
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import firebaseDb from './firebaseDb'
import BlackButton from './component/BlackButton';


// function Separator() {
//   return <View style={styles.separator} />;
// }

function HomeScreen({navigation}) {
  return (
<SafeAreaView style={styles.container}>
<ImageBackground style={{flex: 1, resizeMode: "cover", justifyContent:"center", alignItems:"center"}} source={require('./assets/homeback2.jpg')}>
<Image style={styles.image} source={require('./assets/ologo.png')}/>
  <Text style={styles.textb}>Schedule</Text>
  <Text style={styles.textb}>Buzzer</Text>
  <Text style={styles.textn}>We have you scheduled !!</Text>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('SignUp')}>Sign Up</WhiteButton>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('SignIn')}>Sign In</WhiteButton>
      <WhiteButton style={{    borderRadius:15,
        width: 200,
        height: 50,
        marginBottom: 30
        }} 
        onPress={() =>{navigation.navigate('google')}}>Google Sign In</WhiteButton>
      </ImageBackground>
</SafeAreaView>
  );
}

const Stack = createStackNavigator();



class App extends Component {
  
    componentDidMount() {
      GoogleSignin.configure({
        webClientId: '458566252197-f3juqgm6r2es8cjk2vat5t10nd37s5tf.apps.googleusercontent.com', 
        offlineAccess: true, 
        hostedDomain: '', 
        loginHint: '', 
        forceConsentPrompt: true, 
      });
      // if(firebaseDb.auth().currentUser.uid) {
      //   firebaseDb.auth().signOut().then(function() {
      //     // Sign-out successful.
      //   }).catch(function(error) {
      //     // An error happened.
      //   });
      // }
    }
    render() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator mode='modal' headerMode='none'>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="SignUp" component={SignUpContainer}/>
        <Stack.Screen name="SignIn" component={SignInContainer}/>
        <Stack.Screen name="Main"  options={{headerLeft:null}} component={Main}/>
        <Stack.Screen name="Terms" component={TermsCond}/>
        <Stack.Screen name="google"  options={{headerLeft:null}} component={signgoogle}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

export class signgoogle extends Component {

  state = {
    user: false
  }

  async componentDidMount() {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // create a new firebase credential with the token
      const credential = firebaseDb.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
      // login with credential
      alert(userInfo.idToken)
    const user = await firebaseDb.auth().signInWithCredential(credential) 
    //alert(JSON.stringify(user)) 
    //alert(JSON.stringify(user.user))
    //alert(uid)
      firebaseDb.firestore()
      .collection('users')
      .doc(user.user.uid)
      .set ({
        name: user.user.displayName,
        email: user.user.email,
        phoneNumber: user.user.phoneNumber,
        photoURL: user.user.photoURL
      })
      .catch(err => console.error(err))
      this.setState({user:user.user})
    } 
    catch (error) {
      console.log(error)
    }
  }
  render() {
    return(

      <SafeAreaView style={styles.container1}>
      <BlackButton style={styles.button} onPress={()=>{
        if(this.state.user.uid) {
        this.props.navigation.navigate("Main")
        }
        else {
          alert("please sign in")
          this.props.navigation.navigate("Home")
        }
      }}>
          Let's Go
        </BlackButton>
      </SafeAreaView>
    )
  }
}


// class App extends React.Component {
//   state = {
//     done: false,
//     signUp: false,
//     signIn: false
//   }



//   render() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Button onPress={() => {
//         if(!this.done) {
//             this.setState ({
//               signUp: true,
//               signIn: false
//             })
//         }
//         }
//       } title = "Sign Up" />
//        {
//         this.state.signUp && this.navigation.navigate('SignUpContainer ') || this.state.signIn && <SignInContainer />
//       }
//       <Button onPress={() => {
//             this.setState ({
//               signUp: false,
//               signIn: true
//             })
//         }
//       } title = "Sign In"/>
     
//     </SafeAreaView>
//   );
//   }
// }

const styles = StyleSheet.create({
  container: {marginTop: Constants.statusBarHeight,
    flex: 1,
    //justifyContent:"center",
    //alignItems:"center",
    backgroundColor: '#3498db',
  },
  container1: { marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#ffebcd',
  },
  button: {
    borderRadius:15,
    width: 200,
    height: 55,
    marginBottom: 30
  },
  textb: {
    color: "white",
    fontSize: 48,
    fontStyle:"italic",
    fontWeight:"bold",
    alignSelf:"center",
    justifyContent:'center'
  },
  textn: {
    color: "white",
    fontSize: 30,
    marginBottom: 40,
    alignSelf:"center",
    justifyContent:"center"
  },
  image: {
    height: 200,
    width: 200,
    alignSelf:"center",
    justifyContent:"center",
    marginTop: 20
  }
});

export default App