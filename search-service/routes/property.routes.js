const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const property_controller = require('./../controllers/property.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/health', property_controller.health);

router.post('/', property_controller.getAllAvailableProperties);

module.exports = router;