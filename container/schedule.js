import React, {Component} from 'react';
import { StyleSheet,ImageBackground, Image, Text, View,Button, Picker, Modal, TouchableHighlight,TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
//import {Button} from 'react-native-elements';
import TimePicker from 'react-native-simple-time-picker';
import firebaseDb from '../firebaseDb';
import BlackButton from '../component/BlackButton';
 

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
      
  };
  handleUpdateDay = Day => this.setState({Day})
  handleUpdateModule = Module => this.setState({Module})
  handleUpdateClass = Class => this.setState({Class})
  handleUpdateselectedHoursf = selectedHoursf => this.setState({selectedHoursf})
  handleUpdateselectedMinutesf = selectedMinutesf => this.setState({selectedMinutesf})
  handleUpdateselectedHourst = selectedHourst => this.setState({selectedHourst})
  handleUpdateselectedMinutest = selectedMinutest => this.setState({selectedMinutest})
  handleUpdateLocation = Location=> this.setState({Location})

  
  HandleUser = () => {
    const user = firebaseDb.auth().currentUser.uid;
    
    if (user) {
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
          selectedHoursf: this.state.selectedHoursf,
          selectedMinutesf: this.state.selectedMinutesf,
          selectedHourst: this.state.selectedHourst,
          selectedMinutest: this.state.selectedMinutest,
          Location: this.state.Location

         })
        
        
        }

  }
onremoving= () =>{
  const user = firebaseDb.auth().currentUser.uid;
        if (user) {
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
                       
                    })
                    
                }
            })
            
        }   
     }



  handleAdd = () => {

  alert("Saved to your schedule!");
 this.HandleUser();
 
  }
  
   handleRemove = () => {
     alert("Removed from your schedule! ");
     this.onremoving();
  

  }

  render() {
    const { Module, selectedHoursf,selectedMinutesf,selectedHourst,selectedMinutest, Location } = this.state;
    const { Day } = this.state;
    const { Class } = this.state;
    if (selectedHoursf > selectedHourst) {
      alert("This time is not possible");
     }
      else if (selectedMinutesf>selectedMinutest && selectedHoursf==selectedHourst){
      alert("This time is not possible");}
      else
      {
     
      }
      return (
         <SafeAreaView style={styles.container}>
             <ImageBackground style={{flex: 1, resizeMode: "cover"}} source={require('../assets/scheduleback.jpg')}>
              <TouchableOpacity style={{marginTop: 20}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slidein.png')}/>
                </TouchableOpacity>
               <Text style={styles.textb}>Add to schedule</Text>
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
          selectedHours={selectedHoursf}
          //initial Hours value
          selectedMinutes={selectedMinutesf}
          //initial Minutes value
          onChange={(selectedHoursf, selectedMinutesf) =>
            this.setState({ selectedHoursf:selectedHoursf, selectedMinutesf: selectedMinutesf })
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
            <Button
            style={styles.button1}
            title="Add"
      color="black"
            onPress={this.handleAdd}
          />
           <Button
            style={styles.button1}
            title="Remove"
            color="black"
            onPress={this.handleRemove}
          />
            </ImageBackground>
          </SafeAreaView>  
      ) 
  }  
}  
const styles = StyleSheet.create ({  
  container:{
    flex: 1,
    backgroundColor: 'transparent',
  flexDirection:"column"
  },
  image: {
    justifyContent: "center",
    alignItems:'center',
    //alignSelf: 'flex-start',
    height: 40,
    width:30,
    marginLeft:15,
    flexDirection:"column"
},
  pickerStyle:{
      left : 50,
      height:50,
      width: "20%",
      color: '#344953',
      //flexDirection: "",
    justifyContent: "center",
    alignSelf: "center"
  },
  pickerStyle2:{
      height: 50,
      width: "20%",
      color: '#344953',
      justifyContent: 'center', 
      alignSelf: "center" },
  textb: {
    //color: "white",
    fontSize: 28,
    fontWeight:"bold",
    alignSelf:'center',
    marginTop:50,
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
        width: 20,
        height:45,
        alignSelf:'center',
     
      
  },

  
})



