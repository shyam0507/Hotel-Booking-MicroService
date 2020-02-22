const Notification = require('../models/notification.model');
const mongoose = require('mongoose');
const kafka = require('../db/kafka')
//Simple version, without validation or sanitation
exports.health = function (req, res) {
    res.send('Up and running!');
};

exports.saveNotification = async (user_id, message, notification_type) => {

    await Notification.create({ user_id, message, notification_type })

}