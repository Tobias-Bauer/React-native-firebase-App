import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyC1AsSlqbtMAFXEOjQamz-35ywlqRW-Vuc",
  authDomain: "react-native-firebase-3.firebaseapp.com",
  databaseURL: "https://react-native-firebase-3.firebaseio.com",
  projectId: "react-native-firebase-3",
  storageBucket: "react-native-firebase-3.appspot.com",
  messagingSenderId: "258088831368"
});
const firestore = require("firebase/firestore");
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

export default firebase;