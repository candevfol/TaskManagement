import express from "express";
import BoardModel from "../model/Board.model.js";
import TaskModel from "../model/Task.model.js";

const router = express.Router();

router.post('/:id', async (req, res) => {
  try {
    const boardId = req.params.id;
    const { name, description,status } = req.body;

    const board = await BoardModel.findById(boardId)
    if(!board){
        res.status(401).send({Error:"No Board found with given id"})
    }

    const task = await TaskModel.create({name, description, status});
    board.tasks.push(task._id);
    board.save();

    res.status(201).send({task : task, msg:"Task created success"});
  } catch (e) {
    res.send({error: e})
    console.error(`Error occured ${e}`);
  }
});

router.get('/:id', async(req, res)=> {
    try{    
        const boardId = req.params.id;
        const status = req.query.status;


        if(!boardId || !(status==="todo" || status==="progress" || status==="completed" || status==="notdo")){
          return res.status(401).send({error:"board not found OR status given is incorrect"});
        }
        
        const boards =await BoardModel.findById(boardId).populate("tasks");
        const modifiedBoards = boards.tasks.filter((task)=> {
          return task.status === status
      });
      return res.send({board: modifiedBoards});
    }
    catch(e){
        console.error(`Error occured ${e}`);
    }
})

router.put('/:id', async(req,res) => {
    try{
        const id = req.params.id;
        const {name, description}= req.body;

        const response = await BoardModel.findByIdAndUpdate(id, {
            ...(name !== undefined && { name }),
            ...(description !== undefined && { description })
          },{new:true})
        res.send({board: response, msg:"Update board success"});
    }
    catch(e){
        res.send({Error: e});
        console.error(e);

    }
})

router.put('/:id', async(req,res) => {
    try{
        const id = req.params.id;
        const {name, description, status}= req.body;

        const response = await TaskModel.findByIdAndUpdate(id, {
            ...(name !== undefined && { name }),
            ...(description !== undefined && { description }),
            ...(status !== undefined && {status})
          },{new:true})
        res.send({task: response, msg:"Update Task success"});
    }
    catch(e){
        res.send({Error: e});
        console.error(e);

    }
})

router.delete('/:boardId/:taskId', async(req,res) => {
    try{
        const {boardId, taskId }= req.params;

        const board = await BoardModel.findById(boardId)
        if(!board){
            res.status(401).send({Error:"No Board found with given id"})
        }

        const taskDeleted = await TaskModel.findByIdAndDelete(taskId)
        if(!taskDeleted){
            res.status(401).send({Error:"No Task found with given id"})
        }

        board.tasks = board.tasks.filter(
            (task) => task._id.toString() !== taskDeleted._id.toString()
          );
          
        await board.save();

        res.send({msg:"Delet success"});
    }
    catch(e){
        res.send({Error: e});
        console.error(e);

    }
})



export default router;
