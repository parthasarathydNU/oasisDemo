const initializeApp = require('firebase/app').initializeApp;
const { getFirestore, collection, getDocs, addDoc } = require('firebase/firestore/lite');

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJwfWnay2-BlzKPk5DHR6oIAScp7ls7UU",
    authDomain: "oasis-firebase-demo.firebaseapp.com",
    projectId: "oasis-firebase-demo",
    storageBucket: "oasis-firebase-demo.appspot.com",
    messagingSenderId: "935035906028",
    appId: "1:935035906028:web:5cc84bc0baff7a9f0902c9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Methods to fetch data from firebase

// Get a list of cities from your database
async function getCitiesFromFirebase() {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}

// Get a list of data from any given collection
async function getDataOfCollectionFromFirebase(collectionName) {
    const collectionRef = collection(db, collectionName);
    const collectionSnapshot = await getDocs(collectionRef);
    const collectionList = collectionSnapshot.docs.map(doc => doc.data());
    return collectionList;
};

// Methods to post data to firebase

async function postDataToCollectionInFirebase(collectionName, data) {

    // get collection reference 
    const collectionRef = collection(db, collectionName);
    // Add a new document with a generated id.
    const docRef = await addDoc(collectionRef, data);
    console.log("Document written with ID: ", docRef.id);

}

module.exports = { getCitiesFromFirebase, getDataOfCollectionFromFirebase, postDataToCollectionInFirebase };