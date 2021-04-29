const mongoose = require("mongoose")
const config = require('../config')


// let connectionString = process.env.DATABASE_URL
// console.log(connectionString);
module.exports = {
     async connect() {

        try {
            await mongoose.connect('mongodb://localhost:27017/hisab',(err)=>{
                if(err) {
                    console.log(err);
                }
                console.log("database connected..")

            })

        } catch (error) {
            throw error;
        }
    }
}



