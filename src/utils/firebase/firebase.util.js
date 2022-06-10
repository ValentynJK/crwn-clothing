import { initializeApp } from 'firebase/app';
import {
  getAuth,// Returns the Auth instance associated with the provided db. 
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore, //retrieve database
  doc, // retrieve document instance from db
  getDoc, // access (get) piece of data from the document 
  setDoc // access (set) piece of data from the document
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIInzL6zl_pW-AQd0a96C0OeykwRxA8_M",
  authDomain: "crwn-clothing-db-a2a3f.firebaseapp.com",
  projectId: "crwn-clothing-db-a2a3f",
  storageBucket: "crwn-clothing-db-a2a3f.appspot.com",
  messagingSenderId: "1062818045305",
  appId: "1:1062818045305:web:414c0b49901657d9af23a8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// establishing firebase db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userAuth);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());


  // block to create user record in user document if there is no such user in db
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      // sets the document with the object in {}
      await setDoc(userDocRef, { displayName, email, createAt });
    }
    catch (error) {
      console.log(`Error creating the user. Error message: ${error.message}`)
    }
  };

  // return in case user exists
  return userDocRef;
};