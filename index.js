// ========== IMPORTING LIBRARIES REQUIRED FOR CONNECTING TO FIREBASE DB =======

const getFirestore = require('firebase/firestore').getFirestore;
const onSnapshot = require('firebase/firestore').onSnapshot;
const initializeApp = require('firebase/app').initializeApp;
const collection = require('firebase/firestore').collection;
const getDocs = require('firebase/firestore').getDocs;
const setDoc = require('firebase/firestore').setDoc;
const doc = require('firebase/firestore').doc;


// ========== IMPORTING LIBRARIES REQUIRED FOR EXPRESS =======

const express = require('express')
var bodyParser = require('body-parser');


// create application/json parser
var jsonParser = bodyParser.json()

// Your web app's Firebase configuration
const firebaseConfig = {

};

// INITIALIZE FIREBASE APP
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp); // getting access to the actual database that is hosted


// ====== STARTING EXPRESS AP ==========
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// END POINT TO FETCH buildings or mobiles data from the firebase DB

app.get('/getCollectionData/:collection', async (req, res) => {

  let collection = req.params.collection;

  // fetch data from firebase
  let data = await getDataFromCollection(db, collection);

  // console.log(data);

  res.status(200).send(data);

  return res;

})

app.post('/post/buildingData', jsonParser, async function (req, res) {

  let {document, fields}  = req.body;

  try{
    // Post data to firebase db
    await addDataToCollection('buildings',document,fields)

  } catch (err){

    res.status(500).send(err);
  }

  res.status(200).send(`Succesfully added ${document} to buildings collection`);

})

// This is the function that starts the node app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// ==== FUNCTIONS RELATED TO FIREBASE 

// Demonstrating fetching data from firebase

// Get a list of cities from your database
async function getDataFromCollection(db, collectionName) {

  const dbCol = collection(db, collectionName);
  const snapshot = await getDocs(dbCol);
  const list = snapshot.docs.map(doc => doc.data());
  return list;

}

async function addDataToCollection(collectionName, documentName, fields){

  // console.log("collectionName: ", collectionName, "documentName: ",  documentName,"fields: ", fields);
  // Add a new document in collection "cities"
  let result = await setDoc(doc(db, collectionName, documentName), fields);

  return result;


}





// const unsubIsecDoc = onSnapshot(doc(db, "buildings", "ISEC"), (doc) => {
//   console.log("\n\nListening to changes in the ISEC document under buildings collection");
//   console.log("Current data: ", doc.data());
// });

// const unsuBuildings = onSnapshot(collection(db, "buildings"), (res) => {

//   console.log("\n\nListening to changes in the buildings collection");

//   res.docChanges().forEach(change => {

//     const doc = {...change.doc.data() , id : change.doc.id};
//     console.log(doc, change.type);


// });
// });