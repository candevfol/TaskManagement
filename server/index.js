import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import { connectDb } from "./utils/dbConnection.js";

const app = express();
const PORT = process.env.PORT

connectDb();

app.get('/',(req,res)=>{
    res.send('working fine');
})

app.listen(PORT, ()=>{
    console.log(`App is listning to: ${PORT}`)
})