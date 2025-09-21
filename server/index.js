import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import { connectDb } from "./utils/dbConnection.js";
import boardRouter from './controller/board.controller.js';
import taskRouter from './controller/task.controller.js'

const app = express();
const PORT = process.env.PORT

connectDb();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('working fine');
})

app.use('/board', boardRouter);
app.use('/tasks', taskRouter);

app.listen(PORT, ()=>{
    console.log(`App is listning to: ${PORT}`)
})