import React from 'react'
import { SafeAreaView, Image, TextInput,TouchableOpacity, Text, ActivityIndicator, StyleSheet, ImageBackground, ScrollView} from 'react-native'
import Constants from 'expo-constants'

class about extends React.Component{
render (){
return (

<SafeAreaView style={styles.container}>
<ImageBackground style={{flex: 1, resizeMode: "cover"}} source={require('../assets/back1.png')}>
<ScrollView style={styles.scrollview}>
<TouchableOpacity style={{marginTop: 20}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slidein.png')}/>
                </TouchableOpacity>
<Text style={styles.text1}>About the app</Text>
<Text style={styles.texta}>
OUR AIM BEHIND SCHEDULE BUZZERS:</Text>
<Text style={styles.texta}>
We hope to help people schedule their lives at NUS. We hope to provide an app that is capable of performing
multiple functions such as providing reminders for classes, giving suggestions on the buses to board,
the most important - keeping a track of all the assignment deadlines and last but not the least, 
satisfy your hunger craving in the midst of a busy day by providing you with a list of the restaurants in the area.
</Text>
<Text style={styles.texta}>
Version: 6.8.1
</Text>
<Text style={styles.texta}>
Copyright 2020 Schedule Buzzers
</Text>
<Text style={styles.texta}>
Thank you for downloading Schedule Buzzers. If you like it, please leave us a review to provide you more upgraded and better version 
of the app.
</Text>
<Text style={styles.texta}>
Thanking you 
</Text>
<Text style={styles.texta}>
Shreya and Wamika 
</Text>
<Text style={styles.texta}>
(NUS)
</Text>
</ScrollView>
</ImageBackground>
</SafeAreaView>
)
}
}

const styles = StyleSheet.create({
    container: { marginTop: Constants.statusBarHeight,
        flex: 1,
       // flexDirection: 'column',
        backgroundColor: '#02b7cc',
    
      },
      image: {
        //color: "black",
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        alignSelf: 'flex-start',
        height: 40,
        width:30,
        marginLeft:15
    },
      text1 :{
        fontSize: 28,
        fontWeight:"bold",
        alignSelf:'center',
        marginTop:30,
        textDecorationLine:"underline",
        justifyContent: 'center',

      },
      texta:{
        fontSize: 20,
        marginTop: 20,
        marginLeft: 5,
        alignSelf: "center",
        //color: "white"
      }



})

export default about