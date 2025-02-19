const mongoose = require('mongoose');
const { mongo } = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const { Schema } = mongoose;


const videoSchema = new Schema({
    
    name:{type:String},
    tags:{type:Array}
    //
});

module.exports = mongoose.model('loveletter', videoSchema);