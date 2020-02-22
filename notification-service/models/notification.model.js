const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    property_id: { type: mongoose.Types.ObjectId, required: true },
    check_in_date: { type: Date, required: true },
    check_out_date: { type: Date, required: true }
})

// Export the model
module.exports = mongoose.model('Notification', NotificationSchema);