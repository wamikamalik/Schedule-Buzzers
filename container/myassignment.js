import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity , Image, Text, ImageBackground} from 'react-native';
import { Table, TableWrapper, Row, Cell,Col, Rows,Cols } from 'react-native-table-component';
import firebaseDb from '../firebaseDb';


export default class ExampleThree extends Component {

   constructor(props) {
    super(props);
    this.state = {
      modules:null,
      heightArr:[80,80,80,80,80,80,80,80,80,80,80,80,80,80],
      widthArr: [100,200],
     tableHead :  ['Deadline (MM-DD-YYYY)', "Assignment"]
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
     // alert('something found')
    })
     
   //  modules.push(" ")
     this.setState({modules: modules})
   })
 }

 componentDidUpdate(prevProps, prevState) {
  var user = firebaseDb.auth().currentUser;
  if(prevState!=this.state) {
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
   prevState=this.state
  }
 }

  render() {

     const state = this.state;

    const assignment = [];
    const rowData = [];
    const height = [];
    let date;
    let h = 0;
    let i = 0;

    this.state.modules &&
    this.state.modules.map( module => {
      date = (module.Deadline.toDate().getMonth()+1)+'-'+module.Deadline.toDate().getDate()+'-'+module.Deadline.toDate().getFullYear()
      if(!rowData.includes(date))
        rowData.push(date)
    })

    this.state.modules &&
    this.state.modules.map( module => {
      date = (module.Deadline.toDate().getMonth()+1)+'-'+module.Deadline.toDate().getDate()+'-'+module.Deadline.toDate().getFullYear()
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
      assignment.push(module.Name+'\n'+module.Module+'\n')
     
    })
    height.push(80*h)
   
  
    return (
      <View style={styles.container}>
         <ImageBackground style={{flex: 1, resizeMode: "contain" ,   justifyContent: 'center',
   alignItems:"center",}} source={require('../assets/back1.png')}>
         <TouchableOpacity style={{ position: "absolute", top: 5, left: 5}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slidein.png')}/>
                </TouchableOpacity>
       <Text style={styles.texta}>MY ASSIGNMENTS</Text>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9', borderWidth: 2}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              {<Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 2, borderColor: '#C1C0B9', alignItems:'flex-start'}}>
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
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  
  },

  header: { height: 50, backgroundColor: '#ffc0cb' },
  text: { textAlign: 'center', fontWeight: '100' , color:'black'},
  text1: { textAlign: 'center', fontWeight: '100' , color:'black'}, 
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
