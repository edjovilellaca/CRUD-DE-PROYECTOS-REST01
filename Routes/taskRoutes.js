const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');

router.get('/', (req, res) => {
    const {id} = req.body;
    let task;
    if(id){
        task = taskController.getTask(id);
        if(!task){
            return res.status(404).json({"error": 'Tarea inexsistente'});
        }
    }else{
        task = taskController.getAllTasks();
    }
    
    if(task.length > 0){
        res.status(200).json(task);
    }else{
        res.status(404).json({code: 404, message: "Tasks not found"});
    }
});

router.post('/', (req, res) => {
    const {title, description} = req.body;
    const newTask = taskController.createTask(title, description);

    if(!newTask){
        return res.status(412).json({"error": 'Datos insuficientes'});
    }

    res.status(200).json(newTask);
});

router.delete('/', (req, res) => {
    const {id} = req.body;
    const newTask = taskController.deleteTask(id);

    if(!newTask){
        return res.status(404).json({"error": 'Tarea inexsistente'});
    }

    res.status(200).json(newTask);
});

router.patch('/', (req, res) => {
    const {id, title, description} = req.body;
    const newTask = taskController.updateTask(id, title, description);
    if(!newTask){
        return res.status(404).json({"error": 'Tarea inexsistente'});
    }

    res.status(200).json(newTask);
});

module.exports = router;