const mongoose = require('mongoose');

const verifySchema = new mongoose.Schema({
    securityKey: String,
    enrollNumber: String,
    username: String,
    role: String
});

const verifyUser = mongoose.model('verifyUser', verifySchema);

module.exports = verifyUser;