import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
  getAuth,// Returns the Auth instance associated with the provided db. 
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, // to sign in with email and password
  signOut,
  onAuthStateChanged // Adds an observer for changes to the user's sign-in state. Return a listener
  // sendPasswordResetEmail
} from 'firebase/auth';
import {
  getFirestore, //retrieve database
  doc, // retrieve document instance from db
  getDoc, // access (get) piece of data from the document 
  setDoc, // access (set) piece of data from the document
  collection, // to get the collection reference
  writeBatch, // to verify successful action
  query,
  getDocs,
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// establishing firebase db
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field = 'title') => {
  // get collection reference in db using collection key(name)
  const collectionRef = collection(db, collectionKey);
  // create a batch for next loop operation
  const batch = writeBatch(db);
  // loops through the objectsToAdd and adding objects to a batch
  objectsToAdd.forEach((object) => {
    // creates or search and return document reference in db
    const docRef = doc(collectionRef, object[field].toLowerCase());
    // sets a new doc to batch collection
    batch.set(docRef, object)
  });

  // commit batch to db if there is no problem
  await batch.commit();
  console.log('done');
};


export const getCollectionAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  // generates the query from collection reference 
  const q = query(collectionRef);
  // fetching documents from the collection using query
  const querySnapshot = await getDocs(q);
  // querySnapshot - array of documents
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    // docSnapshot.data() - actual document
    acc[title.toLowerCase()] = items;
    return acc
  }, {})
  return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  // block to create user record in user document if there is no such user in db
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      // sets the document with the object in {}
      await setDoc(userDocRef, { displayName, email, createAt, ...additionalInformation });
    }
    catch (error) {
      console.log(`Error creating the user. Error message: ${error.message}`)
    }
  };

  // return in case user exists
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)