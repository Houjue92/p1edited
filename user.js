var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    sex: String,
    age: Number,
    passWord: String
});

module.exports = mongoose.model('User',UserSchema);