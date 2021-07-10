const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000

//connect to mongodb
mongoose.connect(
    process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("Connected to mongodb")
});

//server start
app.listen(PORT,() => {
    console.log("Run on port ",PORT);
})