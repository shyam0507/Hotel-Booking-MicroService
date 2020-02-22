const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    mobile: { type: String, unique: true, required: false },
    password: { type: String, required: false }
})

// Export the model
module.exports = mongoose.model('User', UserSchema);