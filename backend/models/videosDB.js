const mongoose = require('mongoose');
const { mongo } = require('mongoose');
//import mongoose, {mongo} from 'mongoose';
const { Schema } = mongoose;


const videoSchema = new Schema({
    URL: { type: String },
    previewURL: { type: String },
    waterMarkedVideoURL: { type: String },
    hdVideoURL: { type: String },
    name: { type: String },
    tags: { type: [String], index: true }, // Added index for efficient tag search
    themes: { type: [String], index: true }, // Added index for efficient tag search
    shots: { type: [String], index: true }, // Added index for efficient tag search
    shotonmobile:{type:Boolean},
    views: { type: Number },
    filesize: { type: String },
    fileSizeInMB: { type: String },
    fileType: { type: String },
    duration: { type: String },
    videoWidth: { type: String },
    videoHeight: { type: String },
    orientation:{type:String},
});

module.exports = mongoose.model('video', videoSchema);