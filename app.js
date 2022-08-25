const express = require("express")
const app = express()
const cors = require('cors')
require("dotenv").config()

// Setup your Middleware and API Router here
const morgan = require('morgan')

app.use(cors())

app.use(morgan('dev'))

app.use(express.json())

app.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
    
    next();
  });

const router = require('./server/api')
app.use('/api', router)

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
  console.log('hi')
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('*', (req, res) => {
  res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested URL'});
});

// error handling middleware
app.use((error, req, res, next) => {
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message});
});



// app.listen(3001,async () => {
//   console.log("Server is listening on 3001")
// } )

module.exports = app;
