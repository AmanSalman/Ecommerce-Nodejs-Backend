import mongoose from "mongoose";


export const connectDB = async ()=>{
    return mongoose.connect(process.env.mongoUrl).then(()=>{
        console.log("connected to DB")
    }).catch(err =>{
        console.log("error while connecting to DB:" + err)
    })
}