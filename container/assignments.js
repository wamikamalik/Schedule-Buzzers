import React from 'react'
import { KeyboardAvoidingView, ScrollView, ImageBackground, Image, TextInput, Text, Button, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import GreenButton from '../component/GreenButton';
 import firebaseDb from '../firebaseDb';

 moment().format()

 class assignments extends React.Component {
     state = {
         mod: null,
         name: null,
         deadline: null,
         valid: false,
         done: false,
         notes: null
     }

     date = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return (
            date + '-' + month + '-' + year
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
                            Notes: this.state.notes
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
                                    alert("Assignment Added!!")
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
            if (user) {
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
                        .delete()
                        .then(() => {
                            alert("Assignment Removed!!")
                        })
                        .catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                    }
                })
            
        }   
     }

     HandleSearch = () => {
        const user = firebaseDb.auth().currentUser.uid;
            if (user) {
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
                 <ScrollView>
                <ImageBackground style={{flex: 1, resizeMode: "contain"}} source={require('../assets/back1.png')}>
                <TouchableOpacity style={{marginTop: 20}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slideinw.png')}/>
                </TouchableOpacity>
                <Text style={styles.text}>Add Assignments</Text>
                <Text style={styles.texta}>Input only Name to remove an Assignment. To update input name and press on search.</Text>
                <Text style={styles.texta}>Module</Text><TextInput style={styles.textInput} placeholder='Module Name' placeholderTextColor="black" onChangeText={this.handleUpdateMod} value={this.state.mod}></TextInput>
                <Text style={styles.texta}>Name</Text><TextInput style={styles.textInput} placeholder='Assignment name' placeholderTextColor="black" onChangeText={this.handleUpdatename} value={this.state.name}></TextInput>
                <GreenButton style={styles.button} onPress= {this.HandleSearch}>Search</GreenButton>
                <Text style={styles.texta}>Deadline</Text>
                    <DatePicker
                    style={{width: 200, marginTop: 10, alignSelf:'center'}}
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
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginTop: 10
                        },
                        dateInput: {
                        marginLeft: 36,
                        color: "black"
                        },
                    }}
                    onDateChange={this.handleUpdatedeadline}/> 
                    <Text style={styles.texta}>If calender is inaccessible, Please enter date below</Text><TextInput style={styles.textInput} placeholder="DD-MM-YYYY" placeholderTextColor="black" onChangeText={this.handleUpdatedeadline} value={this.state.deadline}></TextInput>
                    <Text style={styles.texta}>Notes</Text><TextInput style={styles.textInputa} placeholder='Additional notes' placeholderTextColor="black" onChangeText={this.handleUpdatenotes} value={this.state.notes} multiline></TextInput>

                <GreenButton style={styles.button} onPress= {this.UpdateUser}>Add/Update</GreenButton>
                {/* <GreenButton style={styles.button} onPress= {this.HandleUpdate}>Update</GreenButton> */}
                <GreenButton style={styles.button} onPress= {this.HandleRemove}>Remove</GreenButton>
                </ImageBackground>
                </ScrollView>
             </KeyboardAvoidingView>
         )
     }
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: 'transparent',
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
        fontSize: 28,
        alignSelf:'center',
        marginTop: 10,
        textDecorationLine: "underline",
        //color: "white"
    },
    textInput: {
        //borderRadius:5,
        //backgroundColor:'white',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 5,
        width: 400,
        height: 50,
        fontWeight: "bold",
        alignSelf:'center',
        alignItems: 'center',
        //color: 'white'
      },
      textInputa: {
        //borderRadius:5,
        //backgroundColor:'white',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 5,
        width: 400,
        height: 100,
        fontWeight: "bold",
        alignSelf:'center',
        //alignItems: 'center',
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
