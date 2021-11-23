const express = require('express');
const cors = require('cors');
var app = express();

app.use(express.json());// allows handling of json in body
app.use(express.urlencoded({extended: false}));// allows url encoded data
app.use(cors());

app.use('/api/users',require('./Components/Users/users'));
app.use('/api/organization',require('./Components/Organization/organization'));



const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));