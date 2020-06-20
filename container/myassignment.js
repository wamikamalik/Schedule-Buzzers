import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity , Image, Text} from 'react-native';
import { Table, TableWrapper, Row, Cell,Col, Rows,Cols } from 'react-native-table-component';
import firebaseDb from '../firebaseDb';


export default class ExampleThree extends Component {

   constructor(props) {
    super(props);
    this.state = {
      modules:null,
      heightArr:[80,80,80,80,80,80,80,80,80,80,80,80,80,80],
      widthArr: [100,200],
     tableHead :  ['Deadline', "Assignment"]
    }
  }

 componentDidMount() {
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
      
    })
     
     modules.push(" ")
     this.setState({modules: modules})
   })
 }
 
  render() {

     const state = this.state;

    const assignment = [];
    const rowData = [];


    this.state.modules &&
    this.state.modules.map( module => (
      assignment.push(module.Name+'\n'+module.Module)
     
    ))
    this.state.modules &&
    this.state.modules.map( module => (
      rowData.push(module.Deadline)
    ))
   
   
  
    return (
      <View style={styles.container}>
         <TouchableOpacity style={{ position: "absolute", top: 5, left: 5}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slidein.png')}/>
                </TouchableOpacity>
       <Text style={styles.texta}>MY ASSIGNMENTS</Text>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9', borderWidth: 2}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              {<Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 2, borderColor: 'black', alignItems:'flex-start'}}>
                  <TableWrapper style={{flexDirection: 'row'}}>
                    <Col 
                      
                      width={40}
                      data={rowData}
                      heightArr={state.heightArr}
                      widthArr={state.widthArr}
                      style={styles.row}
                      textStyle={styles.text1}
                    />
                    </TableWrapper>
                    <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                      width={100}
                      data={assignment}
                      heightArr={state.heightArr}
                      widthArr={state.widthArr}
                      style={styles.row1}
                      textStyle={styles.text}
                    /> 
                  </TableWrapper>
              </Table>}

            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#2ec4b6' ,alignItems:"center",justifyContent: "center"},
  header: { height: 50, backgroundColor: '#ffc0cb' },
  text: { textAlign: 'center', fontWeight: '100' , color:'black'},
  text1: { textAlign: 'center', fontWeight: '100' , color:'black',position:'absolute',top:3}, 
  dataWrapper: { marginTop: -1 },
  row: { flex:1, backgroundColor: '#f5deb3',alignItems:'flex-start' },
  row1: { flex:1, backgroundColor: '#7fffd4',alignItems:'flex-start' },
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
});