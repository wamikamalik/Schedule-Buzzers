import React from 'react'
import { SafeAreaView, Image, TextInput, Text, ActivityIndicator, StyleSheet, ImageBackground, ScrollView} from 'react-native'


class about extends React.Component{
render (){
return (

<SafeAreaView style={styles.container}>
<ScrollView style={styles.scrollview}>
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
</SafeAreaView>
)
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems:"center",
        backgroundColor: '#2ec4b6',
      paddingHorizontal: 100,
    
      },

      scrollview: {

        marginHorizontal: 20
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
        alignSelf: "center",
        color: "white"
      }



})

export default about