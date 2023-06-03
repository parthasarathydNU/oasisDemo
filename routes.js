const { getCities, getDataOfCollection, postDataToCollection, deleteDataFromCollection } = require('./controllers');

const routes = [
    {
        url: '/',
        method: 'get',
        handler: (req, res) => { res.send('Hello World!') },
    },
    {
        url: '/cities',
        method: 'get',
        handler: (req, res) => getCities(req, res),
    },
    {
        url: '/collection/:collectionName',
        method: 'get',
        handler: (req, res) => getDataOfCollection(req, res),
    },
    {
        url: '/collection/:collectionName',
        method: 'post',
        handler: (req, res) => postDataToCollection(req, res),
    },
    // route to delete a given document from a collection
    {
        url: '/collection/:collectionName/:docId',
        method: 'delete',
        handler: (req, res) => deleteDataFromCollection(req, res),
    }

];


module.exports = routes;