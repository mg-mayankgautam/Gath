const mongoose = require('mongoose');
const { mongo } = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const { Schema } = mongoose;


const videoSchema = new Schema({
    
    URL:{type:String},
    previewURL:{type:String},
    waterMarkedVideoURL:{type:String},
    name:{type:String},
    tags:{type:Array},
    views:{type:Number},

    
});

module.exports = mongoose.model('video', videoSchema);