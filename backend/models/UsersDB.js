const mongoose = require('mongoose');
const { mongo } = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    id: { type: String },
    password: { type: String },
    role:{type:String},
    refreshToken:{type:String}
});

module.exports = mongoose.model('User', userSchema);