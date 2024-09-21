const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');

router.get('/', (req, res) => {    
    const projects = taskController.getAllProjects();

    if(projects.length > 0){
        res.status(200).json(projects);
    }else{
        res.status(404).json({code: 404, message: "Projects not found"});
    }
    
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const project = taskController.getProjectById(id);

    if(project){
        res.status(200).json(project);
    }else{
        res.status(404).json({code: 404, message: "Projects not found"});
    }
    
});

router.post('/', (req, res) => {
    const {name, description, startDate, endDate, status, teamMembers, budget} = req.body;
    const newProject = 
    taskController.createProject(name, description, startDate, endDate, status, teamMembers, budget);


    if(newProject == 1){
        return res.status(412).json({"error": 'Nombre de proyecto no proveido.'});
    }
    if(newProject == 2){
        return res.status(412).json({"error": 'Descripción de proyecto vacía'});
    }
    if(newProject == 3){
        return res.status(412).json({"error": 'Formato de fecha de inicio erronea'});
    }
    if(newProject == 4){
        return res.status(412).json({"error": 'Formato de fecha de cierre erronea'});
    }
    if(newProject == 5){
        return res.status(412).json({"error": 'La fecha de inicio está posicionada después de la fecha de cierre.'});
    }
    if(newProject == 6){
        return res.status(412).json({"error": 'Status erroneo, por favor ingrese "pendiente", "en progreso" o "completado"'});
    }
    if(newProject == 7){
        return res.status(412).json({"error": 'Miembros de equipo inexistentes'});
    }
    if(newProject == 8){
        return res.status(412).json({"error": 'Presupuesto debe ser positivo o por minimo, igual a cero'});
    }

    res.status(200).json(newProject);
});

router.delete('/', (req, res) => {
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