const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.get('/', async (req,res) => {
    try{
        const todo = await Todo.find({userID: req.user._id});
        res.json(todo);
    }catch(err){
        res.send(err);
    }
});

router.get('/:todoId', async (req,res) => {
    try{
        const todo = await Todo.findById(req.params.todoId);
        res.json(todo);
    }catch(err){
        res.send(err);
    }
});

router.post('/', async (req,res) => {
    const todo = new Todo({
        userID: req.user._id,
        title: req.body.title,
        completed: req.body.completed
    });
    try{
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch(err){
        res.send(err);
    }
});

router.delete('/:todoId', async (req,res) => {
    try{
        const todo = await Todo.remove({_id:req.params.todoId});
        res.json(todo);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;
