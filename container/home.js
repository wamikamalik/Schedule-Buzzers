import React from 'react'
import {View, SafeAreaView, ScrollView,ImageBackground, Image, TextInput, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler';
import BlackButton from '../component/BlackButton';
import moment from 'moment'
 import firebaseDb from '../firebaseDb';
 import Constants from 'expo-constants'
 import {Appbar, Title, Subheading, Card, Paragraph, Button} from 'react-native-paper';
 import RNCalendarEvents from 'react-native-calendar-events';

 moment().format()

class home extends React.Component {

    state = {
        name: null,
        photo: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
        photo1: '',
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
                // let imageRef = firebaseDb.app().storage("gs://schedule-buzzers-2.appspot.com").ref(photo1);
                // imageRef
                //   .getDownloadURL()
                //   .then((url) => {
                //     //from url you can fetched the uploaded image easily
                //     this.setState({photo: url});
                //   })
                //   .catch((e) => console.log('getting downloadURL of image error => ', e));

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
                let name = ''
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
              <ScrollView>
                <Appbar style={styles.top}>
                <Appbar.Action
                  icon={require('../assets/slideinw.png')}
                  onPress={() => this.props.navigation.openDrawer()}
                  />
                  <Appbar.Content title="Home" />
                </Appbar>
                
                <Card elevation={30} style={{ backgroundColor:"transparent" }}>
                <ImageBackground source = {require('../assets/homeback.jpg')} style={{resizeMode:"cover"}}>
                <Card.Content>
                  <Title style= {styles.text}>Hello, {this.state.name}! ;)D</Title>
                  <Image style={styles.profile} source={{uri: this.state.photo}}></Image>
                </Card.Content>
                </ImageBackground>
              </Card>
              
              <View style={{ marginTop: 30, flex: 2, flexDirection: "row"}}>
              <Card elevation={30} style={{marginTop:10, marginLeft: 10, marginRight: 5, width:Dimensions.get('window').width/2 - 15, backgroundColor:"#e2bff7", borderRadius:60}} onPress={()=>this.props.navigation.navigate("See Current Schedule")}>
                <Card.Cover source={{ uri: 'https://e7.pngegg.com/pngimages/650/29/png-clipart-school-timetable-teacher-student-class-schedule-teacher-template-text.png' }} />
                <Card.Content>
                <Title onPress={()=>this.props.navigation.navigate("See Current Schedule")}>Current Schedule</Title>
                <Paragraph>View your current classes in a timetable form and remove any class by just clicking on it.</Paragraph>
                </Card.Content>
              </Card>
              <Card elevation={30} style={{marginTop:10, marginLeft: 5, marginRight: 10, width:Dimensions.get('window').width/2 - 15, backgroundColor:'#e2bff7', borderRadius:60}} onPress={()=>this.props.navigation.navigate("See Current Assignments")}>
                <Card.Cover source={{ uri: 'https://img1.ibay.com.mv/is1/full/2020/03/item_2935098_342.jpg' }} />
                <Card.Content>
                <Title onPress={()=>this.props.navigation.navigate("See Current Assignments")}>Current Assignments</Title>
                <Paragraph>View your current Assignments in a timetable form or a list form and remove any assignment by just clicking on it.</Paragraph>
                </Card.Content>
              </Card>
              </View>
              <View style={{ marginTop: 5, flex: 2, flexDirection: "row"}}>
              <Card elevation={30} style={{marginTop:10, marginLeft: 10, marginRight: 5, width:Dimensions.get('window').width/2 - 15, backgroundColor:"#e2bff7", borderRadius:60}} onPress={()=>this.props.navigation.navigate("Find Food")}>
                <Card.Cover source={{ uri: 'https://www.expatica.com/app/uploads/sites/5/2020/03/Boeuf-bourguignon-1920x1080.jpg' }} />
                <Card.Content>
                <Title onPress={()=>this.props.navigation.navigate("Find Food")}>Food Places</Title>
                <Paragraph>Satisfy your hunger needs by finding food places near your location.</Paragraph>
                </Card.Content>
              </Card>
              <Card elevation={30} style={{marginTop:10, marginLeft: 5, marginRight: 10, width:Dimensions.get('window').width/2 - 15, backgroundColor:'#e2bff7', borderRadius:60}} onPress={()=>this.props.navigation.navigate("Which bus goes there?")}>
                <Card.Cover source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrd4M1vAxGtF83QF9DoPVx3rJPwzIsAk1bDA&usqp=CAU' }} />
                <Card.Content>
                <Title onPress={()=>this.props.navigation.navigate("Which bus goes there?")}>Bus Routes</Title>
                <Paragraph>Find out which buses you can take by just inputting your current location and destination.</Paragraph>
                </Card.Content>
              </Card>
              </View>
              {/* <BlackButton style={styles.button} onPress={()=>this.props.navigation.navigate("See Current Schedule")}>See Current Schedule</BlackButton>
              <BlackButton style={styles.button} onPress={()=>this.props.navigation.navigate("See Current Assignments")}>See Current Assignments</BlackButton> */}
              <BlackButton style={styles.button} onPress={()=>this.props.navigation.openDrawer()}>More Options</BlackButton>
            </ScrollView> 
          </SafeAreaView>
        )
        
    }
  }
  const styles = StyleSheet.create({
    container: { 
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
       backgroundColor: '#ffebcd'
    },
    top: {
        backgroundColor:"#c17eef"
    },
    text: {
      marginTop: 10,
       fontWeight:'bold',
       fontSize: 24,
        alignSelf:'center',
       
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf:'center',
        marginTop: 20,
        marginBottom: 20
    },
    button: {
        marginTop: 15,
        marginBottom: 30,
        borderRadius:20,
        width:300,
        height:45,
        alignSelf:'center',
      },
})

  export default home