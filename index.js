import express from 'express'
import 'dotenv/config'
import { connectDB } from './DB/connection.js';
import { Appinit } from './src/Appinit.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = ["http://localhost:5173", "https://dashboardgraduation.onrender.com"];
 
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
  },
  methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, // Set to true if you're passing cookies or authorization headers
  preflightContinue: false
  
}));
 Appinit(app,express);

 connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})
 }).catch(err =>{
   console.log("fail while connecting to server"+ err);
 })




