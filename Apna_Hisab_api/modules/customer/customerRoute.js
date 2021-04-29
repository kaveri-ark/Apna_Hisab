const express = require("express");
const  customer  = require("../../db/schema/customer");
const customerController = require('./customerController.js');
const router = express.Router();




router.get('/customer',customerController.customer)



module.exports=router;