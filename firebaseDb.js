import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCM98xENXcZ1s86B7ZMP8pAWWElYiKW7_A",
    authDomain: "schedule-buzzers.firebaseapp.com",
    databaseURL: "https://schedule-buzzers.firebaseio.com",
    projectId: "schedule-buzzers",
    storageBucket: "schedule-buzzers.appspot.com",
    messagingSenderId: "618265955577",
    appId: "1:618265955577:web:0059bafae0d0dcbf726628"
}

firebase.initializeApp(firebaseConfig)

firebase.firestore()

export default firebase
