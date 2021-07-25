const mongoose = require('mongoose');

let DataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String,
    attendance: Boolean,
    food: String,
    intolerances: String,
    music: String,
    other: String
}, {collection: 'data'});

DataSchema = mongoose.model('Data', DataSchema);
module.exports.DataSchema = DataSchema;