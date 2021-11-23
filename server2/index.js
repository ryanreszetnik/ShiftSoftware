const express = require('express');
const cors = require('cors');
var app = express();

app.use(express.json());// allows handling of json in body
app.use(express.urlencoded({extended: false}));// allows url encoded data
app.use(cors());

app.use('/api/org',require('./Components/organization'));
// app.use('/api/user',require('./Components/users'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));