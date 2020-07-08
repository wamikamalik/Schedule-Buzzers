// import React, { Component } from 'react';
// import { View, Text, Button, TextInput, DeviceEventEmitter } from 'react-native';
// import ReactNativeAN from 'react-native-alarm-notification';

// const alarmNotifData = {
// 	alarm_id: "22",
// 	title: "Alarm",
// 	message: "Stand up",
// 	vibrate: true,
// 	play_sound: true,
// 	schedule_type: "once",
// 	channel: "wakeup",
// 	data: { content: "my notification id is 22" },
// 	loop_sound: true,
// };

// class App extends Component {
// 	constructor(props, context) {
//     super(props, context);
    
//     const fire_date = ReactNativeAN.parseDate(new Date(Date.now()));

// 		this.state = {
// 			fireDate: fire_date,
// 			update: '',
// 			futureFireDate: '1000',
// 		};
// 		this.setAlarm = this.setAlarm.bind(this);
// 		this.stopAlarm = this.stopAlarm.bind(this);
// 	}

// 	setAlarm = () => {
// 		const { fireDate } = this.state;
// 		const details  = { ...alarmNotifData, fire_date: fireDate };
// 		console.log(`alarm set: ${fireDate}`);
// 		this.setState({ update: `alarm set: ${fireDate}` });
//     ReactNativeAN.scheduleAlarm(details);
// 	};

// 	setFutureAlarm = () => {
// 		const { futureFireDate } = this.state;
// 		const fire_date = ReactNativeAN.parseDate(new Date(Date.now() + parseInt(futureFireDate)));
// 		const details  = { ...alarmNotifData, fire_date };
// 		console.log(`alarm set: ${fire_date}`);
// 		this.setState({ update: `alarm set: ${fire_date}` });
// 		ReactNativeAN.scheduleAlarm(details);
// 	};

// 	stopAlarm = () => {
// 		this.setState({ update: '' });
// 		ReactNativeAN.stopAlarmSound();
// 	};

// 	sendNotification = () => {
// 		const details = { ...alarmNotifData, id: 45, data: { content: "my notification id is 45" }, };
// 		console.log(details);
// 		ReactNativeAN.sendNotification(details);
// 	};

// 	componentDidMount() {
// 		DeviceEventEmitter.addListener('OnNotificationDismissed', async function(e) {
// 			const obj = JSON.parse(e);
// 			console.log(`Notification id: ${obj.id} dismissed`);
// 		});
		
// 		DeviceEventEmitter.addListener('OnNotificationOpened', async function(e) {
// 			const obj = JSON.parse(e);
// 			console.log(obj);
// 		});
//   }
  
//   viewAlarms = async () => {
//     const list = await ReactNativeAN.getScheduledAlarms();
//     this.setState({ update: JSON.stringify(list) });
//   }
	
// 	componentWillUnmount() {
// 		DeviceEventEmitter.removeListener('OnNotificationDismissed');
// 		DeviceEventEmitter.removeListener('OnNotificationOpened');
// 	}
	
// 	render() {
// 		const { update, fireDate, futureFireDate } = this.state;
// 		return (
// 			<View style={{flex:1, padding: 20}}>
// 				<Text>Alarm Date (01-01-1976 00:00:00)</Text>
// 				<View>
// 					<TextInput
// 						style={{height: 40, borderColor: 'gray', borderWidth: 1}}
// 						onChangeText={(text) => this.setState({ fireDate: text })}
// 						value={fireDate}
// 					/>
// 				</View>
// 				<View>
// 					<Text>Alarm Time From Now (eg 5):</Text>
// 					<TextInput
// 						style={{height: 40, borderColor: 'gray', borderWidth: 1}}
// 						onChangeText={(text) => this.setState({ futureFireDate: text })}
// 						value={futureFireDate}
// 					/>
// 				</View>
// 				<View style={{marginVertical: 18}}>
// 					<Button
// 						onPress={this.setAlarm}
// 						title="Set Alarm"
// 						color="#7fff00"
// 					/>
// 				</View>
// 				<View style={{marginVertical: 18}}>
// 					<Button
// 						onPress={this.setFutureAlarm}
// 						title="Set Future Alarm"
// 						color="#7fff00"
// 					/>
// 				</View>
// 				<View style={{marginVertical: 18}}>
// 					<Button
// 						onPress={this.sendNotification}
// 						title="Send Notification Now"
// 						color="#7fff00"
// 					/>
// 				</View>
// 				<View style={{marginVertical: 18}}>
// 					<Button
// 						onPress={this.stopAlarm}
// 						title="Stop Alarm Sound"
// 						color="#841584"
// 					/>
// 				</View>
// 				<View style={{marginVertical: 18}}>
// 					<Button
// 						onPress={this.viewAlarms}
// 						title="See all active alarms"
// 						color="#841584"
// 					/>
// 				</View>
// 				<Text>{update}</Text>
// 			</View>
// 		);
// 	}
// }
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, SafeAreaView, View , Button} from 'react-native';
import moment from 'moment';
import firebaseDb from './firebaseDb';
import {decode, encode} from 'base-64';
import ReactNativeAN from 'react-native-alarm-notification';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

