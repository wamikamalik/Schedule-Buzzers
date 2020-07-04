var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

const data = require("./data.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://schedule-buzzers-2.firebaseio.com"
});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
if (data && (typeof data === "object")) {
Object.keys(data).forEach(Name => {
 firestore.collection("foodplaces").doc("locations").collection("University Town,Yale NUS").doc(Name).set(data[Name]).then((res) => {
    console.log("Document " + Name + " successfully written!");
}).catch((error) => {
   console.error("Error writing document: ", error);
});
});
}