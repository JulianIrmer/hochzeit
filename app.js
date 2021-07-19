const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const {DataSchema} = require('./schema');
const ExcelJS = require('exceljs');
const base64 = require('file-base64');
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || '3000';
const DB_URL = process.env.DB_URL;
const PASSWORD = process.env.PASSWORD;

app.use(bodyParser.json());
app.use(express.static('views'));

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
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/success.html'));
});



app.post('/api/add', (req, res) => {
    console.log(req.body);

    const data = new DataSchema(req.body);
    data.save((err, doc) => {
        res.redirect('/success');
    });
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/admin.html'));
});

app.get('/api/getdata', async (req, res) => {
    if (req.query.pw !== PASSWORD) {
        res.json({success: false});
    }
    const data = await DataSchema.find({});
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Gäste');
  
    worksheet.columns = [
        {header: 'ID', key: 'id', width: 10},
        {header: 'Vorname', key: 'firstName', width: 64},
        {header: 'Nachname', key: 'lastName', width: 64},
        {header: 'Telefon', key: 'phone', width: 100},
        {header: 'Email', key: 'email', width: 120},
        {header: 'Zusage', key: 'attendance', width: 32},
        {header: 'Transport', key: 'transport', width: 32},
        {header: 'Vegan', key: 'vegan', width: 32},
        {header: 'Vegetarisch', key: 'vegetarian', width: 32},
        {header: 'Unverträglichkeiten', key: 'intolerances', width: 32}
    ];
    
    data.forEach((entry, index) => {
        worksheet.addRow({
            id: index, 
            firstName: entry.firstName, 
            lastName: entry.lastName,
            phone: entry.phone,
            email: entry.email,
            attendance: entry.attendance,
            transport: entry.transport,
            vegan: entry.vegan,
            vegetarian: entry.vegetarian,
            intolerances: entry.intolerances
        });
    });
    // await workbook.xlsx.writeFile('test.xlsx');

    workbook.xlsx.writeFile('test.xlsx').then(() => {
        base64.encode(__dirname + '/test.xlsx', (err, base64String) => {
            res.json({success: true, data: base64String});
          });
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }

    console.log(`Server running on port ${PORT}`);
})