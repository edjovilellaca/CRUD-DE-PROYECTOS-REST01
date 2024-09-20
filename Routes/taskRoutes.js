const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');

router.get('/projects', (req, res) => {    
    const projects = taskController.getAllProjects();

    if(projects.length > 0){
        res.status(200).json(projects);
    }else{
        res.status(404).json({code: 404, message: "Projects not found"});
    }
    
});

router.get('/projects/:id', (req, res) => {
    const {id} = req.params;
    const projects = taskController.getProjectsById(id);

    if(projects.length > 0){
        res.status(200).json(projects);
    }else{
        res.status(404).json({code: 404, message: "Projects not found"});
    }
    
});

router.post('/projects', (req, res) => {
    const {name, description, startDate, endDate, status, teamMembers, budget} = req.body;
    const newProject = 
    taskController.createProject(name, description, startDate, endDate, status, teamMembers, budget);


    if(!newProject){
        return res.status(412).json({"error": 'Datos insuficientes'});
    }

    res.status(200).json(newProject);
});

router.delete('/projects/:id', (req, res) => {
    const {id} = req.body;
    const newProject = taskController.deleteProject(id);

    if(!newProject){
        return res.status(404).json({"error": 'Proyecto inexsistente'});
    }

    res.status(200).json(newProject);
});

router.patch('/', (req, res) => {
    const {name, description, startDate, endDate, status, teamMembers, budget} = req.body;
    const newProject = 
    taskController.updateProject(name, description, startDate, endDate, status, teamMembers, budget);

    if(!newProject){
        return res.status(404).json({"error": 'Proyecto inexsistente'});
    }

    res.status(200).json(newProject);
});

module.exports = router;