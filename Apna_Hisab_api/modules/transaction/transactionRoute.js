const express = require("express");
const transactionController = require('./trasactionController');
const router = express.Router();




router.get('/transaction',transactionController.transaction)



module.exports=router;