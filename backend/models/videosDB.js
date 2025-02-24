const mongoose = require('mongoose');
const { mongo } = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const { Schema } = mongoose;


const videoSchema = new Schema({
    
    URL:{type:String},
    tags:{type:Array}
    //
});

module.exports = mongoose.model('video', videoSchema);