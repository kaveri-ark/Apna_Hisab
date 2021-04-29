const express = require("express");
const  user  = require("../../db/schema/user");
const userController = require('./userController.js');
const router = express.Router();
const jwt = require('../../Auth/auth');



router.get('/register',jwt, userController.register)



module.exports=router;