import React from 'react'
import { SafeAreaView, ImageBackground, Image, TextInput, Text, Button, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler';


 import firebaseDb from '../firebaseDb';


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
            <ImageBackground style={{flex: 1, resizeMode: "cover"}} source={require('../assets/back.png')}>
              <TouchableOpacity style={{marginTop: 20}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slidein.png')}/>
              </TouchableOpacity>
              <Text style={styles.text}>Hello,{this.state.name}!!</Text>
              <Image style={styles.profile} source={this.state.photo}></Image>
              </ImageBackground>
          </SafeAreaView>
        )
        
    }
  }
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
       backgroundColor: 'transparent'
    },
    image: {
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        alignSelf: 'flex-start',
        height: 40,
        width:30,
        marginLeft:15
    },
    text: {
        fontWeight:'bold',
        fontSize: 24,
        alignSelf:'center',
       
    },
    profile: {
        width: 180,
        height: 180,
        borderRadius: 90,
        alignSelf:'center',
        marginTop: 20
    }
})

  export default home