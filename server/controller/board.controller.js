import express from "express";
import BoardModel from "../model/Board.model.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    const response = await BoardModel.create({
      name,
      description,
    });

    res.status(201).send({boardId : response._id})
  } catch (e) {
    res.send({error: e})
    console.error(`Error occured ${e}`);
  }
});

router.get('/:id', async(req, res)=> {
    try{    
        const id = req.params.id;

        const response = await BoardModel.findById(id);
        if(!response)res.send({message: "Couldnot find"});
        res.send({board: response});
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

router.delete('/:id', async(req,res) => {
    try{
        const id = req.params.id;

        const response = await BoardModel.findByIdAndDelete(id);
        res.send({board: response, msg:"Delet success"});
    }
    catch(e){
        res.send({Error: e});
        console.error(e);

    }
})



export default router;
