import firebase from 'firebase'

const firebase_config = {
    apiKey: "AIzaSyCZI2x2-W1RfxCY9WfTvQbb0Ek4eBTiaOQ",
    authDomain: "softwaredevtopup.firebaseapp.com",
    databaseURL: "https://softwaredevtopup.firebaseio.com",
    projectId: "softwaredevtopup",
    storageBucket: "softwaredevtopup.appspot.com",
    messagingSenderId: "85694341661"
};

firebase.initializeApp(firebase_config);

export const dbRef = firebase.database().ref();
export const db = firebase.database();
export const fAuth = firebase.auth;
export const facebookAuth = new firebase.auth.FacebookAuthProvider();

