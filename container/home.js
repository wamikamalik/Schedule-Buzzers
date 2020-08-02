import React from 'react'
import { SafeAreaView, ImageBackground, Image, TextInput, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler';
import BlackButton from '../component/BlackButton';
import moment from 'moment'
 import firebaseDb from '../firebaseDb';
 import Constants from 'expo-constants'
 import {Appbar, Title, Subheading} from 'react-native-paper';
 import RNCalendarEvents from 'react-native-calendar-events';

 moment().format()

class home extends React.Component {

    state = {
        name: null,
        photo: null,
        loading:true
    }

    _getCalendarStatus = async () => {
        try {
          let calendarAuthStatus = await RNCalendarEvents.authorizationStatus();
          //alert(calendarAuthStatus, ["OK"]);
        } catch (error) {
          alert("Failed to get Calendar Status");
        }
      };
    
      _requestCalendarPermissions = async () => {
        try {
          let requestCalendarPermission = await RNCalendarEvents.authorizeEventStore();
          //alert(requestCalendarPermission, ["OK"]);
        } catch (error) {
          alert("Failed to ask permission");
        }
      };
    
    componentDidMount() {
        this._getCalendarStatus();
        this._requestCalendarPermissions();
        var user = firebaseDb.auth().currentUser;
        //while(user==null){user = firebaseDb.auth().currentUser}
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
        firebaseDb.firestore()
        .collection('users')
        .doc(user.uid)
        .collection('assignments')
        .orderBy('Deadline','asc')
        .get()
        .then(snapshot => {
        //const modules=[]
        const date = new Date()
        snapshot.forEach(doc => {
         let d = moment(doc.data().Deadline,"DD-MM-YYYY").format()
         let given = new Date(d)
         //alert(given)
            if(given<date) {
                let name = []
                name = doc.data().Name
                const user = firebaseDb.auth().currentUser.uid;
                if ((user)&&(name!=null)&&name!="") {
                    firebaseDb.firestore()
                    .collection('users')
                    .doc(user)
                    .collection('assignments')
                    .doc(name)
                    .get()
                    .then((doc)=>{
                        if(!doc.exists) {
                            alert("No such Assignment!")
                        }
                        else{
                            const id = doc.data().Id
                            firebaseDb.firestore()
                            .collection('users')
                            .doc(user)
                            .collection('assignments')
                            .doc(name)
                            .delete()
                            .then(() => {
                                RNCalendarEvents.removeEvent(id)
                                //alert("Assignment Removed!!")
                            })
                            .catch(function(error) {
                                console.error("Error removing document: ", error);
                            });
                        }
                    })
                }
  
            }
            
        // alert('something found')
        })
        
        //  modules.push(" ")
        //this.setState({modules: modules})
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <Appbar style={styles.top}>
   <Appbar.Action
     icon={require('../assets/slideinw.png')}
     onPress={() => this.props.navigation.openDrawer()}
    />
     <Appbar.Content title="Home" />
    </Appbar>
              <Title style= {styles.text}>Hello,{this.state.name}!!</Title>
              <Image style={styles.profile} source={{uri: this.state.photo}}></Image>
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
    top: {
        backgroundColor:"#c17eef"
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