const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({

    createdOn:{
        type:Date,
        default:Date.now,
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
   user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }
})

module.exports = mongoose.model('Customer',customerSchema);
