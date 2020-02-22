const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/health', user_controller.health);

router.post('/register', user_controller.registerUser);
router.post('/login', user_controller.loginUser);
router.get('/info/userId/:userId', user_controller.getUserInformation);
router.get('/info/userEmail/:userEmail', user_controller.getUserInformationByEmail);

module.exports = router;