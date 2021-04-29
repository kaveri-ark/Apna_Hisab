const transactionDB = require("../../db/schema/transaction");

class transactionService{
    constructor(){

    }
    async transaction(){
      try {
        const transaction = await transactionDB.create({
           get,
           give,
           total
          })
            return transaction;
      } catch (error) {
        throw error;
      }
    }
  
    async getTransaction(){
      try{
        const transactions = await transactionDB.find({
          
        })
        return transactions;
      }catch(error){
        throw error;
      }
    }


  }

  module.exports = new transactionService();