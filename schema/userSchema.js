var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
    user_email: String,
    user_fname: String,
    user_lname: String,
    user_password: String,
    user_image: String
});

module.exports = mongoose.model(('user'), user_schema);