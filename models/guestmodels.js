const mongoose = require('mongoose');
const Entry = require('./entrymodels');

const guestSchema = new mongoose.Schema({
    Guest_type:{
        type:String,
        required:true,
    }, 
    EntryDetails: Entry.schema,
});

const GuestModel = mongoose.model("Guests", guestSchema)
module.exports = GuestModel