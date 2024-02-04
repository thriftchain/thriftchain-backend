const mongoose = require('mongoose');
const dotenv = require('dotenv');

const dbconnect = ()=>{
   try {
       const conn = mongoose.connect(process.env.MONGO_URI)
       console.log("Database connected Successfully")
   } catch (error) {
    console.log("Database not connectd")
   } 
}
module.exports = dbconnect