import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBmnhUbG-CxMtDv0lenSSQqU_i42axUSmw",
  authDomain: "crwn-db-b0e23.firebaseapp.com",
  databaseURL: "https://crwn-db-b0e23.firebaseio.com",
  projectId: "crwn-db-b0e23",
  storageBucket: "crwn-db-b0e23.appspot.com",
  messagingSenderId: "1077316666575",
  appId: "1:1077316666575:web:da7a620922edd28b8023ba",
  measurementId: "G-QMZ0G1Y2T0"
};

export const createuserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
