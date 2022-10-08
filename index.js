
const initializeApp = require('firebase/app').initializeApp;

const getFirestore = require('firebase/firestore').getFirestore;
const collection = require('firebase/firestore').collection;
const getDocs = require('firebase/firestore').getDocs;
const setDoc = require('firebase/firestore').setDoc;

const doc = require('firebase/firestore').doc;
const onSnapshot = require('firebase/firestore').onSnapshot;

// const query = require('firebase/firestore').query;

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp); // getting access to the actual database that is hosted

const unsubIsecDoc = onSnapshot(doc(db, "buildings", "ISEC"), (doc) => {
  console.log("\n\nListening to changes in the ISEC document under buildings collection");
  console.log("Current data: ", doc.data());
});

const unsuBuildings = onSnapshot(collection(db, "buildings"), (res) => {

  console.log("\n\nListening to changes in the buildings collection");

  res.docChanges().forEach(change => {

    const doc = {...change.doc.data() , id : change.doc.id};
    console.log(doc, change.type);
    // switch(change.type) {
    //     case 'added' : 
    //         // Adding the new data point from the db to the data array for the graph
    //         data.push(doc);
    //         break;

    //     case 'modified' :
    //         // Finding the index of the doc in the data array and replacing that element with the new data from the database
    //         const index = data.findIndex(item => item.id === doc.id);
    //         data[index] = doc;
    //         break;

    //     case 'removed' :
    //         //removing the doc from the list of items in data array
    //         data = data.filter(item => item.id !== doc.id);
    //         break;

    //     default :
    //         break;
    // }

});
});


const express = require('express')
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// buildings, mobilePhones
app.get('/getCollectionData/:collection', async (req, res) => {

  let collection = req.params.collection;

  let data = await getDataFromCollection(db, collection);

  // console.log(data);

  res.status(200).send(data);

  return res;

})

app.post('/post/buildingData', jsonParser, async function (req, res) {

  let {document, fields}  = req.body;

  try{
    await addDataToCollection('buildings',document,fields)
  } catch (err){
    res.status(500).send(err);
  }
  res.status(200).send(`Succesfully added ${document} to buildings collection`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


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




