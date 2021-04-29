const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({

    createdOn:{
        type:Date,
        default:Date.now,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    street:{
        type:String,
        default:"",
    },
    apartment:{
        type:String,
        default:'',
    },
    zip:{
        type:String,
        default:'',
    },
    cty:{
        type:String,
        default:'',
    },
    country:{
        type:String,
        default:'',
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

    
})





module.exports = mongoose.model('User',userSchema);