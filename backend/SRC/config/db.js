
import mongoose from "mongoose";
import DataBaseName from "../constant.js";

const connectDB =async()=>{
    try {
    const connect = await mongoose.connect(`${process.env.MONGO_URL}`) 
    console.log( "data base is connect", connect.connection.host)    
} catch (error) {
      console.log(error.message,"connection error")  
    }
}

export default connectDB
//he