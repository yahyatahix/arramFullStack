var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var relaiRoute = require('./routes/relai');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const relai = require('./models/relai');


mongoose.connect('mongodb://127.0.0.1:27017/arramdb',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

var app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(logger('dev'));

app.use(relaiRoute);

module.exports = app;


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);
});



