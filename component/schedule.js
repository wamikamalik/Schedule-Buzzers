import React, {Component, useState} from 'react';
import { Alert, Platform,KeyboardAvoidingView,StyleSheet,ImageBackground, Image, Text, View,Button, Picker, Modal, TouchableHighlight,TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
//import {Button} from 'react-native-elements';
import TimePicker from 'react-native-simple-time-picker';
import firebaseDb from '../firebaseDb';
//import BlackButton from '../component/BlackButton';
import Constants from 'expo-constants'
import { ScrollView } from 'react-native-gesture-handler';
import {Appbar, Title, Subheading, Dialog, Portal, Paragraph, TextInput} from 'react-native-paper'
import BlackButton from '../component/BlackButton'
import PurpleButton from '../component/purplebutton'
import { auth } from 'firebase';
import moment from 'moment';
import DateTimePicker from "@react-native-community/datetimepicker";


import RNCalendarEvents from 'react-native-calendar-events';

moment().format();

 //const addpressed = false;
// const fs = require('react-native-fs');
// const {google} = require('googleapis');
// const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
//const TOKEN_PATH = 'token.json';

export default class SwitchExample extends Component {

  state = {
  
    
    Day: null,
    Module:null,
    Class: null,
    selectedHoursf: 0,
    selectedMinutesf: 0,
    selectedHourst: 0,
    selectedMinutest: 0,
    Location: null,
    Add: false,
    Remove: false,
    code: null,
    visible: false,
    arr:[], 
    k:0,
    id: null,
    busdet: null,
    timepicker:false,
    timepicker1:false,
    date:new Date(),
    date2:new Date(),
};

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
  _getCalendars = async () => {
    try {
      let availableCalendars = await RNCalendarEvents.findCalendars();
      alert("Available Calendars", JSON.stringify(availableCalendars), [
        "OK"
      ]);
    } catch (error) {
      alert("Failed to ask permission");
    }
  };

  _fetchAllEvents = async () => {
    try {
      let allEvents = await RNCalendarEvents.fetchAllEvents(
        "2019-01-19T19:26:00.000Z",
        "2019-02-19T19:26:00.000Z"
      );
      console.log(allEvents);
      alert("Available Events", JSON.stringify(allEvents));
    } catch (error) {
      alert("Failed to get events");
    }
  };


  handleUpdateDay = Day => this.setState({Day})
  handleUpdateModule = Module => this.setState({Module})
  handleUpdateClass = Class => this.setState({Class})
  handleUpdateselectedHoursf = selectedHoursf => this.setState({selectedHoursf})
  handleUpdateselectedMinutesf = selectedMinutesf => this.setState({selectedMinutesf})
  handleUpdateselectedHourst = selectedHourst => this.setState({selectedHourst})
  handleUpdateselectedMinutest = selectedMinutest => this.setState({selectedMinutest})
  handleUpdateLocation = Location=> this.setState({Location})
  handleUpdatecode = code => this.setState({code})


  HandleUser = () => {
    const user = firebaseDb.auth().currentUser.uid;
    if ((user)&&(this.state.Day!=null)&&(this.state.Class!=null)&&(this.state.Module!=null)&&(this.state.Location!=null)&&((this.state.selectedHoursf)!=0)&&((this.state.selectedHourst)!=0)&&(this.state.Day!='')&&(this.state.Class!='')&&(this.state.Module!='')&&(this.state.Location!='')) {
        firebaseDb.firestore()
        .collection('users')
        .doc(user)
        .collection('classes')
        .doc('Days')
        .collection(this.state.Day)
        .doc(this.state.Module+this.state.Class)
        .get()
        .then((doc) =>{
          if (!doc.exists){
            firebaseDb.firestore()
            .collection('users')
            .doc(user)
            .collection('classes')
            .doc('Days')
            .collection(this.state.Day)
            .get()
            .then(snapshot=>{
              let arr = []
              snapshot.forEach(doc=>{
                const starthr = (doc.data().selectedHoursf<=9)?("0"+doc.data().selectedHoursf):(""+doc.data().selectedHoursf)
                const startmin = (doc.data().selectedMinutesf<=9)?("0"+doc.data().selectedMinutesf):(""+doc.data().selectedMinutesf)
                const start1 = parseInt(starthr.toString()+startmin.toString())
                const endhr = (doc.data().selectedHourst<=9)?("0"+doc.data().selectedHourst):(""+doc.data().selectedHourst)
                const endmin = (doc.data().selectedMinutest<=9)?("0"+doc.data().selectedMinutest):(""+doc.data().selectedMinutest)
                const end1 = parseInt(endhr.toString()+endmin.toString())
                //alert(start1)
                arr.push({start: start1, end: end1});
                  })
                this.setState({arr: arr})
            }).then(()=>{
            //alert(JSON.stringify(this.state.arr))
            const starthr = (parseInt(this.state.selectedHoursf)<=9)?("0"+this.state.selectedHoursf):(""+this.state.selectedHoursf)
            const startmin = (parseInt(this.state.selectedMinutesf)<=9)?("0"+this.state.selectedMinutesf):(""+this.state.selectedMinutesf)
            const startnew = parseInt(starthr.toString()+startmin.toString())
            const endhr = (parseInt(this.state.selectedHourst)<=9)?("0"+this.state.selectedHourst):(""+this.state.selectedHourst)
            const endmin = (parseInt(this.state.selectedMinutest)<=9)?("0"+this.state.selectedMinutest):(""+this.state.selectedMinutest)
            const endnew = parseInt(endhr.toString()+endmin.toString())
            //alert(startnew)
            for(let i=0; i< this.state.arr.length;i++){
              if(endnew>this.state.arr[i].start&&endnew<=this.state.arr[i].end) {
                this.setState({k:0});
                alert("You already have a class at this time")
                break;
              }
              else if(endnew>this.state.arr[i].end&&startnew<this.state.arr[i].end) {
                this.setState({k:0});
                alert("You already have a class at this time")
                break;          
              }
              else {
                this.setState({k:1});
                //alert('1') //for testing purposes
              }
            }
            if(this.state.arr.length==0) {
              this.setState({k:1});
            }
            }).then(()=>{
            if(this.state.k == 1) {
              let bus = ''
              let buses = []
              firebaseDb.firestore()
              .collection('busdetails')
              .doc('stops')
              .collection(this.state.Location)
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                
                    buses.push(doc.id+" stops at "+doc.data().stops)
              })
              for(let i=0;i<buses.length;i++) {
                bus = bus + '\n' + buses[i]
              }
              }).then(()=>{
              // }).then(()=>{
              let time = new Date()
              let hrs = time.getTimezoneOffset()/60
              if(this.state.Day == "Monday") {
                const startdate = moment("2020/07/13 "+(this.state.selectedHoursf)+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                const enddate = moment("2020/07/13 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                //alert(alarm)
                RNCalendarEvents.saveEvent(this.state.Module+'-'+this.state.Class, {
                  location: this.state.Location,
                  description:'buses you can take: '+bus,
                  startDate: startdate, 
                  recurrenceRule: {
                    frequency: 'weekly',
                    endDate: '2021-12-31T19:26:00.000Z'
                  },
                  alarms: [{
                    date: 30
                  }]
                }).then(id=>{
                  this.setState({id:id})
  
                  firebaseDb.firestore()
                  .collection('users')
                  .doc(user)
                  .collection('classes')
                  .doc('Days')
                  .collection(this.state.Day)
                  .doc(this.state.Module+this.state.Class)
                  .set({
                    Day: this.state.Day,
                    Module: this.state.Module,
                    Class: this.state.Class,
                    selectedHoursf:parseInt(this.state.selectedHoursf),
                    selectedMinutesf: parseInt(this.state.selectedMinutesf),
                    selectedHourst: parseInt(this.state.selectedHourst),
                    selectedMinutest: parseInt(this.state.selectedMinutest),
                    Location:this.state.Location,
                    Id: this.state.id
                  }).then(()=>{
                    this.setState({
                      Day: '',
                      Module: '',
                      Class: '',
                      selectedHoursf:0,
                      selectedHourst:0,
                      selectedMinutesf:0,
                      selectedMinutest:0,
                      Location:''
                      }) 
                      Alert.alert(  
                        'Class Saved',  
                        "Saved to your schedule! What do you want to do next?",  
                        [  
                            {  
                                text: 'See current Schedule',  
                                onPress: () => this.props.navigation.goBack(),    
                            },  
                            {text: 'Add more classes', onPress: () => console.log('No Pressed')},  
                        ]  
                      ); 
                  }).catch((error)=>{
                    alert(error)
                  })
                })
              }
              if(this.state.Day == "Tuesday") {
                const startdate = moment("2020/07/14 "+(this.state.selectedHoursf)+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                const enddate = moment("2020/07/14 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                //alert(startdate)
                RNCalendarEvents.saveEvent(this.state.Module+'-'+this.state.Class, {
                  location: this.state.Location,
                  description:'buses you can take: '+bus,
                  startDate: startdate, 
                  recurrenceRule: {
                    frequency: 'weekly',
                    endDate: '2021-12-31T19:26:00.000Z'
                  },
                  alarms: [{
                    date: 30
                  }]
                }).then(id=>{
                  this.setState({id:id})
  
                  firebaseDb.firestore()
                  .collection('users')
                  .doc(user)
                  .collection('classes')
                  .doc('Days')
                  .collection(this.state.Day)
                  .doc(this.state.Module+this.state.Class)
                  .set({
                    Day: this.state.Day,
                    Module: this.state.Module,
                    Class: this.state.Class,
                    selectedHoursf:parseInt(this.state.selectedHoursf),
                    selectedMinutesf: parseInt(this.state.selectedMinutesf),
                    selectedHourst: parseInt(this.state.selectedHourst),
                    selectedMinutest: parseInt(this.state.selectedMinutest),
                    Location:this.state.Location,
                    Id: this.state.id
                  }).then(()=>{
                    this.setState({
                      Day: '',
                      Module: '',
                      Class: '',
                      selectedHoursf:0,
                      selectedHourst:0,
                      selectedMinutesf:0,
                      selectedMinutest:0,
                      Location:''
                      }) 
                      Alert.alert(  
                        'Class Saved',  
                        "Saved to your schedule! What do you want to do next?",  
                        [  
                            {  
                                text: 'See current Schedule',  
                                onPress: () => this.props.navigation.goBack(),    
                            },  
                            {text: 'Add more classes', onPress: () => console.log('No Pressed')},  
                        ]  
                      ); 
                  }).catch((error)=>{
                    alert(error)
                  })
                })
              }
              if(this.state.Day == "Wednesday") {
                const startdate = moment("2020/07/15 "+(this.state.selectedHoursf)+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                const enddate = moment("2020/07/15 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                //alert(startdate)
                RNCalendarEvents.saveEvent(this.state.Module+'-'+this.state.Class, {
                  location: this.state.Location,
                  description:'buses you can take: '+bus,
                  startDate: startdate, 
                  recurrenceRule: {
                    frequency: 'weekly',
                    endDate: '2021-12-31T19:26:00.000Z'
                  },
                  alarms: [{
                    date: 30
                  }]
                }).then(id=>{
                  this.setState({id:id})
  
                  firebaseDb.firestore()
                  .collection('users')
                  .doc(user)
                  .collection('classes')
                  .doc('Days')
                  .collection(this.state.Day)
                  .doc(this.state.Module+this.state.Class)
                  .set({
                    Day: this.state.Day,
                    Module: this.state.Module,
                    Class: this.state.Class,
                    selectedHoursf:parseInt(this.state.selectedHoursf),
                    selectedMinutesf: parseInt(this.state.selectedMinutesf),
                    selectedHourst: parseInt(this.state.selectedHourst),
                    selectedMinutest: parseInt(this.state.selectedMinutest),
                    Location:this.state.Location,
                    Id: this.state.id
                  }).then(()=>{
                    this.setState({
                      Day: '',
                      Module: '',
                      Class: '',
                      selectedHoursf:0,
                      selectedHourst:0,
                      selectedMinutesf:0,
                      selectedMinutest:0,
                      Location:''
                      }) 
                      Alert.alert(  
                        'Class Saved',  
                        "Saved to your schedule! What do you want to do next?",  
                        [  
                            {  
                                text: 'See current Schedule',  
                                onPress: () => this.props.navigation.goBack(),    
                            },  
                            {text: 'Add more classes', onPress: () => console.log('No Pressed')},  
                        ]  
                      ); 
                  }).catch((error)=>{
                    alert(error)
                  })
                })
              }
              if(this.state.Day == "Thursday") {
                const startdate = moment("2020/07/16 "+(this.state.selectedHoursf)+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                const enddate = moment("2020/07/16 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                //alert(startdate)
                RNCalendarEvents.saveEvent(this.state.Module+'-'+this.state.Class, {
                  location: this.state.Location,
                  description:'buses you can take: '+bus,
                  startDate: startdate, 
                  recurrenceRule: {
                    frequency: 'weekly',
                    endDate: '2021-12-31T19:26:00.000Z'
                  },
                  alarms: [{
                    date: 30
                  }]
                }).then(id=>{
                  this.setState({id:id})
  
                  firebaseDb.firestore()
                  .collection('users')
                  .doc(user)
                  .collection('classes')
                  .doc('Days')
                  .collection(this.state.Day)
                  .doc(this.state.Module+this.state.Class)
                  .set({
                    Day: this.state.Day,
                    Module: this.state.Module,
                    Class: this.state.Class,
                    selectedHoursf:parseInt(this.state.selectedHoursf),
                    selectedMinutesf: parseInt(this.state.selectedMinutesf),
                    selectedHourst: parseInt(this.state.selectedHourst),
                    selectedMinutest: parseInt(this.state.selectedMinutest),
                    Location:this.state.Location,
                    Id: this.state.id
                  }).then(()=>{
                    this.setState({
                      Day: '',
                      Module: '',
                      Class: '',
                      selectedHoursf:0,
                      selectedHourst:0,
                      selectedMinutesf:0,
                      selectedMinutest:0,
                      Location:''
                      }) 
                      Alert.alert(  
                        'Class Saved',  
                        "Saved to your schedule! What do you want to do next?",  
                        [  
                            {  
                                text: 'See current Schedule',  
                                onPress: () => this.props.navigation.goBack(),    
                            },  
                            {text: 'Add more classes', onPress: () => console.log('No Pressed')},  
                        ]  
                      ); 
                  }).catch((error)=>{
                    alert(error)
                  })
                })
              }
              if(this.state.Day == "Friday") {
                const startdate = moment("2020/07/17 "+(this.state.selectedHoursf)+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                const enddate = moment("2020/07/17 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";
                //alert(startdate)
                RNCalendarEvents.saveEvent(this.state.Module+'-'+this.state.Class, {
                  location: this.state.Location,
                  description:'buses you can take: '+bus,
                  startDate: startdate, 
                  recurrenceRule: {
                    frequency: 'weekly',
                    endDate: '2021-12-31T19:26:00.000Z'
                  },
                  alarms: [{
                    date: 30
                  }]
                }).then(id=>{
                  this.setState({id:id})
  
                  firebaseDb.firestore()
                  .collection('users')
                  .doc(user)
                  .collection('classes')
                  .doc('Days')
                  .collection(this.state.Day)
                  .doc(this.state.Module+this.state.Class)
                  .set({
                    Day: this.state.Day,
                    Module: this.state.Module,
                    Class: this.state.Class,
                    selectedHoursf:parseInt(this.state.selectedHoursf),
                    selectedMinutesf: parseInt(this.state.selectedMinutesf),
                    selectedHourst: parseInt(this.state.selectedHourst),
                    selectedMinutest: parseInt(this.state.selectedMinutest),
                    Location:this.state.Location,
                    Id: this.state.id
                  }).then(()=>{
                    this.setState({
                      Day: '',
                      Module: '',
                      Class: '',
                      selectedHoursf:0,
                      selectedHourst:0,
                      selectedMinutesf:0,
                      selectedMinutest:0,
                      Location:''
                      }) 
                      Alert.alert(  
                        'Class Saved',  
                        "Saved to your schedule! What do you want to do next?",  
                        [  
                            {  
                                text: 'See current Schedule',  
                                onPress: () => this.props.navigation.goBack(),    
                            },  
                            {text: 'Add more classes', onPress: () => console.log('No Pressed')},  
                        ]  
                      );  
                  }).catch((error)=>{
                    alert(error)
                  })
                })
              }
              this.setState({k:0,arr:[]})
            })
            }
            })
          }
          else {
            alert('This class already exists !!')
          }  //addpressed = true;
        })
    }
    else {
      alert('Please fill all the fields!')
    }
  }
  onremoving= () =>{
    const user = firebaseDb.auth().currentUser.uid;
    if ((user)&&(this.state.Day!=null)&&this.state.Day!="") {
      if(this.state.Module!=null&&this.state.Module!="") {
      if(this.state.Class!=null&&this.state.Class!="") {
        firebaseDb.firestore()
        .collection('users')
        .doc(user)
        .collection('classes')
        .doc('Days')
        .collection(this.state.Day)
        .doc(this.state.Module+this.state.Class)
        .get()
        .then((doc)=>{
            if(!doc.exists) {
                alert("No such schedule found!")
                this.setState({
                Day: '',
                Module: '',
                Class: '',
                selectedHoursf:0,
                selectedHourst:0,
                selectedMinutesf:0,
                selectedMinutest:0,
                Location:''
                }) 
            }
            else{
              const id = doc.data().Id
                firebaseDb.firestore()
                .collection('users')
                .doc(user)
                .collection('classes')
                .doc('Days')
                .collection(this.state.Day)
                .doc(this.state.Module+this.state.Class)
                .delete()
                .then(() => {
                  RNCalendarEvents.removeEvent(id)
                  alert("Removed from your schedule! ");
                    this.setState({
                    Day: '',
                    Module: '',
                    Class: '',
                    selectedHoursf:0,
                    selectedHourst:0,
                    selectedMinutesf:0,
                    selectedMinutest:0,
                    Location:''
                    }) 
                  })     
            }
        })  
      }
      else {
        alert("Please enter the Class Type.")
      }
    }
    else {
      alert("Please enter the Module Name.")
    }      
    }  
    else{
      alert("Please enter the Day.")
    }
       
  }

  checkTime=() =>{
  if ((this.state.selectedHoursf<10) && (this.state.selectedHourst<10)){
    if (this.state.selectedHoursf < this.state.selectedHourst) {
      this.HandleUser();
      // if ((this.state.Class!=null)&&(this.state.Module!=null)&&(this.state.Location!=null)&&(this.state.Day!=null)&&(parseInt(this.state.selectedHoursf)!=0)&&(parseInt(this.state.selectedHourst)!=0)){
      // alert("Saved to your schedule!");
      // this.setState({
      //   Day: '',
      //   Module: '',
      //   Class: '',
      //   selectedHoursf:0,
      //   selectedHourst:0,
      //   selectedMinutesf:0,
      //   selectedMinutest:0,
      //   Location:''
      //   }) 
      // }
    }
      else if ((this.state.selectedMinutesf<this.state.selectedMinutest) && (this.state.selectedHoursf==this.state.selectedHourst)){
      // alert("Saved to your schedule!");
      this.HandleUser();
      //  this.setState({
      //   Day: '',
      //   Module: '',
      //   Class: '',
      //   selectedHoursf:0,
      //   selectedHourst:0,
      //   selectedMinutesf:0,
      //   selectedMinutest:0,
      //   Location:''
      //   }) 
    }
      else
      {
        alert("This time is not possible"); 
        // this.setState({
        //   Day: '',
        //   Module: '',
        //   Class: '',
        //   selectedHoursf:0,
        //   selectedHourst:0,
        //   selectedMinutesf:0,
        //   selectedMinutest:0,
        //   Location:''
        //   }) 
        }
      }
      if ((this.state.selectedHoursf<10) && (this.state.selectedHourst>=10))
      {
      //  alert("Saved to your schedule!");
        this.HandleUser();
        // this.setState({
        //   Day: '',
        //   Module: '',
        //   Class: '',
        //   selectedHoursf:0,
        //   selectedHourst:0,
        //   selectedMinutesf:0,
        //   selectedMinutest:0,
        //   Location:''
        //   }) 
      }
      if ((this.state.selectedHoursf>=10) && (this.state.selectedHourst<10))
      {
        alert("This time is not possible!");
        // this.setState({
        //   Day: '',
        //   Module: '',
        //   Class: '',
        //   selectedHoursf:0,
        //   selectedHourst:0,
        //   selectedMinutesf:0,
        //   selectedMinutest:0,
        //   Location:''
        //   })
      }
      if ((this.state.selectedHoursf>=10) && (this.state.selectedHourst>=10)){
        if (this.state.selectedHoursf < this.state.selectedHourst) {
        // alert("Saved to your schedule!");
          this.HandleUser();
          // this.setState({
          //   Day: '',
          //   Module: '',
          //   Class: '',
          //   selectedHoursf:0,
          //   selectedHourst:0,
          //   selectedMinutesf:0,
          //   selectedMinutest:0,
          //   Location:''
          //   }) 
        }
          else if ((this.state.selectedMinutesf<this.state.selectedMinutest) && (this.state.selectedHoursf==this.state.selectedHourst)){
        //  alert("Saved to your schedule!");
          this.HandleUser();
          //  this.setState({
          //   Day: '',
          //   Module: '',
          //   Class: '',
          //   selectedHoursf:0,
          //   selectedHourst:0,
          //   selectedMinutesf:0,
          //   selectedMinutest:0,
          //   Location:''
          //   }) 
          }
          else
          {
            alert("This time is not possible");
            // this.setState({
            //   Day: '',
            //   Module: '',
            //   Class: '',
            //   selectedHoursf:0,
            //   selectedHourst:0,
            //   selectedMinutesf:0,
            //   selectedMinutest:0,
            //   Location:''
            //   }) 
            }
          }
  }

  handleAdd = () => {
  this.checkTime();
  //alert("Saved to your schedule!");
 //this.HandleUser();
  }
  
  handleRemove = () => {
    // alert("Removed from your schedule! ");
    this.onremoving();
  };

 

  onChange = (event, selectedDate) => {
  // const [date, setDate] = useState(new Date(1598051730000));
  
    const d=JSON.stringify(date);
 
  
 
    const currentDate = selectedDate || date;
   // setShow(Platform.OS === 'ios');
    setDate(currentDate);
    this.setState({selectedHoursf:(JSON.stringify(date.getHours())), selectedMinutesf:(JSON.stringify(date.getMinutes())) })
  };

//   showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };
 
 showTimepicker = () => {
  //const [date, setDate] = useState(new Date(1598051730000));
    this.setState({timepicker: true});
  };
  showTimepicker1 = () => {
    //const [date, setDate] = useState(new Date(1598051730000));
      this.setState({timepicker1: true});
    };
 
  render() {
    const { Module, selectedHoursf,selectedMinutesf,selectedHourst,selectedMinutest, Location } = this.state;
    const { Day } = this.state;
    const { Class } = this.state;
  //  const date = (new Date(1598051730000));
 //  const [mode, setMode] = ('date');
//    var show = false;
//    var setShow=false;
//   const onChange = (event, selectedDate) => {
//    // const [date, setDate] = useState(new Date(1598051730000));
   
//      const d=JSON.stringify(date);
  
   
  
//      const currentDate = selectedDate || date;
//      setShow(Platform.OS === 'ios');
//      setDate(currentDate);
//      this.setState({selectedHoursf:parseInt(JSON.stringify(date.getHours())), selectedMinutesf:  parseInt(JSON.stringify(date.getMinutes())) })
//    };
//    const   showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };
 
// const showTimepicker = () => {
//     //showMode('time');
//     //setShow(true);
//     setMode("time");
//     show=true;
//   };
 
      return (

         <SafeAreaView style={styles.container}>
        
         <Appbar.Header style={styles.top}>
         <Appbar.BackAction
     
     onPress={() => this.props.navigation.goBack()}
    />
     <Appbar.Content title="Add Classes" />
    
    </Appbar.Header>
    
  
    <ScrollView>

<View style={{marginLeft:15, marginRight: 15}}>
<Subheading style={{fontWeight:'bold', alignSelf:'center', marginTop: 10, color: "red"}}>* - 24 Hours format</Subheading>
  <Title style={styles.text1}>Day of the week</Title>
  <View
        style={{
          
            borderColor: 'black',
            // borderTopWidth:1,
            // borderBottomWidth:1,
            borderWidth: 1,
            paddingLeft: 15,
            backgroundColor:"white",
         //   borderRadius: 10,
            
        }}>
  <Picker style={styles.pickerStyle}

           selectedValue={(this.state && this.state.Day) || 'Select Day'}
          onValueChange={(value) => {this.setState({Day: value});}}>
        <Picker.Item label=" Select Day" value="null" />
        <Picker.Item label="Monday" value="Monday" />
        <Picker.Item label="Tuesday" value="Tuesday" />
        <Picker.Item label="Wednesday" value="Wednesday" />
        <Picker.Item label="Thursday" value="Thursday" />
        <Picker.Item label="Friday" value="Friday" />
  </Picker>
  </View>
  <Title style={styles.text1}>Module</Title>
  <TextInput style={styles.textInput}  mode='outlined' label="Module" placeholder="Module" onChangeText={this.handleUpdateModule} value={Module}/>
  <Title style={styles.text1}>Class</Title>
  <View
        style={{
          
            borderColor: 'black',
            // borderTopWidth:1,
            // borderBottomWidth:1,
            borderWidth: 1,
            paddingLeft: 15,
            backgroundColor:"white",
         //   borderRadius: 10,
            
        }}>
  <Picker style={styles.pickerStyle}  
           selectedValue={(this.state && this.state.Class) || 'Select Class Type'}
           onValueChange={(value) => {this.setState({Class: value});}}>
        <Picker.Item label="Select Class Type" value="null" />
        <Picker.Item label="Lecture" value="lecture" />
        <Picker.Item label="Lab" value="lab" />
        <Picker.Item label="Tutorial" value="tutorial" />

  </Picker>
  </View>
  <Title style={styles.text1}>Time from*</Title>
  {/* <Subheading style ={styles.text1} >24 Hours format</Subheading> */}
  <View style={{flex:2, flexDirection:"row"}}>
  <View
        style={{
          
            // borderColor: 'black',
          //  borderTopWidth:1,
            // borderBottomWidth:1,
         //   borderRadius: 10,
         width: (Dimensions.get('window').width/2),
            justifyContent: "flex-end",
            flex: 3, flexDirection:"row"
        }}>
          <View>
  <TextInput style={styles.textInput} mode='outlined' label="hr" value={this.state.selectedHoursf.toString()} disabled={true}></TextInput></View>
  <View><Title style={styles.text1}> : </Title></View>
<View><TextInput style={styles.textInput} mode='outlined' label="m" value={this.state.selectedMinutesf.toString()} disabled={true}></TextInput></View>
{/* <View><Title style={styles.text1}> min</Title></View> */}
</View>

    {/* <TimePicker 
selectedHours={this.state.selectedHoursf}
//initial Hours value
selectedMinutes={this.state.selectedMinutesf}
//initial Minutes value
onChange={(selectedHoursf, selectedMinutesf) =>
this.setState({selectedHoursf:selectedHoursf, selectedMinutesf: selectedMinutesf })
}
/>  */}


<View style={{marginLeft: 10, flex:2, flexDirection:"column"}}>
{/* <PurpleButton style={styles.button2} onPress={this.showTimepicker}>Choose start time</PurpleButton> */}
<TouchableOpacity onPress={this.showTimepicker}><Image style={{width:50, height:50,marginTop:5,borderRadius:20, marginLeft: 10}} source={require("../assets/clock.png")}></Image>
<Text>Start time</Text>
</TouchableOpacity>
</View>
</View>
{this.state.timepicker &&(
<DateTimePicker
testID="dateTimePicker"
value={this.state.date}
mode="time"
is24Hour={true}
display="default"
//  timeZoneOffsetInMinutes={480}
onChange={(event, value)=>{
this.setState({selectedHoursf:parseInt(JSON.stringify(value.getHours())), selectedMinutesf:parseInt(JSON.stringify(value.getMinutes())), timepicker:false})
}}
/> )}

<Title style={styles.text1}>Time to*</Title>
{/* <Subheading style ={styles.text1} >24 Hours format</Subheading> */}
<View style={{flex:2, flexDirection:"row"}}>
<View
style={{
  
    // borderColor: 'black',
  //  borderTopWidth:1,
    // borderBottomWidth:1,
  //   borderRadius: 10,
  width: (Dimensions.get('window').width/2),
    justifyContent: "flex-end",
    flex: 3, flexDirection:"row"
}}>
  <View>
  <TextInput style={styles.textInput} mode='outlined' label="hr" value={this.state.selectedHourst.toString()} disabled={true}></TextInput></View>
  <View><Title style={styles.text1}> : </Title></View>
<View><TextInput style={styles.textInput} mode='outlined' label="m" value={this.state.selectedMinutest.toString()} disabled={true}></TextInput></View>
{/* <View><Title style={styles.text1}> min</Title></View> */}
</View>

    {/* <TimePicker 
selectedHours={this.state.selectedHoursf}
//initial Hours value
selectedMinutes={this.state.selectedMinutesf}
//initial Minutes value
onChange={(selectedHoursf, selectedMinutesf) =>
this.setState({selectedHoursf:selectedHoursf, selectedMinutesf: selectedMinutesf })
}
/>  */}


<View style={{marginLeft: 10, flex:2, flexDirection:"column"}}>
{/* <PurpleButton style={styles.button2} onPress={this.showTimepicker}>Choose start time</PurpleButton> */}
<TouchableOpacity onPress={this.showTimepicker1}><Image style={{width:50, height:50,marginTop:5,borderRadius:20, marginLeft: 10}} source={require("../assets/clock.png")}></Image>
<Text>End time</Text>
</TouchableOpacity>
</View>
</View>

  {/* <Title style={styles.text1}>Time to</Title>
  <Subheading style={styles.text1}>24 Hours format</Subheading>
  <View
        style={{
          
            borderColor: 'black',
          //  borderTopWidth:1,
            borderBottomWidth:1,
         //   borderRadius: 10,
            alignSelf: 'center'
        }}>
  <Title style={styles.text1}>
{this.state.selectedHourst}hr:{this.state.selectedMinutest}min
</Title>
</View>
//        <TimePicker 

//   selectedHourst={selectedHourst}
//   //initial Hours value
//   selectedMinutest={selectedMinutest}
//   //initial Minutes value
//   onChange={(selectedHourst, selectedMinutest) =>
//     this.setState({ selectedHourst:selectedHourst, selectedMinutest: selectedMinutest })
//   }
// /> 
<View>
<PurpleButton style={styles.button2} onPress={this.showTimepicker1}>Choose end time</PurpleButton>
</View> */}
{this.state.timepicker1 &&(
<DateTimePicker
testID="dateTimePicker2"
value={this.state.date2}
mode="time"
is24Hour={true}
display="default"
//  timeZoneOffsetInMinutes={480}
onChange={(event, value)=>{
this.setState({selectedHourst:parseInt(JSON.stringify(value.getHours())), selectedMinutest:parseInt(JSON.stringify(value.getMinutes())), timepicker1:false})
}}
/> )}

<Title style={styles.text1}>Location</Title>
  {/* <TextInput style={styles.textInput} placeholder="Location" onChangeText={this.handleUpdateLocation} value={Location}/> */}
  <View
        style={{
          
            borderColor: 'black',
            // borderTopWidth:1,
            // borderBottomWidth:1,
            borderWidth: 1,
            paddingLeft: 15,
            backgroundColor:"white",
         //   borderRadius: 10,
            
        }}>
  <Picker style={styles.pickerStyle}

selectedValue={(this.state && this.state.Location) || 'Select the closest location'}
onValueChange={(value) => {this.setState({Location: value});}}>
<Picker.Item label=" Select the closest location" value="null" />
<Picker.Item label="FASS" value="FASS" />
<Picker.Item label="E3,E4,E5" value="E3,E4,E5" />
<Picker.Item label="EA" value="EA" />
<Picker.Item label="Business" value="Business" />
<Picker.Item label="FOS" value="FOS" />
<Picker.Item label="Science Drive" value="Science Drive" />
<Picker.Item label="Saw Swee Hock School Of Public Health" value="Saw Swee Hock School Of Public Health" />
<Picker.Item label="University Town" value="University Town" />
<Picker.Item label="USP" value="USP" />
<Picker.Item label="Yale NUS" value="Yale NUS" />
<Picker.Item label="Yong Siew Toh Conservatory of Music" value= 'Yong Siew Toh Conservatory of Music'/>
<Picker.Item label="Medicine" value="Medicine" />
<Picker.Item label="Nursing" value="Nursing" />
<Picker.Item label="Dentistry" value="Dentistry" />
<Picker.Item label="Law" value="Law" />
<Picker.Item label="Prince George's Park" value="Prince George's Park" />
<Picker.Item label="RVRC" value="RVRC" />
<Picker.Item label="Computing" value="Computing" />
<Picker.Item label="Lee Kuan Yew School of Public Policy" value="Lee Kuan Yew School of Public Policy" />
<Picker.Item label="School of Design and Environment" value="School of Design and Environment" />
<Picker.Item label="TCOMS" value="TCOMS" />
</Picker>
</View>
<BlackButton
style={styles.button1}

onPress={this.handleAdd}>Add</BlackButton>

<BlackButton
style={styles.button1}

onPress={this.handleRemove}>Remove</BlackButton>

{/* <Button
title={"Get Calendar Status"}
onPress={this._getCalendarStatus}
/>
<Button
title={"Request Calendar Permission"}
onPress={this._requestCalendarPermissions}
/>
<Button
title={"Get Available Calendars"}
onPress={this._getCalendars}
/>
<Button title={"Fetch All Events"} onPress={this._fetchAllEvents} /> */}
</View>
</ScrollView>
</SafeAreaView>  

) 
}  
}  
const styles = StyleSheet.create ({  
container:{ 
flex: 1,
backgroundColor: '#ffebcd',
// flexDirection: "column",justifyContent: 'center',alignItems:"center"
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
pickerStyle:{
marginLeft : 50,
height:50,
width: (Dimensions.get('window').width>400)?400: Dimensions.get('window').width- 50,
color: '#344953',
//flexDirection: "",
justifyContent: "center",
alignSelf: "center",
marginLeft:20, marginRight:20
},
pickerStyle2:{
height: 50,
width: (Dimensions.get('window').width>400)?400: Dimensions.get('window').width- 50,
color: '#344953',
marginLeft:20, marginRight:20
},

textb: {
//color: "white",
fontSize: 28,
fontWeight:"bold",
alignSelf:'center',
marginTop:30,
textDecorationLine:"underline",
justifyContent: 'center',
textDecorationLine: "underline"

},
text1: {
color: "black",
// fontSize: 20,
marginTop: 20,
alignSelf: "center",
fontWeight: "bold"

},
text2: {
//color: "white",
fontSize: 20,
marginTop: 20,
alignSelf: "center",
fontWeight: "bold"

},
text3: {
//color: "white",
fontSize: 20,
marginTop: 20,
alignSelf: "center",
fontWeight: "bold"
},
text4: {
//color: "white",
fontSize: 20,
marginTop: 20,
alignSelf: "center",
fontWeight: "bold"
},
text5: {
//color: "white",
fontSize: 20,
marginTop: 20,
alignSelf: "center",
fontWeight: "bold"
},
textInput: {
// borderRadius:5,
borderColor:'black',
//   borderWidth: 1,
backgroundColor:'white',
fontSize: 17,
//  marginTop:10,
// marginLeft: 5,
// alignSelf: "center",
// alignItems: "center"

},
text6: {
//color: "white",
fontSize: 20,
marginTop: 20,
alignSelf: "center",
fontWeight: "bold"
},
text7: {
//color: "white",
fontSize: 20,
marginTop: 20,
alignSelf: "center",
fontWeight: "bold"
},
button1: {
marginTop: 10,
borderRadius:20,
// width: 20,
height:45,
alignSelf:'center',
justifyContent:"center",
alignItems:"center"



},
button2: {
marginTop: 10,
borderRadius:20,
// width: 20,
height:45,
alignSelf:'center',
justifyContent:"center",
alignItems:"center",
//  color:"#c17eef"



},
picker: {
width: (Dimensions.get('window').width>100)?100: Dimensions.get('window').width- 10,
},


})



