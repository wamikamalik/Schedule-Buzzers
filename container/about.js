import React from 'react'
import { SafeAreaView, Image, TextInput,TouchableOpacity, Text, ActivityIndicator, StyleSheet, ImageBackground, ScrollView} from 'react-native'
import Constants from 'expo-constants'
import {Appbar, Title, Subheading} from 'react-native-paper';
class about extends React.Component{
render (){
return (

<SafeAreaView style={styles.container}>
<Appbar style={styles.top}>
   <Appbar.Action
     icon={require('../assets/slideinw.png')}
     onPress={() => this.props.navigation.openDrawer()}
    />
     <Appbar.Content title="About the App" />
    </Appbar>

<ScrollView style={styles.scrollview}>

<Title style={styles.text1}>
OUR AIM BEHIND SCHEDULE BUZZERS:</Title>
<Subheading style={styles.text1}>
We hope to help people schedule their lives at NUS. We hope to provide an app that is capable of performing
multiple functions such as providing reminders for classes, giving suggestions on the buses to board,
the most important - keeping a track of all the assignment deadlines and last but not the least, 
satisfy your hunger craving in the midst of a busy day by providing you with a list of the restaurants in the area.
</Subheading>
<Subheading style={styles.text1}>
Version: 6.8.1
</Subheading>
<Subheading style={styles.text1}>
Copyright 2020 Schedule Buzzers
</Subheading>
<Subheading style={styles.text1}>
Thank you for downloading Schedule Buzzers. If you like it, please leave us a review to provide you more upgraded and better version 
of the app.
</Subheading>
<Subheading style={styles.text1}>
Thanking you 
</Subheading>
<Subheading style={styles.text1}>
Shreya and Wamika 
</Subheading>
<Subheading style={styles.text1}>
(NUS)
</Subheading>
</ScrollView>

</SafeAreaView>
)
}
}

const styles = StyleSheet.create({
    container: { marginTop: Constants.statusBarHeight,
        flex: 1,
       // flexDirection: 'column',
        backgroundColor: '#ffebcd',
    
      },
      top: {
        backgroundColor:"#c17eef"
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
        //fontSize: 28,
        //fontWeight:"bold",
        alignSelf:'center',
        //marginTop:30,
        //textDecorationLine:"underline",
        //justifyContent: 'center',

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