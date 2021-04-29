const express = require("express")
const router = express.Router();
const transactionService = require('./transactionService.js')



class transactionController{
     
     constructor(){

     }

     async  transaction (req,res){
       try{
      const{get,give,total}=req.body
      
        await transactionService.create(get,give,total)
        {
          if(!get || !give || !total){
            res.status(404).send("not found")
          }
        }
        }catch(err){
        throw error;
        }
     }


    

}

module.exports = new transactionController();
