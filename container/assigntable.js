import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity , Image, Text, ImageBackground} from 'react-native';
import { Table, TableWrapper, Row, Cell,Col, Rows,Cols } from 'react-native-table-component';
import firebaseDb from '../firebaseDb';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import assignments from '../component/assignments';
import moment from 'moment'
import Constants from 'expo-constants'
import {Appbar,Title} from 'react-native-paper'
moment().format();

const Stack = createStackNavigator();

function assigntable() {
  return (
   
    <NavigationContainer independent={true}>
      <Stack.Navigator  mode='modal' headerMode='none'>
        <Stack.Screen name = 'assignmenttable' component={myassignment}/>
        <Stack.Screen name = 'assignment' component={assignments}/>
        </Stack.Navigator>
      </NavigationContainer>
    
  )
}


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
   //.orderBy('Deadline','asc')
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
    const interm = [];
    const assignment = [];
    const rowData = [];
    const height = [];
    let date;
    let h = 0;
    let i = 0;
    this.state.modules&&this.state.modules.map( module =>{
      interm.push({data:module.Name+'\n'+module.Module+'\n', date:module.Deadline})
    })

    const sortedinterm = interm.sort(function(a,b) {
      a.date = a.date.split('-').reverse().join('');
      b.date = b.date.split('-').reverse().join('');
      return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      // return a.localeCompare(b);         // <-- alternative 
    });
    sortedinterm &&
    sortedinterm.map( module => {
      date = module.date.substr(6,2)+'-'+module.date.substr(4,2)+'-'+module.date.substr(0,4);
      if(!rowData.includes(date))
        rowData.push(date)
    })

    sortedinterm &&
    sortedinterm.map( module => {
      date = module.date.substr(6,2)+'-'+module.date.substr(4,2)+'-'+module.date.substr(0,4);
      if(rowData[i]==date) {
      h++;
      }
      else{
        height.push(80*h);
        h = 0;
        i++;
        if(rowData[i]==date) {
          h++;
        }
      }
      assignment.push(module.data)
     
    })
    height.push(80*h)
   
  
    return (
      <View style={styles.container}>
         
         <TouchableOpacity style={{ position: "absolute", top: 10, left: 10}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slideinw.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ position: "absolute", top: 5, right: 5}} onPress={() => this.props.navigation.navigate('assignment')}><Image style={styles.image} source={require('../assets/addassignmentlogo.png')}/>
                </TouchableOpacity>
       <Title style={styles.text}>MY ASSIGNMENTS</Title> 
       <View style={styles.container1}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: 'black', borderWidth: 2}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              {<Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 2, borderColor: 'black', alignItems:'flex-start'}}>
                  <TableWrapper style={{flexDirection: 'row'}}>
                    <Col 
                      
                      width={100}
                      data={rowData}
                      heightArr={height}
                      style={styles.row}
                      textStyle={styles.text1}
                    />
                    </TableWrapper>
                    <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                      width={200}
                      data={assignment}
                      heightArr={state.heightArr}
                      style={styles.row1}
                      textStyle={styles.text}
                    /> 
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
  container: { marginTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#ffebcd', },
  container1: { marginTop: Constants.statusBarHeight, flex: 1, backgroundColor: '#ffebcd', justifyContent:'center',alignItems:'center'},

  header: { height: 50, backgroundColor: '#1e90ff' },
  text: { textAlign: 'center', fontWeight: '100' , color:'black'},
  text1: { textAlign: 'center', fontWeight: '100' , color:'black'}, 
  dataWrapper: { marginTop: -1 },
  row: { flex:1, backgroundColor: '#b0e0b6',alignItems:'flex-start' },
  row1: { flex:1, backgroundColor: 'white',alignItems:'flex-start' },
  image: {
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    alignSelf: 'flex-start',
    height: 40,
    width:30,
    marginLeft:15
 
},
text:{
alignSelf:'center',
marginTop: 10,},
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
});

export default assigntable;