import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity , Image, Text} from 'react-native';
import { Table, TableWrapper, Row, Cell,Col, Rows,Cols } from 'react-native-table-component';
import firebaseDb from '../firebaseDb';


export default class ExampleThree extends Component {

   constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Time','Monday','Tuesday','Wednesday','Thursday','Friday'],
      widthArr: [40, 100,100,100,100,100],
      heightArr:[80,80,80,80,80,80,80,80,80,80,80,80,80,80],
      modules:null,
      //num:null
    }
  }

 componentDidMount() {
  var user = firebaseDb.auth().currentUser;
  let i = 8
  //let j = 0
  //const num = []
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
     snapshot.forEach(doc => {
      {  //j++;
        if(parseInt(doc.data().selectedHoursf)==i) {
          modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
          i=i+1;
          while(i<parseInt(doc.data().selectedHourst)) {
            modules.push(" ")
            i=i+1;
          }
        }
        else {
          while(i!=parseInt(doc.data().selectedHoursf) && i<21) {
          modules.push(" ")
          i=i+1;
          //alert(doc.data().selectedHoursf+','+String(i))
        }
        if(parseInt(doc.data().selectedHoursf)==i) {
          modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
          i=i+1;
          while(i<parseInt(doc.data().selectedHourst)) {
            modules.push(" ")
            i=i+1;
          }
        }
      }
      }
      //  const data= doc.data()
      //  modules.push(data)
      //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
     })
     //num.push(j)
     //alert(modules)
     this.setState({modules: modules})
   })
      
 }

  render() {

     const state = this.state;
     let i = 8;
    const monday = [];
    const numb = [];
    this.state.modules &&
    this.state.modules.map( module => (
      monday.push(module)
    ))
    // this.state.num &&
    // this.state.num.map( num => (
    //   numb.push(num)
    // ))
    
   const rowData = [[800],[900],[1000],[1100],[1200],[1300],[1400],[1500],[1600],[1700],[1800],[1900],[2000],[2100]];
  
    return (
      <View style={styles.container}>
         <TouchableOpacity style={{ position: "absolute", top: 5, left: 5}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slidein.png')}/>
                </TouchableOpacity>
       <Text style={styles.texta}>MY SCHEDULE</Text>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9', borderWidth: 2}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              {<Table style={{flexDirection: 'row'}} borderStyle={{borderColor: '#C1C0B9', alignItems:'flex-start',borderWidth: 2}}>
                  <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                      
                      width={40}
                      data={rowData}
                      heightArr={state.heightArr}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                    </TableWrapper>
                    <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                      width={100}
                      data={monday}
                      heightArr={state.heightArr}
                      style={styles.row}
                      textStyle={styles.text}
                    /> 
                  {/* <Rows data={rowData} widthArr={state.widthArr} style={styles.row} textStyle={styles.text} heightArr={state.heightArr}/> */}
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
  text: { textAlign: 'center', fontWeight: '100' }, 
  dataWrapper: { marginTop: -1 },
  row: { flex:1, backgroundColor: '#f5f5dc',alignItems:'flex-start' },
  image: {
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    alignSelf: 'flex-start',
    height: 40,
    width:30,
    marginLeft:15
 
},
texta: {
  //color: "white",
  fontSize: 28,
  fontWeight:"bold",
  alignSelf:'center',
  marginTop:30,
  textDecorationLine:"underline",
  justifyContent: 'center',
  textDecorationLine: "underline"
  
},
});