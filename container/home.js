import React from 'react'
import { SafeAreaView, ImageBackground, Image, TextInput, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler';
import BlackButton from '../component/BlackButton';

 import firebaseDb from '../firebaseDb';
 import Constants from 'expo-constants'
 import {Appbar, Title, Subheading} from 'react-native-paper';


class home extends React.Component {

    state = {
        name: null,
        photo: null,
        loading:true
    }
    componentDidMount() {
    var user = firebaseDb.auth().currentUser;
    firebaseDb.firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc)=>{
            if(doc.exists) {
                this.setState({                        
                    name: doc.data().name,
                    photo: doc.data().photoURL,
                    loading: false
                })

            }

        })
    }
    render() {
        return (
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <Appbar >
   <Appbar.Action
     icon={require('../assets/slideinw.png')}
     onPress={() => this.props.navigation.openDrawer()}
    />
     <Appbar.Content title="Home" />
    </Appbar>
              <Title style= {styles.text}>Hello,{this.state.name}!!</Title>
              <Image style={styles.profile} source={this.state.photo}></Image>
              <BlackButton style={styles.button} onPress={()=>this.props.navigation.navigate("See Current Schedule")}>See Current Schedule</BlackButton>
              <BlackButton style={styles.button} onPress={()=>this.props.navigation.navigate("See Current Assignments")}>See Current Assignments</BlackButton>
              <BlackButton style={styles.button} onPress={()=>this.props.navigation.openDrawer()}>More Options</BlackButton>
             
          </SafeAreaView>
        )
        
    }
  }
  const styles = StyleSheet.create({
    container: { marginTop: Constants.statusBarHeight,
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
       backgroundColor: '#ffebcd'
    },

    text: {
       // fontWeight:'bold',
      //  fontSize: 24,
        alignSelf:'center',
       
    },
    profile: {
        width: 180,
        height: 180,
        borderRadius: 90,
        alignSelf:'center',
        marginTop: 20
    },
    button: {
        marginTop: 25,
        borderRadius:20,
        width:300,
        height:45,
        alignSelf:'center',
      },
})

  export default home