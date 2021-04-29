const userDB = require("../../db/schema/user");

class userService{
    constructor(){

    }
    async register(){
      try {
        const user = await userDB.create({
            name,
            email,
            password,
            phone,
            isAdmin,
            apartment,
            zip,
            city,
            country
          })
            return user;
      } catch (error) {
        throw error;
      }
    }
  
    async login(){
      try{
        const Login = await userDB.find({
          email,
          password,
        })
        return Login;
      }catch(error){
        throw error;
      }
    }


  }

  module.exports = new userService();