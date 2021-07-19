const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || '3000';

const DataSchema = new mongoose.Schema({
    firstName: {type: String, required: true, unique: false},
    lastName: {type: String, required: true, unique: false},
    phone: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: false},
    attendance: {type: Boolean, required: true, unique: false},
    transport: {type: Boolean, required: true, unique: false},
    vegan: {type: Boolean, required: true, unique: false},
    vegetarian: {type: Boolean, required: true, unique: false},
    vegetarian: {type: Boolean, required: true, unique: false},
    intolerances: {type: String, required: true, unique: false},
}, {collection: 'passwords'});

// DB conntection
const mongo_options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  
mongoose.connect(DB_URL, mongo_options, (err) => {
    if (err) {return err}
    console.log('###### CONNECTED TO MONGODB ######');
});


app.get('/', (req, res) => {
    res.sendFile();
});

app.post('api/add', (req, res) => {
    console.log(req.body);
    const data = new DataSchema(req.body);
    data.save();
    console.log('Data saved');
    console.log(data);
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }

    console.log(`Server running on port ${PORT}`);
})