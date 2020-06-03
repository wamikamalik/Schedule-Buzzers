import React, {Component} from 'react';
import { StyleSheet, Text, View,Button, Picker, Modal, TouchableHighlight, SafeAreaView, TextInput, Image} from 'react-native';
//import {Button} from 'react-native-elements';
import TimePicker from 'react-native-simple-time-picker';
import firebaseDb from '../firebaseDb';
import { TouchableOpacity} from 'react-native-gesture-handler';

 

export default class SwitchExample extends Component {


  state = {
     password:'',
      Day: '',
      Module: '',
      Class: '',
      selectedHoursf: 0,
      selectedMinutesf: 0,
      selectedHourst: 0,
      selectedMinutest: 0,
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

  
  HandleUser = () => {
    const user = firebaseDb.auth().currentUser.uid;
    
    if (user) {
        firebaseDb.firestore()
        .collection('users')
        .doc(user)
        .collection('classes')
        .add(
          {
          
          Day: this.state.Day,
          Module: this.state.Module,
          Class: this.state.Class,
          selectedHoursf: this.state.selectedHoursf,
          selectedMinutesf: this.state.selectedMinutesf,
          selectedHourst: this.state.selectedHourst,
          selectedMinutest: this.state.selectedMinutest

         })
        
        }

  }

  handleAdd = () => {

  alert("Saved to your schedule!");
 this.HandleUser();
 
  }
  
  handleRemove = () => {
    alert("Removed from your schedule! ");
    }



  render() {
    const { Module, selectedHoursf,selectedMinutesf,selectedHourst,selectedMinutest } = this.state;
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
            <TouchableOpacity style={{marginTop: 20, alignSelf:"stretch", alignItems:"stretch"}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slidein.png')}/>
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
                       onValueChange={(value) => {this.setState({Class: value});}}
                  >  
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
            <Button
            style={styles.button1}
            title="Add"
            onPress={this.handleAdd}
          />
           <Button
            style={styles.button2}
            title="Remove"
            onPress={this.handleRemove}
          />
          </SafeAreaView>  
      );  
  }  
}  
const styles = StyleSheet.create ({  
  container: {
    flex: 1,
    backgroundColor: '#fff',
   // justifyContent:"space-between",
    alignItems:"center",
    backgroundColor: '#2ec4b6',
  paddingHorizontal: 100
  },
  image: {
    //justifyContent: 'flex-start',
    //alignItems:'flex-start',
    alignSelf: 'stretch',
    height: 40,
    width:30,
    marginLeft:15
  },
  pickerStyle:{
      left : 50,
      height:50,
      width: "20%",
      color: '#344953',
      //flexDirection: "",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  pickerStyle2:{
      height: 50,
      width: "20%",
      color: '#344953',
      justifyContent: 'center',  },
  textb: {
    color: "white",
    fontSize: 44,
    fontWeight:"bold"
    
  },
  text1: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    alignSelf: "stretch"

  },
  text2: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    alignSelf: "stretch",
    
  },
  text3: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    alignSelf: "stretch"
  },
  text4: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    alignSelf: "stretch"
  },
  text5: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    alignSelf: "stretch"
  },
  textInput: {
    borderRadius:5,
    backgroundColor:'white',
    fontSize: 20,
    //bottom: 80,
    width: "20%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center"
   
  },
  text6: {
    fontSize: 20,
  },
  text7: {
    fontSize: 20,
  },
  button1: {
    marginTop: 42,
    borderRadius:20,
    width:150,
    height:45
  },
  button2: {
    marginTop: 42,
    borderRadius:20,
    width:150,
    height:45
  }
  
})




