const express = require('express');
const bodyParser = require('body-parser');
require('./config/config')
const mongoose = require('./db/mongoose');
var cors = require('cors')

const booking = require('./routes/booking.routes');

mongoose.set('debug', true)

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/bookings', booking);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is up and running on port numner ' + PORT);
});