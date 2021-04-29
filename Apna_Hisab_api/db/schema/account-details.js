const mongoose = require('mongoose');

const accountDetailsSchema = mongoose.Schema({

    createdOn:{
        type:Date,
        default:Date.now,
    },
    account_name:{
        type:String,
        required:true,
    },
    ifc_code:{
        type:String,
        required:true,
    },
    bank_name:{
        type:String,
        required:true,
    }
})


module.exports = mongoose.model('AccountDetails',accountDetailsSchema);