const mongoose = require('mongoose');
const { mongo } = require('mongoose');
const { Schema } = mongoose;


const siteUserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    role:{type:String},
    refreshToken:{type:String},
    
    saved: [{  // Array of saved item IDs
        type: Schema.Types.ObjectId,
        ref: 'video' //  If you are saving Video Ids
    }],

});

module.exports = mongoose.model('siteUser', siteUserSchema);