const initializeApp = require('firebase/app').initializeApp;
const { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query } = require('firebase/firestore');
const { onSnapshot } = require('firebase/firestore');

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
    // get doc id along with data as well
    const collectionList = collectionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

// Method to delete a document from a given collection
async function deleteDataFromCollectionInFirebase(collectionName, docId) {
        // get collection reference 
        const collectionRef = collection(db, collectionName);
        // delete a document with a given id.
        await deleteDoc(doc(collectionRef, docId));
        console.log("Document deleted with ID: ", docId);
}

// subscribe to changes in a collection
const collections = ['buildings', 'cities', 'mobilePhones'];

let subscriptions = [];

collections.forEach(collectionName => {
    const collectionRef = collection(db, collectionName);
    const queryRef = query(collectionRef);

    const unsubscribeFn = onSnapshot(queryRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const docId = change.doc.id;
            const docData = change.doc.data();
            const changeType = change.type;

            console.log();
            console.log(`Change Type: ${changeType}`);
            console.log(`Document ID: ${docId}`);
            console.log('Document Data:', docData);
            console.log();
        });
    });

    subscriptions.push({ "name" : collectionName, "unsubscribe" : unsubscribeFn});
});

module.exports = { getCitiesFromFirebase, getDataOfCollectionFromFirebase, postDataToCollectionInFirebase, deleteDataFromCollectionInFirebase };