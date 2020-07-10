import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Image, Text, ImageBackground,TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants'
import WhiteButton from "./component/WhiteButton";
import SignUpContainer from "./container/SignUpContainer"
import SignInContainer from "./container/SignInContainer"
import Main from "./container/Main"
import TermsCond from "./component/TermsCond"
import firebaseDb from "./firebaseDb"


// function Separator() {
//   return <View style={styles.separator} />;
// }

function SignIn ({navigation}) {
  var provider = new firebaseDb.auth.GoogleAuthProvider();
  provider.addScope('profile')
  provider.addScope('email')
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  firebaseDb.auth().signInWithRedirect(provider);
  //alert("hi")

}
//   try {
//     await GoogleSignIn.askForPlayServicesAsync();
//     const { type, user } = await GoogleSignIn.signInAsync();
//     const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
//     if (type === 'success') {
//       await firebaseDb.auth().setPersistence(firebaseDb.auth.Auth.Persistence.LOCAL);
//       const credential = firebaseDb.auth.GoogleAuthProviderDb.credential(data.idToken, data.accessToken);
//       firebase.auth().signInWithCredential(credential).then(()=>{
//             var user = firebaseDb.auth().currentUser
//             if(!user) {
//               alert("no")
//             }
//             else {
//               alert(user.uid)
//             }
//             // The signed-in user info.
//             //var user = result.user;
//             handleUser(user.uid)
//             alert("hi")
//             navigation.navigate("Main")
//       });
//     }
//   } catch ({ message }) {
//     alert('login: Error:' + message);
//   }
// }


function HomeScreen({navigation}) {
  
  return (
<SafeAreaView style={styles.container}>
<ImageBackground style={{flex: 1, resizeMode: "cover", justifyContent:"center", alignItems:"center"}} source={require('./assets/homeback2.jpg')}>
<Image style={styles.image} source={require('./assets/ologo.png')}/>
  <Text style={styles.textb}>Schedule</Text>
  <Text style={styles.textb}>Buzzer</Text>
  <Text style={styles.textn}>We have you scheduled !!</Text>
      {/* <WhiteButton style={styles.button} onPress={() =>navigation.navigate('SignUp')}>Sign Up</WhiteButton> */}
      <WhiteButton style={styles.button} onPress={() =>SignIn(navigation)}>Sign In with Google</WhiteButton>
      <WhiteButton style={styles.button} onPress={() =>{  
          let user = null;
          firebaseDb.auth().getRedirectResult().then(function(result) {
            // The signed-in user info.
            //alert("hi1")
            user = result.user;
            
            if(user==null) {
              alert("Please Sign In")
            }
            else {
              //alert("shld go")
              firebaseDb.firestore()
              .collection('users')
              .doc(user.uid)
              .set ({
                name: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL
              })
              .catch(err => console.error(err))
              //alert(user)
              navigation.navigate("Main")
            }
          
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            alert(errorMessage)
          });
      }}>Let's Go!</WhiteButton>
      <Text style={styles.textA}>By proceeding you agree to the </Text><TouchableOpacity onPress={()=>navigation.navigate('Terms')}><Text style={styles.texta}>Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
      </ImageBackground>
</SafeAreaView>
  );
}

const Stack = createStackNavigator();



class App extends Component {
  render() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator mode='modal' headerMode='none'>
        <Stack.Screen name="Home" component={HomeScreen}/>
        {/* <Stack.Screen name="SignUp" component={SignUpContainer}/>
        <Stack.Screen name="SignIn" component={SignInContainer}/> */}
        <Stack.Screen name="Main"  options={{headerLeft:null}} component={Main}/>
        <Stack.Screen name="Terms" component={TermsCond}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
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
  container: { marginTop: Constants.statusBarHeight,
    flex: 1,
    //justifyContent:"center",
    //alignItems:"center",
    backgroundColor: '#3498db',
  },
  button: {
    borderRadius:15,
    width: 200,
    height: 50,
    marginBottom: 30
  },
  textb: {
    color: "white",
    fontSize: 50,
    fontStyle:"italic",
    fontWeight:"bold",
    alignSelf:"center",
    justifyContent:'center'
  },
  textn: {
    color: "white",
    fontSize: 30,
    marginBottom: 70,
    alignSelf:"center",
    justifyContent:"center"
  },
  image: {
    height: 200,
    width: 250,
    alignSelf:"center",
    justifyContent:"center"
  }
});

export default App
