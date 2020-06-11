import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity , Image, Text} from 'react-native';
import { Table, TableWrapper, Row, Cell,Col } from 'react-native-table-component';

export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Time','Monday','Tuesday','Wednesday','Thursday','Friday'],
      widthArr: [40, 80,80,80,80,80],
      heightArr:[80,80,80,80,80,80,80,80,80,80,80,80,80,80]
    }
  }

  render() {
    const state = this.state;
    const tableData = [];
    const rowData = [[800],[900],[1000],[1100],[1200],[1300],[1400],[1500],[1600],[1700],[1800],[1900],[2000],[2100]];
    
        tableData.push(rowData);
  
    
     
    

    return (
      <View style={styles.container}>
         <TouchableOpacity style={{ position: "absolute", top: 5, left: 5}} onPress={()=>this.props.navigation.openDrawer()}><Image style={styles.image} source={require('../assets/slidein.png')}/>
                </TouchableOpacity>
       <Text style={styles.texta}>MY SCHEDULE</Text>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9', alignItems:'flex-start'}}>
              <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                    
                      data={rowData}
                      heightArr={state.heightArr}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  </TableWrapper>
                
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#02b7cc' ,alignItems:"center",justifyContent: "center"},
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { flex:1, backgroundColor: '#E7E6E1',alignItems:'flex-start' },
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