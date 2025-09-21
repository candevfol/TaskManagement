import mongoose from "mongoose";

const Task = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type:String
    },
    status:{
        type: String,
        enum : ['todo','progress','completed','notdo'],
        default : 'todo'
    }
})

const TaskModel = mongoose.model("Task", Task);

export {TaskModel}