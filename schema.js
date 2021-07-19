const mongoose = require('mongoose');

let DataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    attendance: Boolean,
    transport: Boolean,
    vegan: Boolean,
    vegetarian: Boolean,
    intolerances: String
}, {collection: 'data'});

DataSchema = mongoose.model('Data', DataSchema);
module.exports.DataSchema = DataSchema;