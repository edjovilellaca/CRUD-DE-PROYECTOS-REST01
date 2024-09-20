import {v4 as uuidv4} from 'uuid';
let myuuid = uuidv4();

let projects = [
    {
        id: "5f0dba4a-e8d3-4a63-9cf1-741c53f6be72",
        name:"Nuevo Sistema de Gestión",
        description: "Descripción proyecto 1",
        startDate: "2024-09-01",
        endDate: "2025-09-01",
        status: "En progreso",
        teamMembers: ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
        budget: 50000
    },

    {
        id: "2f0aaa4a-d8d3-4b63-9af1-741b53f6cc88",
        name:"Nuevo Sistema de luz",
        description: "Descripción proyecto 2",
        startDate: "2024-10-01",
        endDate: "2026-10-01",
        status: "Pre-Finalizado",
        teamMembers: ["Antonio Pérez", "Luis Gómez", "Jorge Martínez"],
        budget: 60000
    },

    {
        id: "9d1bba4a-d8d3-7b63-0ee1-333a44f6bb99",
        name:"Nuevo Sistema de almacenamiento",
        description: "Descripción proyecto 3",
        startDate: "2024-11-01",
        endDate: "2027-11-01",
        status: "Finalizado",
        teamMembers: ["Jesus Lopez", "Joaquin Arjona", "Carlos Cabral"],
        budget: 900000
    }
];


function getAllProjects(){
    return projects;
}

function createProjects(name, description,startDate, endDate, status, teamMembers, budget){

    if(!name 
        || !description
        || !startDate
        || !endDate
        || !status
        || !teamMembers
        || !budget){
        return null;
    }

    const newProject = {
        id,
        name, 
        description,
        startDate,
        endDate,
        status,
        teamMembers,
        budget
    };

    projects.push(newProject);
    return projects;
}

function deleteProjects(id){
    const index = projects.findIndex(project => project.id === (id));

    if(index == -1){
        return null;
    }

    projects.splice(index, 1);
    return projects;
}

function updateProjects(id,name, description,startDate, endDate, status, teamMembers, budget){
    const idProject = projects.findIndex(project => project.id === id);

    if(idProject == -1){
        return null;
    }

    if(name){
        projects[idProject].name = name;
    }
    if(description){
        projects[idProject].description = description
    }
    if(startDate){
        projects[idProject].startDate = startDate
    }
    if(endDate){
        projects[idProject].endDate = endDate
    }
    if(status){
        projects[idProject].status = status
    }
    if(teamMembers){
        projects[idProject].teamMembers = teamMembers
    }
    if(budget){
        projects[idProject].budget = budget
    }
    
   
    return projects;
}

function getProjects(id) {
    const project = projects.find(project => project.id === (id)); 
    return project;
}

module.exports = {
    getAllProjects, createProjects, deleteProjects, updateProjects, getProjects
}
