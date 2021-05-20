import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  firebase from 'firebase/app';
import 'firebase/storage';


var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "student-registration-c6d31.firebaseapp.com",
  projectId: "student-registration-c6d31",
  storageBucket: "student-registration-c6d31.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};
  // Initialize Firebase  
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <App />
  ,document.getElementById('root')
); 
