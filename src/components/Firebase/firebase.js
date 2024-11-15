import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

class Firebase {
    constructor() {
     const app = initializeApp(firebaseConfig);
     this.auth = getAuth(app);
     this.db = getFirestore(app);
     
    }
    //inscription
    signUpUser = (email, password) => createUserWithEmailAndPassword(this.auth, email, password);

    //connexion 
    loginUser = (email, password) => signInWithEmailAndPassword( this.auth, email, password);

    //déconnexion 
    signoutUser = () => signOut(this.auth);

    //Récupération mdp
    passwordReset = email => sendPasswordResetEmail( this.auth, email );

    getUser = (uid) => {
      return doc(this.db, `users/${uid}`);
    };
}

export default Firebase;