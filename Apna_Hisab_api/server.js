const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken')
const mongoDB = require('./db/mongoConnection');
const config = require('./config');






app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.urlencoded({extended:false}));
app.use('/api',require('./modules/user/userRoute'));
app.use('/api/transaction',require('./modules/transaction/transactionRoute'));
app.use('/api/customer',require('./modules/customer/customerRoute'));

mongoDB.connect();


/*app.listen(8080,()=>{
    console.log("server started")
})*/

app.listen(config.get("port").default)

