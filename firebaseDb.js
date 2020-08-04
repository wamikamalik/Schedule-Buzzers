import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    // apiKey: "AIzaSyCM98xENXcZ1s86B7ZMP8pAWWElYiKW7_A",
    // authDomain: "schedule-buzzers.firebaseapp.com",
    // databaseURL: "https://schedule-buzzers.firebaseio.com",
    // projectId: "schedule-buzzers",
    // storageBucket: "schedule-buzzers.appspot.com",
    // messagingSenderId: "618265955577",
    // appId: "1:618265955577:web:0059bafae0d0dcbf726628"
    apiKey: "AIzaSyDgeMZdd9Sb6mQ5sl5LISZcKzSeVNQ0wHI",
    authDomain: "schedule-buzzers-2.firebaseapp.com",
    databaseURL: "https://schedule-buzzers-2.firebaseio.com",
    projectId: "schedule-buzzers-2",
    storageBucket: "schedule-buzzers-2.appspot.com",
    messagingSenderId: "458566252197",
    appId: "1:458566252197:web:b63796a11743ece7e73f4c"
}

firebase.initializeApp(firebaseConfig)
var storage = firebase.storage();

firebase.firestore()
firebase.firestore().settings({ experimentalForceLongPolling: true });
export default firebase
