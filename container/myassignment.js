import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity , Dimensions, Image, Text, ImageBackground, SectionList} from 'react-native';
// import { Table, TableWrapper, Row, Cell,Col, Rows,Cols } from 'react-native-table-component';
import firebaseDb from '../firebaseDb';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import assignments from '../component/assignments';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import assigntable from'./assigntable'
import Constants from 'expo-constants'
import {Appbar, Title, Subheading} from 'react-native-paper'

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (

    <Tab.Navigator style={styles.container} independent={true} tabBarOptions={{activeTintColor: '#ffffff', labelStyle: { fontSize: 12 }, style: { backgroundColor: '#5e03fc' },}}>
      <Tab.Screen name="Table View" component={assigntable} />
      <Tab.Screen name="List View" component={assignmentnav} />
    </Tab.Navigator>
 

  );
}

const Stack = createStackNavigator();

function assignmentnav() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator  mode='modal' headerMode='none'>
        <Stack.Screen name = 'assignmenttable' component={myassignment}/>
        <Stack.Screen name = 'assignment' component={assignments}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

class myassignment extends Component {

   constructor(props) {
    super(props);
    this.state = {
      modules:null,
      heightArr:[80,80,80,80,80,80,80,80,80,80,80,80,80,80],
      widthArr: [100,200],
     tableHead :  ['Deadline (DD-MM-YYYY)', "Assignment"]
    }
  }

 getDetails = () => {
  var user = firebaseDb.auth().currentUser;
  
   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('assignments')
   .orderBy('Deadline','asc')
   .get()
   .then(snapshot => {
     const modules=[]
    
     snapshot.forEach(doc => {
      
          modules.push(doc.data())
     // alert('something found')
    })
     
   //  modules.push(" ")
     this.setState({modules: modules})
   })
 }


 componentDidMount() {
  this.getDetails();
}

componentDidUpdate(prevProps,prevState) {

 if(prevState.modules!=this.state.modules){
  this.getDetails();
  //prevState = this.state
 }
}

  render() {

     const state = this.state;

    const assignment = [];
    const rowData = [];
    const height = [];
    const list = [];
    let sortedinterm = [];
    let date;
    let h = 0;
    let i = 0;
    const interm = [];
    this.state.modules&&this.state.modules.map( module =>{
      interm.push({data:module.Name+'\n'+module.Module+'\n', date:module.Deadline})
    })
    if(interm.length==1) {
      interm[0].date = interm[0].date.split('-').reverse().join('');
      interm.map(module=>{
        sortedinterm.push(module)
      })
    }
    else {
      sortedinterm = interm.sort(function(a,b) {
      a.date = a.date.split('-').reverse().join('');
      b.date = b.date.split('-').reverse().join('');
      return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      // return a.localeCompare(b);         // <-- alternative 
    });
    }
    sortedinterm &&
    sortedinterm.map( module => {
      date = module.date.substr(6,2)+'-'+module.date.substr(4,2)+'-'+module.date.substr(0,4)
      if(!rowData.includes(date))
        rowData.push(date)
    })

    sortedinterm &&
    sortedinterm.map( module => {
      date = module.date.substr(6,2)+'-'+module.date.substr(4,2)+'-'+module.date.substr(0,4)
      if(rowData[i]==date) {
      h++;
      }
      else{
        height.push(h);
        h = 0;
        i++;
        if(rowData[i]==date) {
          h++;
        }
      }
      assignment.push(module.data)
     
    })
    height.push(h)
    i = 0;
    let j = 0;
    let k = 0;
    let assign = [];

    height&&height.map(h=>{
      while(j<h) {
        assign.push(assignment[k])
        j++;
        k++;
      }
      list.push({title: rowData[i], data: assign})
      assign = [];
      i++;
      j=0;
    })
  
    return (
      <View style={styles.container}>
     <Appbar style={styles.top}>
   <Appbar.Action
     icon={require('../assets/slideinw.png')}
     onPress={() => this.props.navigation.openDrawer()}
    />
     <Appbar.Content title="My Current Assignments" />
     <Appbar.Action
     icon={require('../assets/addassignmentlogo.png')}
     onPress={() => this.props.navigation.navigate('assignment')}
    />
    </Appbar>
        {/* <TouchableOpacity style={{ position: "absolute", top: 10, left: 10}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slideinw.png')}/>
        </TouchableOpacity> */}
        {/* <View style={styles.container1}>
        <TouchableOpacity style={{ position: "absolute", top: 5, right: 5}} onPress={() => this.props.navigation.navigate('assignment')}><Image style={styles.image} source={require('../assets/addassignmentlogo.png')}/>
        </TouchableOpacity>
        <Title style={styles.text}>MY ASSIGNMENTS</Title> */}
        <ScrollView horizontal={true}>
          <View style={{marginLeft:20, marginRight:20,marginTop:10}}>
          <SectionList
          sections={list}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        /> 
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{ marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor:'#ffebcd',
   
  
  },
  container1: { marginTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#ffebcd', justifyContent:'center',alignItems:'center'},
  top: {
    backgroundColor:"#c17eef"
},
  text:{  alignSelf:'center',
  marginTop: 10,},

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
  textDecorationLine:"underline",
  justifyContent: 'center',
  textDecorationLine: "underline"
  
},
item: {

  padding: 20,
  marginVertical: 8,

},
header: {
  fontSize: 32,
  width:Dimensions.get('window').width - 50,
  backgroundColor: "#e2bff7",
  borderRadius: 10
},
title: {
  fontSize: 24
}
});

export default MyTabs;