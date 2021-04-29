const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    CreatedOn:{
        type:Date,
        default:Date.now,
    },
    customer_id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'customer',
          },
    get:{
        type:Number,
        
    },
    give:{
        type:Number,
    },
    total:{
        type:Number
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }

},{ collection: 'transaction', timestamps: true }
)

let transaction = mongoose.model('transaction',transactionSchema);
module.exports= transaction