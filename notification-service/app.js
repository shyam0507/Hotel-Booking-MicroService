const express = require('express');
const bodyParser = require('body-parser');
require('./config/config')
const mongoose = require('./db/mongoose');
var cors = require('cors')

const notification = require('./routes/notification.routes');
const startConsumer = require('./controllers/notification_consumer')

mongoose.set('debug', true)

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/notifications', notification);

const PORT = process.env.PORT
app.listen(PORT, () => {
    // setImmediate(() => {
    startConsumer.startConsumer();
    // }, 90000)
    console.log('Server is up and running on port numner ' + PORT);
});