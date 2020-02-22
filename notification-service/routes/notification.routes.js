const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const notification_controller = require('../controllers/notification.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/health', notification_controller.health);

module.exports = router;