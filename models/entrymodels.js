const mongoose = require('mongoose');

//entry schema
const entrySchema = new mongoose.Schema({
    GuestID:{
        type:String,
        required:true,
    },
    Date:{
        type:String,
        required:true,
    },
    CheckinTime:{
        type:String,
        required:true,
    },
    CheckoutTime:{
        type:String,
        required:true,
    },
    Transport_type:{
        type:String,
        required:true,
    },
    PlateNum:{
        type:String,
        required:true,
    }    
});

const EntryModel = mongoose.model("Entry", entrySchema)
module.exports = EntryModel