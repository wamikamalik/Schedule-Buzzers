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
      heightArr1:[],
      heightArr2:[],
      heightArr3:[],
      heightArr4:[],
      heightArr5:[],
      //num:null
    }
  }

 componentDidMount() {
  var user = firebaseDb.auth().currentUser;
  var days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
  let i = 8
  let j=8
  let k= 8
  let l=8
  let m=8
  //let j = 0
  //const num = []
  //let j=0;
  
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
     let hm = 0,h=0;
     const height = [];
     snapshot.forEach(doc => {
      {  //j++; 
        hm = 0;
        if(parseInt(doc.data().selectedHoursf)==i) {
          modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
          i=i+1;
          hm++;
          while(i<parseInt(doc.data().selectedHourst)) {
            //modules.push(" ")
            hm ++;
            i=i+1;
          }
          height.push(80*hm);
          h=h+hm;
        }
        else {
          modules.push(" ");
          while(i!=parseInt(doc.data().selectedHoursf) && i<21) {
          //modules.push(" ")
          hm++;
          i=i+1;
          //alert(doc.data().selectedHoursf+','+String(i))
        }
        height.push(80*hm);
        h=h+hm;
        hm = 0;
        if(parseInt(doc.data().selectedHoursf)==i) {
          modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
          i=i+1;
          hm++;
          while(i<parseInt(doc.data().selectedHourst)) {
            //modules.push(" ")
            hm++;
            i=i+1;
          }
        }
        height.push(80*hm);
        h=h+hm;
      }
      }
      //  const data= doc.data()
      //  modules.push(data)
      //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
     })
     //num.push(j)
     //alert(modules)
     height.push(80*(14-h));
     modules.push(" ")
     this.setState({modules: modules, heightArr1:height})
   })

   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('classes')
   .doc('Days')
   .collection('Tuesday')
   .orderBy('selectedHourst','asc')
   .get()
   .then(snapshot => {
     const modules1=[]
     let hm = 0,h=0;
     const height = [];
     snapshot.forEach(doc => {
      {  //j++;
        hm = 0;
        if(parseInt(doc.data().selectedHoursf)==j) {
          modules1.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
          j=j+1;
          hm++;
          while(j<parseInt(doc.data().selectedHourst)) {
            //modules1.push(" ")
            j=j+1;
            hm++;
          }
          height.push(80*hm);
          h=h+hm;
        }
        else {
          modules1.push(" ")
          while(j!=parseInt(doc.data().selectedHoursf) && j<21) {
          //modules1.push(" ")
          j=j+1;
          hm++;
          //alert(doc.data().selectedHoursf+','+String(i))
        }
        height.push(80*hm);
        h=h+hm;
        hm = 0;
        if(parseInt(doc.data().selectedHoursf)==j) {
          modules1.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
          j=j+1;
          hm++;
          while(j<parseInt(doc.data().selectedHourst)) {
            //modules1.push(" ")
            j=j+1;
            hm++;
          }
        }
        height.push(80*hm);
        h=h+hm;
      }
      }
      //  const data= doc.data()
      //  modules.push(data)
      //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
     })
     //num.push(j)
     //alert(modules)
     height.push(80*(14-h));
     modules1.push(" ")
     this.setState({modules1: modules1, heightArr2:height})
   })
   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('classes')
   .doc('Days')
   .collection('Wednesday')
   .orderBy('selectedHourst','asc')
   .get()
   .then(snapshot => {
    const modules2=[]
    let hm = 0,h=0;
    const height = [];
    snapshot.forEach(doc => {
     {  //j++;
      hm = 0;
       if(parseInt(doc.data().selectedHoursf)==k) {
         modules2.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         k=k+1;
         hm++;
         while(k<parseInt(doc.data().selectedHourst)) {
           //modules1.push(" ")
           k=k+1;
           hm++;
         }
         height.push(80*hm);
         h=h+hm;
       }
       else {
         modules2.push(" ")
         while(k!=parseInt(doc.data().selectedHoursf) && k<21) {
         //modules1.push(" ")
         k=k+1;
         hm++;
         //alert(doc.data().selectedHoursf+','+String(i))
       }
       height.push(80*hm);
       h=h+hm;
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==k) {
         modules2.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         k=k+1;
         hm++;
         while(k<parseInt(doc.data().selectedHourst)) {
           //modules2.push(" ")
           k=k+1;
           hm++;
         }
       }
       height.push(80*hm);
       h=h+hm;
     }
     }
     //  const data= doc.data()
     //  modules.push(data)
     //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
    })
    //num.push(j)
    //alert(modules)
    height.push(80*(14-h));
    modules2.push(" ")
    this.setState({modules2: modules2, heightArr3:height})
  })

   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('classes')
   .doc('Days')
   .collection('Thursday')
   .orderBy('selectedHourst','asc')
   .get()
   .then(snapshot => {
    const modules3=[]
    let hm = 0,h=0;
    const height = [];
    snapshot.forEach(doc => {
     {  //j++;
      hm=0;
       if(parseInt(doc.data().selectedHoursf)==l) {
         modules3.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         l=l+1;
         hm++;
         while(l<parseInt(doc.data().selectedHourst)) {
           //modules1.push(" ")
           l=l+1;
           hm++;
         }
         height.push(80*hm);
         h=h+hm;
       }
       else {
         modules3.push(" ")
         while(l!=parseInt(doc.data().selectedHoursf) && l<21) {
         //modules1.push(" ")
         l=l+1;
         hm++;
         //alert(doc.data().selectedHoursf+','+String(i))
       }
       height.push(80*hm);
       h=h+hm;
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==l) {
         modules3.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         l=l+1;
         hm++;
         while(l<parseInt(doc.data().selectedHourst)) {
           //modules3.push(" ")
           l=l+1;
           hm++;
         }
       }
       height.push(80*hm);
       h=h+hm;
     }
     }
     //  const data= doc.data()
     //  modules.push(data)
     //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
    })
    //num.push(j)
    //alert(modules)
    height.push(80*(14-h));
    modules3.push(" ")
    this.setState({modules3: modules3, heightArr4:height})
  })

   firebaseDb.firestore()
   .collection('users')
   .doc(user.uid)
   .collection('classes')
   .doc('Days')
   .collection('Friday')
   .orderBy('selectedHourst','asc')
   .get()
   .then(snapshot => {
    const modules4=[]
    let hm = 0,h=0;
    const height = [];
    snapshot.forEach(doc => {
     {  //j++;
      hm=0;
       if(parseInt(doc.data().selectedHoursf)==m) {
         modules4.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         m=m+1;
         hm++;
         while(m<parseInt(doc.data().selectedHourst)) {
           //modules1.push(" ")
           m=m+1;
           hm++;
         }
         height.push(80*hm);
         h=h+hm;
       }
       else {
         modules4.push(" ")
         while(m!=parseInt(doc.data().selectedHoursf) && m<21) {
         //modules1.push(" ")
         m=m+1;
         hm++;
         //alert(doc.data().selectedHoursf+','+String(i))
       }
       height.push(80*hm);
       h=h+hm;
       hm = 0;
       if(parseInt(doc.data().selectedHoursf)==m) {
         modules4.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
         m=m+1;
         hm++;
         while(m<parseInt(doc.data().selectedHourst)) {
           //modules4.push(" ")
           m=m+1;
           hm++;
         }
       }
       height.push(80*hm);
       h=h+hm;
     }
     }
     //  const data= doc.data()
     //  modules.push(data)
     //modules.push(doc.data().Module+'\n'+doc.data().Class+'\n'+doc.data().Location)
    })
    //num.push(j)
    //alert(modules)
    height.push(80*(14-h));
    modules4.push(" ")
    this.setState({modules4: modules4, heightArr5:height})
  })
 }
 
  render() {

     const state = this.state;
     let i = 8;
    const monday = [];
    const tuesday = [];
    const wednesday = [];
    const thursday = [];
    const friday = [];
    const numb = [];
    const HeightMon = [];
    const HeightTue = [];
    const HeightWed = [];
    const HeightThu = [];
    const HeightFri = [];

    this.state.modules &&
    this.state.modules.map( module => (
      monday.push(module)
    ))
    this.state.heightArr1 &&
    this.state.heightArr1.map(h => (
      HeightMon.push(h)
    ))
    this.state.modules1 &&
    this.state.modules1.map( module => (
      tuesday.push(module)
    ))
    this.state.heightArr2 &&
    this.state.heightArr2.map(h => (
      HeightTue.push(h)
    ))
    this.state.modules2 &&
    this.state.modules2.map( module => (
      wednesday.push(module)
    ))
    this.state.heightArr3 &&
    this.state.heightArr3.map(h => (
      HeightWed.push(h)
    ))
    this.state.modules3 &&
    this.state.modules3.map( module => (
      thursday.push(module)
    ))
    this.state.heightArr4 &&
    this.state.heightArr4.map(h => (
      HeightThu.push(h)
    ))
    this.state.modules4 &&
    this.state.modules4.map( module => (
      friday.push(module)
    ))
    this.state.heightArr5 &&
    this.state.heightArr5.map(h => (
      HeightFri.push(h)
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
              {<Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 2, borderColor: 'black', alignItems:'flex-start'}}>
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
                      heightArr={HeightMon}
                      style={styles.row1}
                      textStyle={styles.text1}
                    /> 
                  </TableWrapper>
                  <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                      width={100}
                      data={tuesday}
                      heightArr={HeightTue}
                      style={styles.row2}
                      textStyle={styles.text1}
                    /> 
                  </TableWrapper>
                  <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                      width={100}
                      data={wednesday}
                      heightArr={HeightWed}
                      style={styles.row3}
                      textStyle={styles.text1}
                    /> 
                  </TableWrapper>
                  <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                      width={100}
                      data={thursday}
                      heightArr={HeightThu}
                      style={styles.row4}
                      textStyle={styles.text1}
                    /> 
                  </TableWrapper>
                  <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                      width={100}
                      data={friday}
                      heightArr={HeightFri}
                      style={styles.row5}
                      textStyle={styles.text1}
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
  text: { textAlign: 'center', fontWeight: '100' , color:'black', position:'absolute',top:5}, 
  text1: { textAlign: 'center', fontWeight: '100' , color:'black'}, 
  dataWrapper: { marginTop: -1 },
  row: { flex:1, backgroundColor: '#f5deb3',alignSelf:'flex-start'},
  row1: { flex:1, backgroundColor: '#7fffd4',alignItems:'flex-start' },
  row2: { flex:1, backgroundColor: '#ff7f50',alignItems:'flex-start' },
  row3: { flex:1, backgroundColor: '#e9967a',alignItems:'flex-start' },
  row4: { flex:1, backgroundColor: '#fffacd',alignItems:'flex-start' },
  row5: { flex:1, backgroundColor: '#dda0dd',alignItems:'flex-start' },
 
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
