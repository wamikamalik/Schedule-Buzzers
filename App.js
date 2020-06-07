import React from 'react';
import { StyleSheet, SafeAreaView, Image, Text, ImageBackground } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WhiteButton from "./component/WhiteButton";
import SignUpContainer from "./container/SignUpContainer"
import SignInContainer from "./container/SignInContainer"
import Main from "./container/Main"
import TermsCond from "./component/TermsCond"

// function Separator() {
//   return <View style={styles.separator} />;
// }

function HomeScreen({navigation}) {
  return (
<SafeAreaView style={styles.container}>
<ImageBackground style={{flex: 1, resizeMode: "cover", justifyContent:"center", alignItems:"center"}} source={require('./assets/homeback.png')}>
<Image style={styles.image} source={require('./assets/ologo.png')}/>
  <Text style={styles.textb}>Schedule Buzzer</Text>
  <Text style={styles.textn}>We have you scheduled !!</Text>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('SignUp')}>Sign Up</WhiteButton>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('SignIn')}>Sign In</WhiteButton>
      </ImageBackground>
</SafeAreaView>
  );
}

const Stack = createStackNavigator();



function App() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator mode='modal' headerMode='none'>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="SignUp" component={SignUpContainer}/>
        <Stack.Screen name="SignIn" component={SignInContainer}/>
        <Stack.Screen name="Main"  options={{headerLeft:null}} component={Main}/>
        <Stack.Screen name="Terms" component={TermsCond}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
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
  container: {
    flex: 1,
    //justifyContent:"center",
    //alignItems:"center",
    backgroundColor: '#2ec4b6',
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
  },
  textn: {
    color: "white",
    fontSize: 30,
    marginBottom: 70
  },
  image: {
    height: 200,
    width: 250
  }
});

export default App
