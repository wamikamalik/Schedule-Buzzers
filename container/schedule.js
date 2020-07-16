import React, {Component} from 'react';
import { Platform,KeyboardAvoidingView,StyleSheet,ImageBackground, Image, Text, View,Button, Picker, Modal, TouchableHighlight,TouchableOpacity, SafeAreaView, TextInput, Dimensions } from 'react-native';
//import {Button} from 'react-native-elements';
import TimePicker from 'react-native-simple-time-picker';
import firebaseDb from '../firebaseDb';
//import BlackButton from '../component/BlackButton';
import Constants from 'expo-constants'
import { ScrollView } from 'react-native-gesture-handler';
import {Appbar, Title, Subheading, Dialog, Portal, Paragraph} from 'react-native-paper'
import BlackButton from '../component/BlackButton'
import { auth } from 'firebase';
import moment from 'moment';


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
    visible: false
    
};

  componentDidMount() {
    this._getCalendarStatus();
    this._requestCalendarPermissions();
  }

  _getCalendarStatus = async () => {
    try {
      let calendarAuthStatus = await RNCalendarEvents.authorizationStatus();
      alert(calendarAuthStatus, ["OK"]);
    } catch (error) {
      alert("Failed to get Calendar Status");
    }
  };

  _requestCalendarPermissions = async () => {
    try {
      let requestCalendarPermission = await RNCalendarEvents.authorizeEventStore();
      alert(requestCalendarPermission, ["OK"]);
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

  // googleCalendar = () => {
  //   fs.readFile('credentials.json', (err, content) => {
  //     if (err) return alert('Error loading client secret file:', err);
  //     // Authorize a client with credentials, then call the Google Calendar API.
  //     if(addpressed) {
  //       this.authorize(JSON.parse(content), this.AddEvent);
  //       addpressed = false;
  //     }
  //   });
  // }

  // authorize = (credentials, callback) => {
  //   const {client_secret, client_id, redirect_uris} = credentials.installed;
  //   const oAuth2Client = new google.auth.OAuth2(
  //       client_id, client_secret, redirect_uris[0]);
  
  //   // Check if we have previously stored a token.
  //   fs.readFile(TOKEN_PATH, (err, token) => {
  //     if (err) {
  //       this.setState({visible: true})
  //       return getAccessToken(oAuth2Client, callback);
  //     }
  //     oAuth2Client.setCredentials(JSON.parse(token));
  //     callback(oAuth2Client);
  //   });
  // }

  // hideDialog() {
  //   this.setState({visible: false})
  // }
  // getAccessToken = (oAuth2Client, callback) => {
  //     const authUrl = oAuth2Client.generateAuthUrl({
  //       access_type: 'offline',
  //       scope: SCOPES,
  //     });
  //     // console.log('Authorize this app by visiting this url:', authUrl);
  //     // const rl = readline.createInterface({
  //     //   input: process.stdin,
  //     //   output: process.stdout,
  //     // });
  //     // rl.question('Enter the code from that page here: ', (code) => {
  //     //   rl.close();
  //     if(this.state.code) {
  //       oAuth2Client.getToken(this.state.code, (err, token) => {
  //         if (err) return alert('Error retrieving access token', err);
  //         oAuth2Client.setCredentials(token);
  //         // Store the token to disk for later program executions
  //         fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
  //           if (err) return alert(err);
  //           alert('Token stored to', TOKEN_PATH);
  //         });
  //         callback(oAuth2Client);
  //       });
  //     }
  //   //  });
  //     return (
  //       <View>
  //       <Portal>
  //       <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
  //         <Dialog.Title>Authorization needed!</Dialog.Title>
  //         <Dialog.Content>
  //           <Paragraph>Authorize this app by visiting this url:{authUrl}
  //           <Text>Enter the code from that page here:</Text>
  //           </Paragraph>
  //         </Dialog.Content>
  //         <Dialog.Actions>
  //           <TextInput placeholder="code" onChangeText={this.handleUpdatecode} value={this.state.code}></TextInput>
  //         </Dialog.Actions>
  //       </Dialog>
  //     </Portal>
  //     </View>
  //     )
  //   }


  // AddEvent = (auth) => {
  //   if(this.state.Day == "Monday") {
  //   const startdate = moment(toString(new Date())+'T'+this.state.selectedHoursf.toString()+':'+this.state.selectedMinutesf.toString(),'YYYY/DD/MMTHH:mm',true).format('YYYY-MM-DDTHH:mm:ss');
  //   const enddate = moment(toString(new Date())+'T'+this.state.selectedHourst.toString()+':'+this.state.selectedMinutest.toString(),'YYYY/DD/MMTHH:mm',true).format('YYYY-MM-DDTHH:mm:ss');

  //   var event = {
  //     'summary': 'Class Reminder',
  //     'location': this.state.Location,
  //     'description': this.state.Module+' '+this.state.Class,
  //     'start': {
  //       'dateTime': startdate,
  //       'timeZone': 'Asia/Singapore',
  //     },
  //     'end': {
  //       'dateTime': enddate,
  //       'timeZone': 'Asia/Singapore',
  //     },
  //     'recurrence': [
  //       'RRULE:FREQ=WEEKLY;UNTIL=20211231;BYDAY=MO'
  //     ],
  //     'reminders': {
  //       'useDefault': false,
  //       'overrides': [
  //         {'method': 'email', 'minutes': 24 * 60},
  //         {'method': 'popup', 'minutes': 20},
  //       ],
  //     },
  //   };
  //   }
    
  //   calendar.events.insert({
  //     auth: auth,
  //     calendarId: 'primary',
  //     resource: event,
  //   }, function(err, event) {
  //     if (err) {
  //       alert('There was an error contacting the Calendar service: ' + err);
  //       return;
  //     }
  //     alert('Event created: %s', event.htmlLink);
  //   });
  //   this.setState({
  //     Day: '',
  //     Module: '',
  //     Class: '',
  //     selectedHoursf:0,
  //     selectedHourst:0,
  //     selectedMinutesf:0,
  //     selectedMinutest:0,
  //     Location:''
  //     }) 
  // } 
  
  HandleUser = () => {
    const user = firebaseDb.auth().currentUser.uid;
    // let min = 0;
    // let time = 0;
    // let hr = 0;
    // min = this.state.selectedMinutesf;
    // hr =  ((this.state.selectedHoursf - 30)>=0)?this.state.selectedHoursf:this.state.selectedHoursf-1;
    // time = hr.toString()+':'+min.toString()
    let time = new Date()
    let hrs = time.getTimezoneOffset()/60
    //alert(hrs)
    if ((user)&&(this.state.Day!=null)&&(this.state.Class!=null)&&(this.state.Module!=null)&&(this.state.Location!=null)&&((this.state.selectedHoursf)!=0)&&((this.state.selectedHourst)!=0)) {
      if(this.state.Day == "Monday") {
        const startdate = moment("2020/07/13 "+(this.state.selectedHoursf)+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
        const enddate = moment("2020/07/13 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";
    RNCalendarEvents.saveEvent('Reminder for class', {
      location: this.state.Location,
      description:this.state.Module+'-'+this.state.Class,
      startDate: startdate, 
      recurrenceRule: {
        frequency: 'weekly',
         endDate: '2021-12-31T19:26:00.000Z'
      },
      alarms: [{
        date: 30
      }]
    })
  }
    if(this.state.Day == "Tuesday") {
      const startdate = moment("2020/07/14 "+this.state.selectedHoursf+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
      const enddate = moment("2020/07/14 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";
  RNCalendarEvents.saveEvent('Reminder for class', {
    location: this.state.Location,
    description:this.state.Module+'-'+this.state.Class,
    startDate: startdate, 
    //endDate:enddate,
    recurrenceRule: {
      frequency: 'weekly',
       endDate: '2021-12-31T19:26:00.000Z'
    },
    alarms: [{
      date: 30
    }]
  })
}
  if(this.state.Day == "Wednesday") {
    const startdate = moment("2020/07/15 "+this.state.selectedHoursf+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
    const enddate = moment("2020/07/15 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";
RNCalendarEvents.saveEvent('Reminder for class', {
  location: this.state.Location,
  description:this.state.Module+'-'+this.state.Class,
  startDate: startdate, 
  //endDate:enddate,
  recurrenceRule: {
    frequency: 'weekly',
     endDate: '2021-12-31T19:26:00.000Z'
  },
  alarms: [{
    date: 30
  }]
})
  }
if(this.state.Day == "Thursday") {
  const startdate = moment("2020/07/16 "+this.state.selectedHoursf+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
  const enddate = moment("2020/07/16 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";

RNCalendarEvents.saveEvent('Reminder for class', {
location: this.state.Location,
description:this.state.Module+'-'+this.state.Class,
startDate: startdate, 
//endDate:enddate,
recurrenceRule: {
  frequency: 'weekly',
   endDate: '2021-12-31T19:26:00.000Z'
},
alarms: [{
  date: 30
}]
})
}
if(this.state.Day == "Friday") {
  const startdate = moment("2020/07/17 "+this.state.selectedHoursf+':'+this.state.selectedMinutesf,'YYYY/MM/DD HH:mm').add(hrs,"hours").format('YYYY-MM-DDTHH:mm:ss')+".000Z";
  const enddate = moment("2020/07/17 "+this.state.selectedHourst+':'+this.state.selectedMinutest,'YYYY/MM/DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')+".000Z";
RNCalendarEvents.saveEvent('Reminder for class', {
location: this.state.Location,
description:this.state.Module+'-'+this.state.Class,
startDate: startdate, 
//endDate:enddate,
recurrenceRule: {
  frequency: 'weekly',
   endDate: '2021-12-31T19:26:00.000Z'
},
alarms: [{
  date: 30
}]
})
}
    //this.googleCalendar()
        firebaseDb.firestore()
        .collection('users')
        .doc(user)
        .collection('classes')
        .doc('Days')
        .collection(this.state.Day)
        .doc(this.state.Module+this.state.Class)
        .set(
          {
          
          Day: this.state.Day,
          Module: this.state.Module,
          Class: this.state.Class,
          selectedHoursf:parseInt(this.state.selectedHoursf),
          selectedMinutesf: parseInt(this.state.selectedMinutesf),
          selectedHourst: parseInt(this.state.selectedHourst),
          selectedMinutest: parseInt(this.state.selectedMinutest),
          Location:this.state.Location

         })
      alert('Saved to your schedule ! ')
      //addpressed = true;
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
      else {
        alert('Please fill all the fields!')
      }

     

  }
onremoving= () =>{
  const user = firebaseDb.auth().currentUser.uid;
        if ((user)&&(this.state.Day!=null)) {
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
                    firebaseDb.firestore()
                    .collection('users')
                    .doc(user)
                    .collection('classes')
                    .doc('Days')
                    .collection(this.state.Day)
                    .doc(this.state.Module+this.state.Class)
                    .delete()
                    .then(() => {
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
      this.setState({
        Day: '',
        Module: '',
        Class: '',
        selectedHoursf:0,
        selectedHourst:0,
        selectedMinutesf:0,
        selectedMinutest:0,
        Location:''
        }) }
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
          this.setState({
            Day: '',
            Module: '',
            Class: '',
            selectedHoursf:0,
            selectedHourst:0,
            selectedMinutesf:0,
            selectedMinutest:0,
            Location:''
            }) }
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
  

  }

  render() {
    const { Module, selectedHoursf,selectedMinutesf,selectedHourst,selectedMinutest, Location } = this.state;
    const { Day } = this.state;
    const { Class } = this.state;
   
      return (

         <SafeAreaView style={styles.container}>
         <Appbar >
   <Appbar.Action
     icon={require('../assets/slideinw.png')}
     onPress={() => this.props.navigation.openDrawer()}
    />
     <Appbar.Content title="Add Class" />
    
    </Appbar>
           <ScrollView>
            
              <Text style={styles.text1}>Day of the week</Text>
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
              <Text style={styles.text2}>Module</Text>
              <TextInput style={styles.textInput} placeholder="Module" onChangeText={this.handleUpdateModule} value={Module}/>
              <Text style={styles.text3}>Class</Text>
              <Picker style={styles.pickerStyle2}  
                       selectedValue={(this.state && this.state.Class) || 'Select Class Type'}
                       onValueChange={(value) => {this.setState({Class: value});}}>
                    <Picker.Item label="Select Class Type" value="null" />
                    <Picker.Item label="Lecture" value="lecture" />
                    <Picker.Item label="Lab" value="lab" />
                    <Picker.Item label="Tutorial" value="tutorial" />

              </Picker>
              
              <Text style={styles.text4}>Time from</Text>
              <Text style={styles.text6}>
          {selectedHoursf}hr:{selectedMinutesf}min
        </Text>
              <TimePicker 
          selectedHours={this.state.selectedHoursf}
          //initial Hours value
          selectedMinutes={this.state.selectedMinutesf}
          //initial Minutes value
          onChange={(selectedHoursf, selectedMinutesf) =>
            this.setState({selectedHoursf:selectedHoursf, selectedMinutesf: selectedMinutesf })
          }
        />
              <Text style={styles.text5}>Time to</Text>
              <Text style={styles.text7}>
          {selectedHourst}hr:{selectedMinutest}min
        </Text>
              <TimePicker 
        
          selectedHourst={selectedHourst}
          //initial Hours value
          selectedMinutest={selectedMinutest}
          //initial Minutes value
          onChange={(selectedHourst, selectedMinutest) =>
            this.setState({ selectedHourst:selectedHourst, selectedMinutest: selectedMinutest })
          }
        />
        <Text style={styles.text2}>Location</Text>
              <TextInput style={styles.textInput} placeholder="Location" onChangeText={this.handleUpdateLocation} value={Location}/>
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
      
        </ScrollView>
          </SafeAreaView>  

      ) 
  }  
}  
const styles = StyleSheet.create ({  
  container:{ marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#ffebcd',
   // flexDirection: "column",justifyContent: 'center',alignItems:"center"
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
    alignSelf: "center"
  },
  pickerStyle2:{
      height: 50,
      width: (Dimensions.get('window').width>400)?400: Dimensions.get('window').width- 50,
      color: '#344953',
      justifyContent: 'center', 
      alignSelf: "center" },
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
    //color: "white",
    fontSize: 20,
    marginTop: 20,
    alignSelf: "center"

  },
  text2: {
    //color: "white",
    fontSize: 20,
    marginTop: 20,
    alignSelf: "center"
    
  },
  text3: {
    //color: "white",
    fontSize: 20,
    marginTop: 20,
    alignSelf: "center"
  },
  text4: {
    //color: "white",
    fontSize: 20,
    marginTop: 20,
    alignSelf: "center"
  },
  text5: {
    //color: "white",
    fontSize: 20,
    marginTop: 20,
    alignSelf: "center"
  },
  textInput: {
    borderRadius:5,
    borderColor:'black',
    borderWidth: 2,
    backgroundColor:'white',
    fontSize: 20,
    marginTop:10,
    marginLeft: 5,
    alignSelf: "center",
    alignItems: "center"
   
  },
  text6: {
    //color: "white",
    fontSize: 20,
    marginTop: 20,
    alignSelf: "center"
  },
  text7: {
    //color: "white",
    fontSize: 20,
    marginTop: 20,
    alignSelf: "center"
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
  picker: {
    width: (Dimensions.get('window').width>100)?100: Dimensions.get('window').width- 10,
  },

  
})



