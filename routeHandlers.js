const { getCitiesFromFirebase, getDataOfCollectionFromFirebase } = require("./firebase");

// add controller functions here
// export 

// controller function to fetch cities data
async function getCities(req, res) {
    try {
        const cities = await getCitiesFromFirebase();
        res.send(cities);
    } catch (err) {
        res.send("Error in fetching cities " +  err);
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


module.exports = { getCities, getDataOfCollection };