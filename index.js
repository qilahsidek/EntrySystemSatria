const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config();
const GuestModel = require('./models/guestmodels');
const {HttpError} = require("./errors/errors");


const PORT = process.env.PORT || 5000

//connect to mongodb
mongoose.connect(
    process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("Connected to mongodb")
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

//post api
app.post('/', async(req, res, next) => {
    try {
        const guest = await GuestModel.create({
            Guest_type: req.body.Guest_type,
            EntryDetails: {
                GuestID: req.body.GuestID,
                Date: req.body.Date,
                CheckinTime: req.body.CheckinTime,
                CheckoutTime: req.body.CheckoutTime,
                Transport_type: req.body.Transport_type,
                PlateNum: req.body.PlateNum
            },
        });
        res.json(guest)
    }   catch (err) {
            next(err)
    }
});

//get api by id
app.get("/:id", async (req, res, next) =>{
    try{
        const result = await GuestModel.findById(req.params.id)
        if (!result){
            return res.status(404).json({
                error:true,
                message: "Guest not found!"
        })
    }
        res.json(result)
    } catch (err){
        next(err)
    }
});

//get
app.get("/", async (req, res, next) =>{
    try{
        const result = await GuestModel.find()
        
        res.json(result)
    } catch (err){
        next(err)
    }
});

//update
app.put("/:id", async(req, res, next) => {
    try{
        const guest = await GuestModel.findOneAndUpdate({_id: req.params.id}, {
            Guest_type: req.body.Guest_type,
            EntryDetails: {
                GuestID: req.body.GuestID,
                Date: req.body.Date,
                CheckinTime: req.body.CheckinTime,
                CheckoutTime: req.body.CheckoutTime,
                Transport_type: req.body.Transport_type,
                PlateNum: req.body.PlateNum
        }}, {
            new: true,
            useFindAndModify: false,
            upsert: true
        })

        res.json(guest)
    } catch(err) {
        next(err)
    }
});

//delete
app.delete("/:id", async (req, res, next) => {
    try{
       const result = await GuestModel.deleteOne({_id: req.params.id})

       res.json({
           error: false,
           deleted_count: result.deletedCount
       })
    } catch(err) {
        next(err)
    }
});

app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({
            error: true,
            message: err.errMessage
        })
    } else {
        res.status(500).json({
            error: true,
            message: "Server error!"
        })
    }
});

//server start
app.listen(PORT,() => {
    console.log("Run on port ",PORT);
})