import React from 'react'
import { View, Alert, KeyboardAvoidingView, ScrollView, ImageBackground, Image,Text, Button, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import BlackButton from '../component/BlackButton';
 import firebaseDb from '../firebaseDb';
 import Constants from 'expo-constants'
import {Appbar, Title, Subheading, TextInput} from 'react-native-paper'
import RNCalendarEvents from 'react-native-calendar-events';

 moment().format()

 class assignments extends React.Component {
     state = {
         mod: null,
         name: null,
         deadline: null,
         valid: false,
         done: false,
         notes: null,
         id: null
     }

     componentDidMount() {
        this._getCalendarStatus();
        this._requestCalendarPermissions();
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

     date = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return (
            month + '-' + date + '-' + year
        )
     }

     handleUpdateMod = mod => this.setState({mod})

     handleUpdatename = name => this.setState({name})

     handleUpdatedeadline = deadline => this.setState({deadline})

     handleUpdatenotes = notes => this.setState({notes})

     UpdateUser = () => {
        if(this.state.name==''||this.state.name==null){
            alert("Please enter Assignment name.")
        }
        else{
            const user = firebaseDb.auth().currentUser.uid;
            //var myTimeStamp = new Date(this.state.deadline)
            var today = new Date()
            var date = moment(this.state.deadline,"DD-MM-YYYY")
            var aDate = moment(date, "DD-MM-YYYY", true);
            var isValid = aDate.isValid();
            if(isValid && date >= today) {
            if (user) {
                firebaseDb.firestore()
                .collection('users')
                .doc(user)
                .collection('assignments')
                .doc(this.state.name)
                .get()
                .then((doc)=>{
                    if(doc.exists) {
                        doc.ref.update ({
                            Module: this.state.mod,
                            Name: this.state.name,
                            Deadline: this.state.deadline,
                            Notes: this.state.notes
                        })
                        const startdate = moment(this.state.deadline+" 12:00",'DD-MM-YYYY HH:mm').subtract(1,"days").format("YYYY-MM-DDTHH:mm:ss")+".000Z"
                        const enddate = moment(this.state.deadline+" 12:00",'DD-MM-YYYY HH:mm').format("YYYY-MM-DDTHH:mm:ss")+".000Z"
                        //alert(startdate)
                        RNCalendarEvents.saveEvent(this.state.name, {
                            id: doc.data().Id,
                            description:"Module Name: "+this.state.mod+'\n'+"Notes:"+this.state.notes,
                            startDate: startdate, 
                            allDay:true,
                            //endDate:enddate,
                            recurrenceRule: {
                                frequency: 'daily',
                                 endDate: enddate
                              },
                            alarms: [{
                              date: 30
                            }]
                        })
                    this.setState({
                        mod: '',
                        name: '',
                        deadline: '',
                        isValid:false,
                        done: false,
                        notes: ''
                    })
                    alert("Assignment Updated!!")
                    }
                    else {
                        const startdate = moment(this.state.deadline+" 12:00",'DD-MM-YYYY HH:mm').subtract(1,"days").format("YYYY-MM-DDTHH:mm:ss")+".000Z"
                        const enddate = moment(this.state.deadline+" 12:00",'DD-MM-YYYY HH:mm').format("YYYY-MM-DDTHH:mm:ss")+".000Z"
                        //alert(startdate)
                        RNCalendarEvents.saveEvent(this.state.name, {
                            //id: this.state.name,
                            description:"Module Name: "+this.state.mod+'\n'+"Notes:"+this.state.notes,
                            startDate: startdate, 
                            allDay:true,
                            //endDate:enddate,
                            recurrenceRule: {
                                frequency: 'daily',
                                 endDate: enddate
                              },
                            alarms: [{
                              date: 30
                            }]
                        }).then(id=>{
                            this.setState({id:id})
                            //alert(this.state.id)
                            firebaseDb.firestore()
                            .collection('users')
                            .doc(user)
                            .collection('assignments')
                            .doc(this.state.name) 
                            .set(
                                {
                                Module: this.state.mod,
                                Name: this.state.name,
                                Deadline: this.state.deadline,
                                Notes: this.state.notes,
                                Id: this.state.id
                                })
                                .then(() => {
                                    this.setState({
                                        mod: '',
                                        name: '',
                                        deadline: '',
                                        isValid:false,
                                        done: false,
                                        notes: ''
                                    }) 
                                        Alert.alert(  
                        'Assignment Saved',  
                        "A new assignment has been added! What do you want to do next?",  
                        [  
                            {  
                                text: 'See current Assignments',  
                                onPress: () => this.props.navigation.navigate("See Current Assignments"),    
                            },  
                            {text: 'Add more Assignments', onPress: () => console.log('No Pressed')},  
                        ]  
                      );  
                                })

                        }).catch(error => {
                            alert(error)
                        })
                    }
                })
                .catch(function(error) {
                    console.error("Error: ", error);
                });
            }
            }
            else if(date<today){
                alert("Date has passed already!!")
                this.setState({
                    deadline: '',
                    isValid:false,
                    done: false,
                    }) 
            }
            else {
                alert("Invalid Date!!")
                this.setState({
                    deadline: '',
                    isValid:false,
                    done: false
                    }) 
            }
        }
    }

        HandleRemove = () => {
            const user = firebaseDb.auth().currentUser.uid;
            if ((user)&&(this.state.name!=null)&&this.state.name!="") {
                firebaseDb.firestore()
                .collection('users')
                .doc(user)
                .collection('assignments')
                .doc(this.state.name)
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
                        .doc(this.state.name)
                        .delete()
                        .then(() => {
                            RNCalendarEvents.removeEvent(id)
                            alert("Assignment Removed!!")
                        })
                        .catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                    }
                })
            
        }
        else {
            alert('Please key in the assignment name!')
        }   
     }

     HandleSearch = () => {
        const user = firebaseDb.auth().currentUser.uid;
            if ((user)&&(this.state.name!=null)&&(this.state.name!='')) {
                firebaseDb.firestore()
                .collection('users')
                .doc(user)
                .collection('assignments')
                .doc(this.state.name)
                .get()
                .then((doc)=>{
                    if(!doc.exists) {
                        alert("No such Assignment!")
                    }
                    else{
                        firebaseDb.firestore()
                        .collection('users')
                        .doc(user)
                        .collection('assignments')
                        .doc(this.state.name)
                        .get()
                        .then((doc) => {
                            if(doc.exists) {
                                this.setState ({
                                    mod: doc.data().Module,
                                    deadline: doc.data().Deadline,
                                    notes: doc.data().Notes
                                })
                            }
                        })
                        .catch(function(error) {
                            console.error("Error finding document: ", error);
                        });
                    }
                })
            
            } 
            else {
                alert("Please key in the assignment name!")
            }
    }

    //  HandleUpdate = () => {
    //     const user = firebaseDb.auth().currentUser.uid;
    //     if (user) {
    //         firebaseDb.firestore()
    //         .collection('users')
    //         .doc(user)
    //         .collection('assignments')
    //         .doc(this.state.name)
    //         .get()
    //         .then((doc)=>{
    //             if(!doc.exists) {
    //                 alert("No such Assignment!")
    //             }
    //             else{
    //                 firebaseDb.firestore()
    //                 .collection('users')
    //                 .doc(user)
    //                 .collection('assignments')
    //                 .doc(this.state.name)
    //                 .get()
    //                 .then((doc) => {
    //                     if(doc.exists) {
    //                         doc.ref.update ({
    //                             Module: this.state.mod,
    //                             Name: this.state.name,
    //                             Deadline: this.state.deadline,
    //                             Notes: this.state.notes 
    //                     })
    //                     alert("Assignment Updated!!")
    //                 }
    //                 })
    //                 .catch(function(error) {
    //                     console.error("Error updating document: ", error);
    //                 });
    //             }
    //         })
        
    //     } 
    //  }

     render() {
         return (
             <KeyboardAvoidingView style={styles.container}>
           
         <Appbar.Header style={styles.top}>
         <Appbar.BackAction
     
     onPress={() => this.props.navigation.goBack()}
    />
     <Appbar.Content title="Add Assignments" />
    
    </Appbar.Header>

    <ScrollView>
                <View style={{marginLeft:15, marginRight:15}}>
                <Subheading style={styles.text}>Input only Name to remove an Assignment. To update input name and press on search.</Subheading>
                <Subheading style={styles.text}>Assignments already passed will automatically be removed.</Subheading>
                <Subheading style={styles.text1}>* - Required</Subheading>
                <Title style={styles.text}>Module</Title><TextInput style={styles.textInput} mode="outlined" label="Module Name" placeholder='Module Name'  onChangeText={this.handleUpdateMod} value={this.state.mod}></TextInput>
                <Title style={styles.text}>Name*</Title>
                <View style={{flex:2,flexDirection:"row"}}>
                    <View style={{width:(Dimensions.get('window').width>400)?330:Dimensions.get('window').width-80, marginRight:2}}>
                <TextInput style={styles.textInputa} mode="outlined" label="Assignement Name" placeholder='Assignment name'  onChangeText={this.handleUpdatename} value={this.state.name}></TextInput>
                </View>
                <View style={{flex:2, flexDirection:"column"}}>
                    <TouchableOpacity onPress={this.HandleSearch}><Image style={{width:40, height:40,marginTop:5,borderRadius:20}} source={require("../assets/search.png")}></Image>
                    <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                {/* <BlackButton style={styles.button} onPress= {this.HandleSearch}>Search</BlackButton> */}
                </View>
                <Title style={styles.text}>Deadline*</Title>
                    <DatePicker
                    style={{width: (Dimensions.get('window').width>400)?375:Dimensions.get('window').width-35, marginTop: 10, color:'black'}}
                    date={this.state.deadline} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Enter Deadline"
                    
                    format="DD-MM-YYYY"
                    minDate="01-01-2000"
                    maxDate="01-01-2030"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                        //position: 'absolute',
                        right: 0,
                        top: 0,
                        marginTop: 5
                        },
                        dateInput: {
                        
                        color: "black",
                        backgroundColor:"white",
                        height: 55,
                        fontSize: 17,
                        borderRadius: 5,
                        borderColor: "black",
                        
                        },
                    }}
                    onDateChange={this.handleUpdatedeadline}/> 
                    {/* <Title style={styles.text}>If calender is inaccessible, Please enter date below</Title><TextInput style={styles.textInput} mode="outlined" label="Deadline" placeholder="DD-MM-YYYY" onChangeText={this.handleUpdatedeadline} value={this.state.deadline}></TextInput>
                    <Title style={styles.text}>Notes</Title><TextInput style={styles.textInputa} mode="outlined" label = "Additional Notes" placeholder='Additional notes' onChangeText={this.handleUpdatenotes} value={this.state.notes} multiline></TextInput> */}

                <BlackButton style={styles.button} onPress= {this.UpdateUser}>Add/Update</BlackButton>
                {/* <WhiteButton style={styles.button} onPress= {this.HandleUpdate}>Update</WhiteButton> */}
                <BlackButton style={styles.button} onPress= {this.HandleRemove}>Remove</BlackButton>
                </View>
                </ScrollView>
             </KeyboardAvoidingView>
         )
     }
 }

 const styles = StyleSheet.create({
    container: { 
        flex: 1,
       backgroundColor: '#ffebcd',
    },
    top: {
        backgroundColor:"#c17eef"
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
       // fontSize: 28,
        alignSelf:'center',
        marginTop: 10,
       // textDecorationLine: "underline",
        color: "black"
    },
    text1: {
        fontWeight:'bold',
       // fontSize: 28,
        alignSelf:'center',
        marginTop: 10,
       // textDecorationLine: "underline",
        color: "red"
    },
    textInput: {
       // borderRadius:1,
        backgroundColor:'white',
        fontSize: 17,
        // marginTop: 10,
        // marginLeft: 5,
        //width: (Dimensions.get('window').width>400)?385:Dimensions.get('window').width-40,
        // fontWeight: "bold",
      //  alignItems: 'center',
      //  borderWidth: 2, 
        //color: 'white',
        borderColor:"black"
      },
      textInput1: {
      //  borderRadius:5,
        backgroundColor:'white',
        fontSize: 17,
        // borderWidth: 2, 
        // marginTop: 10,
        // marginLeft: 5,
        width: (Dimensions.get('window').width>400)?340:Dimensions.get('window').width-40,
        //height: 100,
       // fontWeight: "bold",
        // alignItems: 'center',
        paddingTop:5,
      // color: 'white'
      },
      texta: {
        fontSize: 20,
        marginTop: 20,
        //marginLeft:150,
        //fontWeight:'bold',
        //color: "white",
        alignSelf: 'center'
      },
      button: {
        marginTop: 30,
        borderRadius:20,
        width:150,
        height:45,
        alignSelf:'center',
      },
    
})

export default assignments
