const customerDB = require("../../db/schema/customer");

class customerService{
    constructor(){

    }
    async customer(){
      try {
        const customer = await cutsomerDB.create({
           name,
           addresses,
          })
            return customer;
      } catch (error) {
        throw error;
      }
    }
  
    async getCustomer(){
      try{
        const customers = await customerDB.find({
          
        })
        return customers;
      }catch(error){
        throw error;
      }
    }


  }

  module.exports = new customerService();