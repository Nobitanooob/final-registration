import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  firebase from 'firebase/app';
import 'firebase/storage';


var firebaseConfig = {
  apiKey: "AIzaSyALYDAvg5rfNyLQql1dSnCwMSR0kD_T8o4",
  authDomain: "student-portal-58c52.firebaseapp.com",
  projectId: "student-portal-58c52",
  storageBucket: "student-portal-58c52.appspot.com",
  messagingSenderId: "355117209727",
  appId: "1:355117209727:web:fed10803813449fb68474a"
};

const app = firebase.initializeApp( {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "student-portal-58c52.firebaseapp.com",
  projectId: "student-portal-58c52",
  storageBucket: "student-portal-58c52.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
});

export const Storage = firebase.storage();
export default app;

ReactDOM.render(
    <App />
  ,document.getElementById('root')
); 
