import React, { Component } from 'react';
import { Alert, StyleSheet, View, ScrollView,Image, Text,ImageBackground, TouchableOpacity} from 'react-native';
import { Table, TableWrapper, Row, Cell,Col, Rows,Cols } from 'react-native-table-component';
import firebaseDb from '../firebaseDb';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import schedule from '../component/schedule';
import Constants from 'expo-constants'
import {Appbar, Title, Subheading} from 'react-native-paper'
import RNCalendarEvents from 'react-native-calendar-events';

const Stack = createStackNavigator();
function schedulenav() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator  mode='modal' headerMode='none'>
        <Stack.Screen name = 'scheduletable' component={seemyschedule}/>
        <Stack.Screen name = 'schedule' component={schedule}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}
class seemyschedule extends Component {

   constructor(props) {
    super(props);
    this.state = { 
      tableHead: ['Time','Monday','Tuesday','Wednesday','Thursday','Friday'],
      widthArr: [40, 100,100,100,100,100],
      heightArr:[80,80,80,80,80,80,80,80,80,80,80,80,80,80],
      modules:null,
      modules1:null,
      modules2:null,
      modules3:null,
      modules4:null, 
      heightArr1:[],
      heightArr2:[],
      heightArr3:[],
      heightArr4:[],
      heightArr5:[],
      //num:null
    }
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

 getDetails = () => {
  var user = firebaseDb.auth().currentUser;
  var days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
  let i = 8
  let j=8
  let k= 8
  let l=8
  let m=8
  //let j = 0
  //const num = []
  //let j=0;
  
   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('classes')
   .doc('Days')
   .collection('Monday')
   .orderBy('selectedHourst','asc')
   .get()
   .then(snapshot => {
     const modules=[]
     let hm = 0,h=0;
     const height = [];
     let hr = 8;
     let min = 0;
     snapshot.forEach(doc => {
      {  //j++; 
        hm = 0;
        if(parseInt(doc.data().selectedHoursf)==i) {
          if(min!=parseInt(doc.data().selectedMinutesf)) {
            modules.push(" ");
            hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
            height.push(80*hm);
            h=h+hm;
          }
          modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
          i=i+1;
          //hm++;
          hr=parseInt(doc.data().selectedHourst);
          min = parseInt(doc.data().selectedMinutest);
          while(i<parseInt(doc.data().selectedHourst)) {
            //modules.push(" ")
            //hm ++;
            i=i+1;
          }
          hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
          height.push(80*hm);
          h=h+hm;
        }
        else {
          modules.push(" ");
          while(i!=parseInt(doc.data().selectedHoursf) && i<21) {
          //modules.push(" ")
          //hm++;
          i=i+1;
          //alert(doc.data().selectedHoursf+','+String(i))
        }
        hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
        height.push(80*hm);
        h=h+hm;
        hm = 0;
        if(parseInt(doc.data().selectedHoursf)==i) {
          modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
          i=i+1;
          //hm++;
          hr=parseInt(doc.data().selectedHourst);
          min = parseInt(doc.data().selectedMinutest);
          while(i<parseInt(doc.data().selectedHourst)) {
            //modules.push(" ")
            //hm++;
            i=i+1;
          }
        }
        hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
        height.push(80*hm);
        h=h+hm;
      }
      }
      //  const data= doc.data()
      //  modules.push(data)
      //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
     })
     //num.push(j)
     //alert(modules)
     height.push(80*(14-h));
     modules.push(" ")
     this.setState((state, props) => ({ modules: modules, heightArr1:height }))
   })

   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('classes')
   .doc('Days')
   .collection('Tuesday')
   .orderBy('selectedHourst','asc')
   .get()
   .then(snapshot => {
    const modules1=[]
    let hm = 0,h=0;
    const height = [];
    let hr = 8;
    let min = 0;
    snapshot.forEach(doc => {
     {  //j++; 
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==j) {
         if(min!=parseInt(doc.data().selectedMinutesf)) {
           modules1.push(" ");
           hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
           height.push(80*hm);
           h=h+hm;
         }
         modules1.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         j=j+1;
         //hm++;
         hr=parseInt(doc.data().selectedHourst);
         min = parseInt(doc.data().selectedMinutest);
         while(j<parseInt(doc.data().selectedHourst)) {
           //modules.push(" ")
           //hm ++;
           j=j+1;
         }
         hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
         height.push(80*hm);
         h=h+hm;
       }
       else {
         modules1.push(" ");
         while(j!=parseInt(doc.data().selectedHoursf) && j<21) {
         //modules.push(" ")
         //hm++;
         j=j+1;
         //alert(doc.data().selectedHoursf+','+String(i))
       }
       hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
       height.push(80*hm);
       h=h+hm;
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==j) {
         modules1.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         j=j+1;
         //hm++;
         hr=parseInt(doc.data().selectedHourst);
         min = parseInt(doc.data().selectedMinutest);
         while(j<parseInt(doc.data().selectedHourst)) {
           //modules.push(" ")
           //hm++;
           j=j+1;
         }
       }
       hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
       height.push(80*hm);
       h=h+hm;
     }
     }
     //  const data= doc.data()
     //  modules.push(data)
     //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
    })
    //num.push(j)
    //alert(modules)
    height.push(80*(14-h));
    modules1.push(" ")
    this.setState((state, props) => ({ modules1: modules1, heightArr2:height }))
  })
   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('classes')
   .doc('Days')
   .collection('Wednesday')
   .orderBy('selectedHourst','asc')
   .get()
   .then(snapshot => {
    const modules2=[]
    let hm = 0,h=0;
    const height = [];
    let hr = 8;
    let min = 0;
    snapshot.forEach(doc => {
     {  //j++; 
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==k) {
         if(min!=parseInt(doc.data().selectedMinutesf)) {
           modules2.push(" ");
           hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
           height.push(80*hm);
           h=h+hm;
         }
         modules2.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         k=k+1;
         //hm++;
         hr=parseInt(doc.data().selectedHourst);
         min = parseInt(doc.data().selectedMinutest);
         while(k<parseInt(doc.data().selectedHourst)) {
           //modules.push(" ")
           //hm ++;
           k=k+1;
         }
         hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
         height.push(80*hm);
         h=h+hm;
       }
       else {
         modules2.push(" ");
         while(k!=parseInt(doc.data().selectedHoursf) && k<21) {
         //modules.push(" ")
         //hm++;
         k=k+1;
         //alert(doc.data().selectedHoursf+','+String(i))
       }
       hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
       height.push(80*hm);
       h=h+hm;
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==k) {
         modules2.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         k=k+1;
         //hm++;
         hr=parseInt(doc.data().selectedHourst);
         min = parseInt(doc.data().selectedMinutest);
         while(k<parseInt(doc.data().selectedHourst)) {
           //modules.push(" ")
           //hm++;
           k=k+1;
         }
       }
       hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
       height.push(80*hm);
       h=h+hm;
     }
     }
     //  const data= doc.data()
     //  modules.push(data)
     //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
    })
    //num.push(j)
    //alert(modules)
    height.push(80*(14-h));
    modules2.push(" ")
    this.setState((state, props) => ({ modules2: modules2, heightArr3:height }))
  })

   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('classes')
   .doc('Days')
   .collection('Thursday')
   .orderBy('selectedHourst','asc')
   .get()
   .then(snapshot => {
    const modules3=[]
    let hm = 0,h=0;
    const height = [];
    let hr = 8;
    let min = 0;
    snapshot.forEach(doc => {
     {  //j++; 
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==l) {
         if(min!=parseInt(doc.data().selectedMinutesf)) {
           modules3.push(" ");
           hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
           height.push(80*hm);
           h=h+hm;
         }
         modules3.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         l=l+1;
         //hm++;
         hr=parseInt(doc.data().selectedHourst);
         min = parseInt(doc.data().selectedMinutest);
         while(l<parseInt(doc.data().selectedHourst)) {
           //modules.push(" ")
           //hm ++;
           l=l+1;
         }
         hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
         height.push(80*hm);
         h=h+hm;
       }
       else {
         modules3.push(" ");
         while(l!=parseInt(doc.data().selectedHoursf) && l<21) {
         //modules.push(" ")
         //hm++;
         l=l+1;
         //alert(doc.data().selectedHoursf+','+String(i))
       }
       hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
       height.push(80*hm);
       h=h+hm;
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==l) {
         modules3.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         l=l+1;
         //hm++;
         hr=parseInt(doc.data().selectedHourst);
         min = parseInt(doc.data().selectedMinutest);
         while(l<parseInt(doc.data().selectedHourst)) {
           //modules.push(" ")
           //hm++;
           l=l+1;
         }
       }
       hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
       height.push(80*hm);
       h=h+hm;
     }
     }
     //  const data= doc.data()
     //  modules.push(data)
     //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
    })
    //num.push(j)
    //alert(modules)
    height.push(80*(14-h));
    modules3.push(" ")
    this.setState((state, props) => ({ modules3: modules3, heightArr4:height }))
  })

   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('classes')
   .doc('Days')
   .collection('Friday')
   .orderBy('selectedHourst','asc')
   .get()
   .then(snapshot => {
    const modules4=[]
    let hm = 0,h=0;
    const height = [];
    let hr = 8;
    let min = 0;
    snapshot.forEach(doc => {
     {  //j++; 
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==m) {
         if(min!=parseInt(doc.data().selectedMinutesf)) {
           modules4.push(" ");
           hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
           height.push(80*hm);
           h=h+hm;
         }
         modules4.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         m=m+1;
         //hm++;
         hr=parseInt(doc.data().selectedHourst);
         min = parseInt(doc.data().selectedMinutest);
         while(m<parseInt(doc.data().selectedHourst)) {
           //modules.push(" ")
           //hm ++;
           m=m+1;
         }
         hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
         height.push(80*hm);
         h=h+hm;
       }
       else {
         modules4.push(" ");
         while(m!=parseInt(doc.data().selectedHoursf) && m<21) {
         //modules.push(" ")
         //hm++;
         m=m+1;
         //alert(doc.data().selectedHoursf+','+String(i))
       }
       hm = parseInt(doc.data().selectedHoursf)-hr + (parseInt(doc.data().selectedMinutesf)-min)/60.0
       height.push(80*hm);
       h=h+hm;
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==m) {
         modules4.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         m=m+1;
         //hm++;
         hr=parseInt(doc.data().selectedHourst);
         min = parseInt(doc.data().selectedMinutest);
         while(m<parseInt(doc.data().selectedHourst)) {
           //modules.push(" ")
           //hm++;
           m=m+1;
         }
       }
       hm = parseInt(doc.data().selectedHourst)-parseInt(doc.data().selectedHoursf) + (parseInt(doc.data().selectedMinutest)-parseInt(doc.data().selectedMinutesf))/60.0
       height.push(80*hm);
       h=h+hm;
     }
     }
     //  const data= doc.data()
     //  modules.push(data)
     //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
    })
    //num.push(j)
    //alert(modules)
    height.push(80*(14-h));
    modules4.push(" ")
    this.setState((state, props) => ({ modules4: modules4, heightArr5:height }))
  })
 }

 onremoving= (data,day) =>{
  const user = firebaseDb.auth().currentUser.uid;
  let Module = []
  Module = data.split('\n')
  // alert(data)
  // alert(day)
  if ((user)&&(day!=null)&&day!="") {
    if(data!=null&&data!="") {

      firebaseDb.firestore()
      .collection('users')
      .doc(user)
      .collection('classes')
      .doc('Days')
      .collection(day)
      .doc(Module[0]+Module[1])
      .get()
      .then((doc)=>{
          if(!doc.exists) {
              alert("No such schedule found!")
          }
          else{
            const id = doc.data().Id
              firebaseDb.firestore()
              .collection('users')
              .doc(user)
              .collection('classes')
              .doc('Days')
              .collection(day)
              .doc(Module[0]+Module[1])
              .delete()
              .then(() => {
                RNCalendarEvents.removeEvent(id)
                alert("Removed from your schedule! ");
                })     
          }
      })  
  }
  else {
    alert("No class at this time.")
  }      
  }  
  else{
    alert("Please enter the Day.")
  }    
 }
