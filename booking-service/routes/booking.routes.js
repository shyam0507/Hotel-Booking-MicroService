const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const booking_controller = require('../controllers/booking.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/health', booking_controller.health);

router.post('/', booking_controller.bookHotel);


module.exports = router;