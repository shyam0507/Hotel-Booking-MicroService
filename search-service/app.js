const express = require('express');
const bodyParser = require('body-parser');
require('./config/config')
const mongoose = require('./db/elastic-search');
var cors = require('cors')
const property = require('./routes/property.routes'); // Imports routes for the propertys
const startConsumer = require('./controllers/consumer')

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/properties', property);

const PORT = process.env.PORT
app.listen(PORT, () => {
    startConsumer.startConsumer();
    console.log('Server is up and running on port numner ' + PORT);
});