removeMod = (data,day)=>{
  let Module = []
  Module = data.split('\n')
  const user = firebaseDb.auth().currentUser.uid;
  if ((user)&&(day!=null)&&day!="") {
    if(data!=null&&data!="") {
  firebaseDb.firestore()
  .collection('users')
  .doc(user)
  .collection('classes')
  .doc('Days')
  .collection("Monday")
  .where("Module" , "==" , Module[0])
  .get()
  .then((snapshot)=>{


  snapshot.forEach(doc =>{
    const id= doc.id;
    const id2= doc.data().Id;
    firebaseDb.firestore()
          .collection('users')
          .doc(user)
          .collection('classes')
          .doc('Days')
          .collection("Monday")
          .doc(id)
        .delete()
          .then(() => {
           // alert("0");
            RNCalendarEvents.removeEvent(id2)
           // alert("Removed from your schedule! ");
            })     
           } )
          }
  
)

firebaseDb.firestore()
  .collection('users')
  .doc(user)
  .collection('classes')
  .doc('Days')
  .collection("Tuesday")
  .where("Module" , "==" , Module[0])
  .get()
  .then((snapshot)=>{


  snapshot.forEach(doc =>{
    const id= doc.id;
    const id2= doc.data().Id;
    firebaseDb.firestore()
          .collection('users')
          .doc(user)
          .collection('classes')
          .doc('Days')
          .collection("Tuesday")
          .doc(id)
        .delete()
          .then(() => {
           // alert("1");
            RNCalendarEvents.removeEvent(id2)
           // alert("Removed from your schedule! ");
            })     
           } )
          }
  
)

firebaseDb.firestore()
  .collection('users')
  .doc(user)
  .collection('classes')
  .doc('Days')
  .collection("Wednesday")
  .where("Module" , "==" , Module[0])
  .get()
  .then((snapshot)=>{


  snapshot.forEach(doc =>{
    const id= doc.id;
    const id2= doc.data().Id;
    firebaseDb.firestore()
          .collection('users')
          .doc(user)
          .collection('classes')
          .doc('Days')
          .collection("Wednesday")
          .doc(id)
        .delete()
          .then(() => {
           // alert("2");
            RNCalendarEvents.removeEvent(id2)
           // alert("Removed from your schedule! ");
            })     
           } )
          }
  
)

firebaseDb.firestore()
  .collection('users')
  .doc(user)
  .collection('classes')
  .doc('Days')
  .collection("Thursday")
  .where("Module" , "==" , Module[0])
  .get()
  .then((snapshot)=>{


  snapshot.forEach(doc =>{
    const id= doc.id;
    const id2= doc.data().Id;
    firebaseDb.firestore()
          .collection('users')
          .doc(user)
          .collection('classes')
          .doc('Days')
          .collection("Thursday")
          .doc(id)
        .delete()
          .then(() => {
          //  alert("3");
            RNCalendarEvents.removeEvent(id2)
           // alert("Removed from your schedule! ");
            })     
           } )
          }
  
)

firebaseDb.firestore()
  .collection('users')
  .doc(user)
  .collection('classes')
  .doc('Days')
  .collection("Friday")
  .where("Module" , "==" , Module[0])
  .get()
  .then((snapshot)=>{


  snapshot.forEach(doc =>{
    const id= doc.id;
    const id2= doc.data().Id;
    firebaseDb.firestore()
          .collection('users')
          .doc(user)
          .collection('classes')
          .doc('Days')
          .collection("Friday")
          .doc(id)
        .delete()
          .then(() => {
           // alert('4');
            RNCalendarEvents.removeEvent(id2)
           // alert("Removed from your schedule! ");
            })     
           } )
          }
  
)

        }else {
         
            alert("No class selected")
          }   
        }

      
      else{
        alert("Please enter the Day.")
      }    
}


 removeAll= () =>{
  const user = firebaseDb.auth().currentUser.uid;
  var a=0;
  var b=0;
  var c=0
  var d=0;
  var e=0;

  

  firebaseDb.firestore()
      .collection('users')
      .doc(user)
      .collection('classes')
      .doc('Days')
      .collection("Monday")
      .get()
      .then((snapshot)=>{
    if (snapshot.size!=0){
      a=1;
      snapshot.forEach(doc =>{
        const id= doc.id;
        const id2= doc.data().Id;
        firebaseDb.firestore()
              .collection('users')
              .doc(user)
              .collection('classes')
              .doc('Days')
              .collection("Monday")
              .doc(id)
              .delete()
              .then(() => {
                RNCalendarEvents.removeEvent(id2)
               // alert("Removed from your schedule! ");
                })     
               } )
              }
        //  alert("Removed from your schedule! ");}
  })

      firebaseDb.firestore()
      .collection('users')
      .doc(user)
      .collection('classes')
      .doc('Days')
      .collection("Tuesday")
      .get()
      .then((snapshot)=>{
    if (snapshot.size!=0){
      b=1;
      snapshot.forEach(doc =>{
        const id= doc.id;
        const id2= doc.data().Id;
        firebaseDb.firestore()
              .collection('users')
              .doc(user)
              .collection('classes')
              .doc('Days')
              .collection("Tuesday")
              .doc(id)
              .delete()
              .then(() => {
                RNCalendarEvents.removeEvent(id2)
               // alert("Removed from your schedule! ");
                })     
               } )
              }
        //  alert("Removed from your schedule! ");}
  })


  firebaseDb.firestore()
  .collection('users')
  .doc(user)
  .collection('classes')
  .doc('Days')
  .collection("Wednesday")
  .get()
  .then((snapshot)=>{
if (snapshot.size!=0){
  c=1;
  snapshot.forEach(doc =>{
    const id= doc.id;
    const id2= doc.data().Id;
    firebaseDb.firestore()
          .collection('users')
          .doc(user)
          .collection('classes')
          .doc('Days')
          .collection("Wednesday")
          .doc(id)
          .delete()
          .then(() => {
            RNCalendarEvents.removeEvent(id2)
           // alert("Removed from your schedule! ");
            })     
           } )
          }
    //  alert("Removed from your schedule! ");}
})

firebaseDb.firestore()
.collection('users')
.doc(user)
.collection('classes')
.doc('Days')
.collection("Thursday")
.get()
.then((snapshot)=>{
if (snapshot.size!=0){
d=1;
snapshot.forEach(doc =>{
  const id= doc.id;
  const id2= doc.data().Id;
  firebaseDb.firestore()
        .collection('users')
        .doc(user)
        .collection('classes')
        .doc('Days')
        .collection("Thursday")
        .doc(id)
        .delete()
        .then(() => {
          RNCalendarEvents.removeEvent(id2)
         // alert("Removed from your schedule! ");
          })     
         } )
        }
  //  alert("Removed from your schedule! ");}
})


firebaseDb.firestore()
.collection('users')
.doc(user)
.collection('classes')
.doc('Days')
.collection("Friday")
.get()
.then((snapshot)=>{
if (snapshot.size!=0){
e=1;
snapshot.forEach(doc =>{
  const id= doc.id;
  const id2= doc.data().Id;
  firebaseDb.firestore()
        .collection('users')
        .doc(user)
        .collection('classes')
        .doc('Days')
        .collection("Friday")
        .doc(id)
        .delete()
        .then(() => {
          RNCalendarEvents.removeEvent(id2)
         // alert("Removed from your schedule! ");
          })     
         } )
        }
  //  alert("Removed from your schedule! ");}
})








    }
          
             
          
      
    
  

  
    showAlert() {  
      Alert.alert(  
          'Delete Schedule',  
          'Are you sure you want to delete the schedule?',  
          [  
              {  
                  text: 'Yes',  
                  onPress: () => this.removeAll(),  
                 
              },  
              {text: 'No', onPress: () => console.log('No Pressed')},  
          ]  
      );  
  }  



 componentDidMount() {
   this.getDetails();
   this._getCalendarStatus();
   this._requestCalendarPermissions();
 }

 componentDidUpdate(prevProps,prevState) {

  if(prevState.modules!=this.state.modules){
   this.getDetails();
   //prevState = this.state
  }
 }

  render() {

     const state = this.state;
     let i = 8;
     let j= 0;
    const monday = [];
    const tuesday = [];
    const wednesday = [];
    const thursday = [];
    const friday = [];
    const numb = [];
    const HeightMon = [];
    const HeightTue = [];
    const HeightWed = [];
    const HeightThu = [];
    const HeightFri = [];

    this.state.modules &&
    this.state.modules.map( module => (
      monday.push(module)
    ))
    this.state.heightArr1 &&
    this.state.heightArr1.map(h => (
      HeightMon.push(h)
    ))
    this.state.modules1 &&
    this.state.modules1.map( module => (
      tuesday.push(module)
    ))
    this.state.heightArr2 &&
    this.state.heightArr2.map(h => (
      HeightTue.push(h)
    ))
    this.state.modules2 &&
    this.state.modules2.map( module => (
      wednesday.push(module)
    ))
    this.state.heightArr3 &&
    this.state.heightArr3.map(h => (
      HeightWed.push(h)
    ))
    this.state.modules3 &&
    this.state.modules3.map( module => (
      thursday.push(module)
    ))
    this.state.heightArr4 &&
    this.state.heightArr4.map(h => (
      HeightThu.push(h)
    ))
    this.state.modules4 &&
    this.state.modules4.map( module => (
      friday.push(module)
    ))
    this.state.heightArr5 &&
    this.state.heightArr5.map(h => (
      HeightFri.push(h)
    ))
    // this.state.num &&
    // this.state.num.map( num => (
    //   numb.push(num)
    // ))

    const element = (data,day) => (
      <TouchableOpacity onPress={() => {
        let message = data
        Alert.alert(  
          'Remove class on '+day+".",  
          message+'\n'+"Do you want to remove all the classes related to this module?",  
          [  
              {  
                  text: 'Yes, remove all classes',  
                  onPress: () => this.removeMod(data,day),    
              },  
              {text: 'No, just this class', onPress: () => this.onremoving(data,day)},
              {text: 'No, do not remove anything', onPress: () => console.log("No pressed!")},  
          ]  
        );  
      }}>
        <Text>{data}</Text>
      </TouchableOpacity>
    );
    
   const rowData = [[800],[900],[1000],[1100],[1200],[1300],[1400],[1500],[1600],[1700],[1800],[1900],[2000],[2100]];
  
    return (
      <View style={styles.container}>
     <Appbar style={styles.top}>
   <Appbar.Action
     icon={require('../assets/slideinw.png')}
     onPress={() => this.props.navigation.openDrawer()}
    />
     <Appbar.Content title="My Current Schedule" />
     {/* <Appbar.Action
     icon={require('../assets/removeMod.png')}
     onPress={() => this.removeMod()}
    /> */}
     <Appbar.Action
     icon={require('../assets/deleteall3.png')}
     onPress={() => this.showAlert()}
    />
     <Appbar.Action
     icon={require('../assets/addassignmentlogo.png')}
     onPress={() => this.props.navigation.navigate('schedule')}
    />
    </Appbar>
   <View style={styles.container1}>
        <ScrollView horizontal={true}>
          <View >
            <Table borderStyle={{borderColor: '#C1C0B9', borderWidth: 2}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              {<Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 2, borderColor: '#C1C0B9'}}>
                  <TableWrapper style={{flexDirection: 'row'}}>
                    <Col 
                      
                      width={40}
                      data={rowData}
                      heightArr={state.heightArr}
                      style={styles.row}
                      textStyle={styles.text1}
                    />
                    </TableWrapper>
                    <TableWrapper style={{flexDirection: 'column'}}>
                  {
                  HeightMon&&monday.map((cellData, index) => (
                    <Cell style={{width: 100, height: HeightMon[index], flex:1, backgroundColor: 'white',alignItems:'center' , alignSelf:'center'}} data={element(cellData, "Monday")} textStyle={styles.text}/>
                  ))
                  }
                  </TableWrapper>
                  <TableWrapper style={{flexDirection: 'column'}}>
                  {
                  HeightTue&&tuesday.map((cellData, index) => (
                    <Cell style={{width: 100, height: HeightTue[index], flex:1, backgroundColor: 'white',alignItems:'center' , alignSelf:'center'}} data={element(cellData, "Tuesday")} textStyle={styles.text}/>
                  ))
                  }
                  </TableWrapper>
                  <TableWrapper style={{flexDirection: 'column'}}>
                  {
                  HeightWed&&wednesday.map((cellData, index) => (
                    <Cell style={{width: 100, height: HeightWed[index], flex:1, backgroundColor: 'white',alignItems:'center' , alignSelf:'center'}} data={element(cellData, "Wednesday")} textStyle={styles.text}/>
                  ))
                  }
                  </TableWrapper>
                  <TableWrapper style={{flexDirection: 'column'}}>
                  {
                  HeightThu&&thursday.map((cellData, index) => (
                    <Cell style={{width: 100, height: HeightThu[index], flex:1, backgroundColor: 'white',alignItems:'center' , alignSelf:'center'}} data={element(cellData, "Thursday")} textStyle={styles.text}/>
                  ))
                  }
                  </TableWrapper>
                  <TableWrapper style={{flexDirection: 'column'}}>
                  {
                  HeightFri&&friday.map((cellData, index) => (
                    <Cell style={{width: 100, height: HeightFri[index], flex:1, backgroundColor: 'white',alignItems:'center' , alignSelf:'center'}} data={element(cellData, "Friday")} textStyle={styles.text}/>
                  ))
                  }
                  </TableWrapper>
              </Table>}

            </ScrollView>
          </View>
        </ScrollView>
        </View>
        </View>
     
    )
  }
}

