const mongoose = require('mongoose');
const { mongo } = require('mongoose');
const { Schema } = mongoose;


const internalUserSchema = new Schema({
    id: { type: String },
    password: { type: String },
    role:{type:String},
    refreshToken:{type:String}
});

module.exports = mongoose.model('InternalUser', internalUserSchema);