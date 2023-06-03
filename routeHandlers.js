const { getCitiesFromFirebase, getDataOfCollectionFromFirebase } = require("./firebase");

// add controller functions here
// export 

// controller function to fetch cities data
async function getCities() {
    const cities = await getCitiesFromFirebase();
    return cities;
}

// controller function to fetch data from any given collection
async function getDataOfCollection(collectionName) {
    const data = await getDataOfCollectionFromFirebase(collectionName);
    return data;
}


module.exports = { getCities, getDataOfCollection };