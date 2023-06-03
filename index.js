// ========== IMPORTING LIBRARIES REQUIRED FOR EXPRESS =======

const express = require('express')
const {getCities, getDataOfCollection} = require('./routeHandlers');


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// end point to get all cities
app.get('/cities', async (req, res) => getCities(req, res));

// end point to get data from any given collection
app.get('/collection/:collectionName', async (req, res) => getDataOfCollection(req, res));