class App extends Component {
  state = {
    enableNotification: true,
    isDateTimePickerVisible: false,
    days:["Monday","Tuesday","Wednesday","Thursday","Friday"],
    dates:[moment('29/06/2020','DD/MM/YYYY',true).format('DD/MM/YYYY'),moment('30/06/2020','DD/MM/YYYY',true).format('DD/MM/YYYY'),moment('01/07/2020','DD/MM/YYYY',true).format('DD/MM/YYYY'),moment('02/07/2020','DD/MM/YYYY',true).format('DD/MM/YYYY'),moment('03/07/2020','DD/MM/YYYY',true).format('DD/MM/YYYY')],
    notificationTime: moment({ hour: 17 }),
	modules:[],
	update:''
  };

  getDetails=()=> {
    //alert(this.state.days)
   //alert(this.state.dates)
   
    let i = 0;
    let j = 0;
    let time = '0';
    let date = new Date();
    const modules=[];
   // for(i=0;i<5;i++) {
	   alert("hi")
      firebaseDb.firestore()
      .collection('users')
      .doc("OMGYdR83puSLDnGUKLcqoZe49I53")
      .collection('classes')
      .doc('Days')
      .collection('Wednesday')
      //.orderBy('selectedHourst','asc')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
         {  
            let min = 0;
            alert(doc.data().selectedMinutesf)
            let hr = 0;
            min = (doc.data().selectedMinutesf - 30>=0)?doc.data().selectedMinutesf - 30:60-(doc.data().selectedMinutesf - 30);
            hr =  ((doc.data().selectedMinutesf - 30)>=0)?doc.data().selectedHoursf:doc.data().selectedHoursf-1;
            time = hr.toString()+':'+min.toString()
            modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
            date = moment(this.state.dates[2]+' '+time,"DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss")
           this.setState({notificationTime:date,modules:modules})
           alert(this.state.notificationTime);
           this.setReminder(j);
           j++;
         }
         
        })
      })
   //}
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { notificationTime, enableNotification } = this.state;

  //   if (enableNotification !== prevState.enableNotification || notificationTime !== prevState.notificationTime) {
  //     this.setReminder();
  //   }
  // }
  componentDidMount() {
    this.getDetails();
  }

    viewAlarms = async () => {
    const list = await ReactNativeAN.getScheduledAlarms();
    this.setState({ update: JSON.stringify(list) });
  }

  setReminder = (i) => {
	const fireDate = ReactNativeAN.parseDate(this.state.notificationTime);  
	alert(fireDate)
	const alarm ={
		alarm_id: toString(i),
		channel:'reminder',
		color:'red',
		fire_date:fireDate,
		has_button:true,
		message:this.state.modules[i],
		repeat_interval: 10080,
		schedule_type: "repeat",
		title:'Class Reminder'
	}
	ReactNativeAN.scheduleAlarm(alarm);
  };


  render() {
    
    return (
       <SafeAreaView style={styles.container}>
       <View style={styles.cardTitleView}>
           <Text style={styles.cardTitle}>Add Reminder</Text>
		   <Button
				onPress={this.viewAlarms}
				title="See all active alarms"
				color="#841584"
			/>
				<Text>{this.state.update}</Text>
         </View>
        {/* 
      //   <ListItem
      //     title="Notification"
      //     bottomDivider
      //     titleStyle={styles.titleStyle}
      //     switch={{ onValueChange: this.enableNotification, value: enableNotification }}
      //   />
      //   <ListItem
      //     title="Time"
      //     titleStyle={styles.titleStyle}
      //     onPress={this.showDateTimePicker}
      //     rightElement={<Text style={{ opacity: 0.7 }}>{moment(notificationTime).format('LT')}</Text>}
      //   />
      //   <DateTimePicker
      //     isVisible={isDateTimePickerVisible}
      //     onConfirm={this.handleDatePicked}
      //     onCancel={this.hideDateTimePicker}
      //     mode="time"
      //     is24Hour={false}
      //     date={new Date(notificationTime)}
      //     titleIOS="Pick your Notification time"
      //   /> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEFF0',
  },
  cardTitleView: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    color: '#585858',
    fontWeight: '600',
  },
  titleStyle: {
    fontSize: 20,
    color: '#585858',
  },
});
export default App;