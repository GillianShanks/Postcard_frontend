import firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAAvxSvYn2rqG577_wTfevqnAf8nHG__iA",
    authDomain: "postcard-10.firebaseapp.com",
    databaseURL: "https://postcard-10.firebaseio.com",
    projectId: "postcard-10",
    storageBucket: "postcard-10.appspot.com",
    messagingSenderId: "1076724229203",
    appId: "1:1076724229203:web:a55225d3a5b43da19292a6",
    measurementId: "G-5DMYZFPXNF"
};


firebase.initializeApp(firebaseConfig)

export const f = firebase;
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
