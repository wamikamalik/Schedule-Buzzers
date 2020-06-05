import React from 'react'
import { SafeAreaView, Image, TextInput, Text, Button, ActivityIndicator, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

 import firebaseDb from '../firebaseDb';
// import SignInContainer from "./SignInContainer"
 import  Profilepage  from './Profilepage'
 import App from '../App'
 import accntDetails from './accntDetails'
 import home from './home'
 import assignments from './assignments'
 import schedule from './schedule'
import about from './about'

const DrawerNavigator = createDrawerNavigator();


//   function CustomDrawerContent(props) {
//     return (
//         <DrawerContentScrollView {...props}>
//         <Image style={{flex: 1 , position : 'absolute' , top : 0 , height :Dimensions.get('window').height , width : Dimensions.get('window').width}} source={require('../assets/back.png')}/>
//         <SafeAreaView style={{flex: 1 , backgroundColor : 'transparent'}} forceInset={{ top: 'always', horizontal: 'never' }}>
//         <DrawerItems {...props} />
//         </SafeAreaView>
//         </DrawerContentScrollView>
//     );
//   }

{/* drawerContent={props => <CustomDrawerContent {...props} />}  iin naviga container*/}

class Main extends React.Component {

    render() {
        return (
            <NavigationContainer independent={true}> 
                <DrawerNavigator.Navigator>
                    <DrawerNavigator.Screen name="Home" options={{drawerIcon: config => <Image style={styles.image1} source={require('../assets/home.png')}/>}} component={home}/>
                    <DrawerNavigator.Screen name="Add Schedule" options={{drawerIcon: config => <Image style={styles.image1} source={require('../assets/calendar-add-512.png')}/>}} component={schedule}/>
                    <DrawerNavigator.Screen name="Add Assignments" options={{drawerIcon: config => <Image style={styles.image1} source={require('../assets/assign.png')}/>}} component={assignments}/>
                    <DrawerNavigator.Screen name="Profile" options={{drawerIcon: config => <Image style={styles.image1} source={require('../assets/profile.png')}/>}} component={Profilepage}/>
                    <DrawerNavigator.Screen name="Account Details" options={{drawerIcon: config => <Image style={styles.image1} source={require('../assets/accnt.png')}/>}} component={accntDetails}/>
                     <DrawerNavigator.Screen name="About the app" options={{drawerIcon: config => <Image style={styles.image1} source={require('../assets/abouticon.png')}/>}} component={about}/>                                                                                                                     
                    <DrawerNavigator.Screen name="Sign Out" options={{drawerIcon: config => <Image style={styles.image1} source={require('../assets/logout.png')}/>}} component={App}/>
                </DrawerNavigator.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: '#2ec4b6'
    },
    image: {
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        alignSelf: 'flex-start',
        height: 40,
        width:30,
        marginLeft:15
    },
    image1: {
        height: 40,
        width:40,
        marginLeft: 5
    },
    text: {
        fontWeight:'bold',
        fontSize: 24,
        alignSelf:'center',
       
    },
    profile: {
        width: 200,
        height: 200,
        alignSelf:'center',
        
    }
})

export default Main
