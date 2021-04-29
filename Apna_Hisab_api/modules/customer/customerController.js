const express = require("express")
const router = express.Router();
const customerService = require('./customerService.js')



class customerController{
     
     constructor(){

     }

     async  customer (req,res){
       try{
      const{get,give,total}=req.body
      
        await customerService.create(get,give,total)
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

module.exports = new customerController();
