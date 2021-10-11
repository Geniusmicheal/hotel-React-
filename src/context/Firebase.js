import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const initializeApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FB_API,
    authDomain: process.env.REACT_APP_FB_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT,
    storageBucket: process.env.REACT_APP_FB_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_SENDER,
    appId: process.env.REACT_APP_FB_APP,
    measurementId: process.env.REACT_APP_FB_MEASUREMENT,
})
const authApp = initializeApp.auth();
const db = initializeApp.firestore();
// const storage = initializeApp.storage();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
export {authApp,db,timeStamp };
// export default db
// data.timestamp = firebase.firestore.FieldValue.serverTimestamp(),