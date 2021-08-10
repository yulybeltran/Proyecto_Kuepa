import  firebase from 'firebase';
//import { First } from 'react-bootstrap/esm/PageItem';
//import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYgHBKt3t3WRayvG8CiHeLlA_yfZDDrLI",
  authDomain: "crud-firebase-k1.firebaseapp.com",
  databaseURL: "https://crud-firebase-k1-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-k1",
  storageBucket: "crud-firebase-k1.appspot.com",
  messagingSenderId: "459304551314",
  appId: "1:459304551314:web:ea62f4a9b7d2a9952bb74b"
};
  // Initialize Firebase
  var fireDB=firebase.initializeApp(firebaseConfig);

  
  export const db=firebase.database();
  //const egresados=db.child('egresados');
  //const seguimientos=db.child('seguimientos');

  //const db=firebase.database();
  //const egresadosRef=db.child('egresados');
  //egresadosRef.funconOrden().funcionConsulta();
  //egresadosRef.orderByKey().limitToFirst(10);  //consultas basadas e las claves hijo en estring
   

  //const db=firebase.database();
  //const egresadosRef=db.child('egresados')
  //const query=egresados
  //                  .orderByChild('nombre')
  //                  .equalTo('maria')
  //                  .limitToFirst(1)
export default fireDB.database().ref();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};