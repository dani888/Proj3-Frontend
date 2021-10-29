
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBLkwR-o-azRluUxmJ1WTR0KyseEHecJmI",
    authDomain: "react-crm-4633a.firebaseapp.com",
    projectId: "react-crm-4633a",
    storageBucket: "react-crm-4633a.appspot.com",
    messagingSenderId: "28883997109",
    appId: "1:28883997109:web:dd367a7094b9c9fabc89fc"
  };

  firebase.initializeApp(firebaseConfig);

  // set up auth

  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  });

  function signIn(){
    return auth.signInWithPopup(provider)
  }

  function logOut(){
    return auth.signOut();
  }

// named export 
  export {
    auth,
    signIn,
    logOut
  }