const mongoose = require("mongoose");
const {connectionString} = require('../config/index')




const dbConnection = async ()=>{
   try{
    const conn = await mongoose.connect(connectionString);
    console.log(`db connection is succesful coneected with host: ${conn.connection.host}`)
   }catch(err){
    console.log(`error:${err}`) 
   }
}

module.exports = dbConnection; 