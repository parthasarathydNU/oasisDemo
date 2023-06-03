// ========== IMPORTING LIBRARIES REQUIRED FOR EXPRESS =======

const express = require('express')

// import routes
const routes = require('./routes');



const app = express()
// enable body parser
app.use(express.json());

const port = 3000

// use routes
routes.forEach(route => {
  app[route.method](route.url, route.handler);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




