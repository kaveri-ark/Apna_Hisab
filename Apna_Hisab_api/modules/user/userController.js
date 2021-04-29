const express = require("express")
const router = express.Router();
const userService = require('./userService.js')



class userController{
     
     constructor(){

     }

     async  register (req,res){
       try{
      const{name,email,password,phone,isAdmin,apartment,city,country}=req.body
       
       if(!password || typeof password !=='string'){
        return res.json({status:'error',error:"Invalid password"})
        }
        if(password.length < 5){
        return res.json({status:'error',error:"password is too small"})
        }
        await userService.create(name,email,password,phone,isAdmin,apartment,zip,city,country)
        {
          if(!name || ! email || !password || !phone || !isAdmin || !apartment || !zip || !city || !country){
            res.status(404).send("field required")
          }
        }
        }catch(err){
        throw error;
        }
     }


     async login (req,res){
       try{
      const{email,password}=req.body
      if (user){
        const accessToken = jwt.sign({ _id:this.id }, "asdfghjklqwertyuiopasdfghjnhgbcv");

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
      const users = await userService.findOne({email,password})
      
      const ismatch = bcrypt.compare(password,users.password);
        if(ismatch){
            res.status(201).send("sucess")
        }else{
          res.send("invalid login deatils")
        }
      }catch(error){
        res.status(400).send("invalid deatils")
      }
    
     }

}

module.exports = new userController();