const styles = StyleSheet.create({
  container: {  flex: 1, backgroundColor: '#ffebcd', },
  container1: {  flex: 1, backgroundColor: '#ffebcd', justifyContent:'center',alignItems:'center'},
  header: { height: 50, backgroundColor: '#a984ed' },
  top: {
    backgroundColor:"#c17eef"
},
  text: { textAlign: 'center', fontWeight: '100' , color:'black'},
  text1: { textAlign: 'center', fontWeight: '100' , color:'black',position:'absolute',top:3}, 
  dataWrapper: { marginTop: -1 },
  row: { flex:1, backgroundColor: '#e2bff7',alignItems:'flex-start' , alignSelf:'center'},
  row1: { flex:1, backgroundColor: 'white',alignItems:'flex-start' , alignSelf:'center' },
  row2: { flex:1, backgroundColor: 'white',alignItems:'flex-start' , alignSelf:'center' },
  row3: { flex:1, backgroundColor: 'white',alignItems:'flex-start'  , alignSelf:'center'},
  row4: { flex:1, backgroundColor: 'white',alignItems:'flex-start'  , alignSelf:'center'},
  row5: { flex:1, backgroundColor: 'white',alignItems:'flex-start'  , alignSelf:'center'},
 
  image: {
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    alignSelf: 'flex-start',
    height: 40,
    width:30,
    marginLeft:15
 
},
texta: {
  color: "black",
  fontSize: 28,
  fontWeight:"bold",
  alignSelf:'center',
  marginTop:30,
  marginBottom:30,
  textDecorationLine:"underline",
  justifyContent: 'center',
  textDecorationLine: "underline"
  
},
});
export default schedulenav;

