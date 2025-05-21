const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String
},{
    timestamps : true
});

module.exports = mongoose.model('admin', adminSchema);