import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyB_DyOdvLUY3PoW1mgRuQ32D5nzzRYXmNI',
  authDomain: 'slack-clone-80d0a.firebaseapp.com',
  projectId: 'slack-clone-80d0a',
  storageBucket: 'slack-clone-80d0a.appspot.com',
  messagingSenderId: '1068485512059',
  appId: '1:1068485512059:web:dacde1b48a5ef6d5b6cbde',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
