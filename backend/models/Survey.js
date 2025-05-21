const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
    question : {
        type : String,
        required : true
    },
    options : [String],
    responses : [
        {
        option : String,
        ip : String,
        time : {
            type : Date,
            default : Date.now
        }
        }
    ],
    status : {
        type : String,
        default : 'active' // or 'stopped'
    },
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'admin',
        required : true
    }
},{
    timestamps : true
});

module.exports = mongoose.model('Survey', surveySchema);