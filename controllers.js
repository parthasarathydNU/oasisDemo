const { getCitiesFromFirebase, getDataOfCollectionFromFirebase, postDataToCollectionInFirebase } = require("./firebase");

// add controller functions here
// export 

// controller function to fetch cities data
async function getCities(req, res) {
    try {
        const cities = await getCitiesFromFirebase();
        res.send(cities);
    } catch (err) {
        res.send("Error in fetching cities " + err);
    }
}

// controller function to fetch data from any given collection
async function getDataOfCollection(req, res) {
    try {
        const collectionName = req.params.collectionName;
        const data = await getDataOfCollectionFromFirebase(collectionName);
        res.send(data);
    }
    catch (err) {
        res.send("Error in fetching data from collection " + err);
    }
}

// controller function to post data to any given collection
async function postDataToCollection(req, res) {

    try {
        const collectionName = req.params.collectionName;
        const data = req.body; // enable body parser in index.js
        await postDataToCollectionInFirebase(collectionName, data);
        res.send("Data posted successfully");
    } catch (err) {
        res.send("Error in posting data to collection " + err);
    }
}


module.exports = { getCities, getDataOfCollection, postDataToCollection };