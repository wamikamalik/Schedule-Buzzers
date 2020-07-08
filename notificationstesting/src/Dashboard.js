// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, SafeAreaView, View } from 'react-native';
// import { ListItem } from 'react-native-elements';
// import firebase from 'react-native-firebase';
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import moment from 'moment';

// export default class Dashboard extends Component {
//   state = {
//     enableNotification: true,
//     isDateTimePickerVisible: false,
//     days:[moment('29/06/2020','DD/MM/YYYY',true).format('dddd'),moment('30/06/2020','DD/MM/YYYY',true).format('dddd'),moment('01/07/2020','DD/MM/YYYY',true).format('dddd'),moment('02/07/2020','DD/MM/YYYY',true).format('dddd'),moment('03/07/2020','DD/MM/YYYY',true).format('dddd')],
//     notificationTime: moment({ hour: 17 }),
//   };

//   componentDidMount() {
//     alert(this.state.days)
//     this.setReminder();
//   }

//   // componentDidUpdate(prevProps, prevState) {
//   //   const { notificationTime, enableNotification } = this.state;

//   //   if (enableNotification !== prevState.enableNotification || notificationTime !== prevState.notificationTime) {
//   //     this.setReminder();
//   //   }
//   // }

//   setReminder = async () => {
//     const { notificationTime, enableNotification } = this.state;

//     if (enableNotification) {
//       firebase.notifications().scheduleNotification(this.buildNotification(), {
//         fireDate: notificationTime.valueOf(),
//         repeatInterval: 'day',
//         exact: true,
//       });
//     } else {
//       return false;
//     }
//   };

//   buildNotification = () => {
//     const title = Platform.OS === 'android' ? 'Daily Reminder' : '';
//     const notification = new firebase.notifications.Notification()
//       .setNotificationId('1')
//       .setTitle(title)
//       .setBody('This is a notification')
//       .android.setPriority(firebase.notifications.Android.Priority.High)
//       .android.setChannelId('reminder')
//       .android.setAutoCancel(true);

//     return notification;
//   };

//   enableNotification = value => {
//     this.setState({
//       enableNotification: value,
//     });
//   };

//   showDateTimePicker = () => {
//     this.setState({ isDateTimePickerVisible: true });
//   };

//   hideDateTimePicker = () => {
//     this.setState({ isDateTimePickerVisible: false });
//   };

//   handleDatePicked = date => {
//     this.hideDateTimePicker();

//     this.setState({
//       notificationTime: moment(date),
//     });
//   };

//   render() {
//     const { enableNotification, isDateTimePickerVisible, notificationTime } = this.state;
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.cardTitleView}>
//           <Text style={styles.cardTitle}>Add Reminder</Text>
//         </View>
//         <ListItem
//           title="Notification"
//           bottomDivider
//           titleStyle={styles.titleStyle}
//           switch={{ onValueChange: this.enableNotification, value: enableNotification }}
//         />
//         <ListItem
//           title="Time"
//           titleStyle={styles.titleStyle}
//           onPress={this.showDateTimePicker}
//           rightElement={<Text style={{ opacity: 0.7 }}>{moment(notificationTime).format('LT')}</Text>}
//         />
//         <DateTimePicker
//           isVisible={isDateTimePickerVisible}
//           onConfirm={this.handleDatePicked}
//           onCancel={this.hideDateTimePicker}
//           mode="time"
//           is24Hour={false}
//           date={new Date(notificationTime)}
//           titleIOS="Pick your Notification time"
//         />
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EEEFF0',
//   },
//   cardTitleView: {
//     paddingHorizontal: 15,
//     paddingTop: 15,
//     paddingBottom: 8,
//   },
//   cardTitle: {
//     fontSize: 15,
//     color: '#585858',
//     fontWeight: '600',
//   },
//   titleStyle: {
//     fontSize: 20,
//     color: '#585858',
//   },
// });

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, SafeAreaView, View , Button} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'react-native-firebase';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebaseDb from '../firebaseDb';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


export default class Dashboard extends Component {
  state = {
    enableNotification: true,
    isDateTimePickerVisible: false,
    days:["Monday","Tuesday","Wednesday","Thursday","Friday"],
    dates:[moment('29/06/2020','DD/MM/YYYY',true).format('DD/MM/YYYY'),moment('30/06/2020','DD/MM/YYYY',true).format('DD/MM/YYYY'),moment('01/07/2020','DD/MM/YYYY',true).format('DD/MM/YYYY'),moment('02/07/2020','DD/MM/YYYY',true).format('DD/MM/YYYY'),moment('03/07/2020','DD/MM/YYYY',true).format('DD/MM/YYYY')],
    notificationTime: moment({ hour: 17 }),
    modules:[]
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
            //alert(doc.data().selectedMinutesf)
            let hr = 0;
            min = (doc.data().selectedMinutesf - 30>=0)?doc.data().selectedMinutesf - 30:60-(doc.data().selectedMinutesf - 30);
            hr =  ((doc.data().selectedMinutesf - 30)>=0)?doc.data().selectedHoursf:doc.data().selectedHoursf-1;
            time = hr+':'+min
            modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
            date = moment(time).format("LT")
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


  setReminder = async (i) => {
    const { notificationTime } = this.state;

      firebase.notifications().scheduleNotification(this.buildNotification(i), {
        startDate: this.state.dates[2],
        endDate:moment('31/12/2029','DD-MM-YYYY'),
        fireDate: notificationTime.valueOf(),
        repeatInterval: 'week',
        exact: true,
      });
  };

  buildNotification = (i) => {
    const title = Platform.OS === 'android' ? 'Class Reminder' : '';
    const notification = new firebase.notifications.Notification()
      .setNotificationId(toString(i))
      .setTitle(title)
      .setBody(this.state.modules[i])
      .android.setPriority(firebase.notifications.Android.Priority.High)
      .android.setChannelId('reminder')
      .android.setAutoCancel(true);

    return notification;
  };



  render() {
    
    return (
       <SafeAreaView style={styles.container}>
       <View style={styles.cardTitleView}>
           <Text style={styles.cardTitle}>Add Reminder</Text>
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