import React, {Component} from 'react';
import { Platform,KeyboardAvoidingView,StyleSheet,ImageBackground, Image, Text, View,Button, Picker, Modal, TouchableHighlight,TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
//import {Button} from 'react-native-elements';
import TimePicker from 'react-native-simple-time-picker';
import firebaseDb from '../firebaseDb';
//import BlackButton from '../component/BlackButton';


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
    alert("Saved to your schedule!");
    this.HandleUser();
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
     else if ((this.state.selectedMinutesf<this.state.selectedMinutest) && (this.state.selectedHoursf==this.state.selectedHourst)){
     alert("Saved to your schedule!");
     this.HandleUser();
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
      alert("Saved to your schedule!");
      this.HandleUser();
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
        alert("Saved to your schedule!");
        this.HandleUser();
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
         else if ((this.state.selectedMinutesf<this.state.selectedMinutest) && (this.state.selectedHoursf==this.state.selectedHourst)){
         alert("Saved to your schedule!");
         this.HandleUser();
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
            <ImageBackground style={{flex: 1, resizeMode: "cover" ,flexDirection: "column",
    justifyContent: 'center',
   alignItems:"center",
  paddingHorizontal: 100}} source={require('../assets/back1.png')}>
             <TouchableOpacity style={{ position: "absolute", top: 8, left: 8}} onPress={()=>this.props.navigation.goBack()}><Image style={styles.image} source={require('../assets/backicon.png')}/>
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
   
  },
  image: {
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    alignSelf: 'flex-start',
    height: 40,
    width:40,
    marginLeft:15
 
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
    width: 100,
  },

  
})



