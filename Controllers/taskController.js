const { v4: uuidv4 } = require('uuid');

let projects = [
  {
    "id": "5f0dba4a-e8d3-4a63-9cf1-741c53f6be72",
    "name": "Nuevo Sistema de Gestión",
    "description": "Implementar un sistema de recursos.",
    "startDate": "2024-09-01",
    "endDate": "2025-02-01",
    "status": "en progreso",
    "teamMembers": ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
    "budget": 50000
  }, 

  {
    "id": "c2478e3f-e29d-4395-b6e9-0a3d6f7e113b",
    "name": "Nuevo Sistema de Gestión 2",
    "description": "Implementar un sistema de materiales.",
    "startDate": "2024-09-02",
    "endDate": "2025-02-02",
    "status": "pendiente",
    "teamMembers": ["Luis Martínez", "Ana Gómez", "Carlos Pérez"],
    "budget": 70000
  },

  {
    "id": "9550d2a7-2f68-4034-8f5a-f7a13164c729",
    "name": "Nuevo Sistema de Gestión 3",
    "description": "Implementar un sistema de mas cosas.",
    "startDate": "2023-08-03",
    "endDate": "2024-03-03",
    "status": "completado",
    "teamMembers": ["Ana Gómez", "Luis Pérez", "Carlos Martínez"],
    "budget": 60000
  }  

];
function getAllProjects() {
  return projects;
}

function getProjectById(id) {
  const proyecto = projects.find(project => project.id === id);
  return proyecto;
}

function createProject(name, description, startDate, endDate, status, teamMembers, budget) {
  
  if(!name){
    return 1;
  }if(description.replaceAll(' ', '') == ''){
    return 2;
  }if(!formatoCorrecto(startDate)){
    return 3;
  }if(!formatoCorrecto(endDate)){
    return 4;
  }if(startDate > endDate){
    return 5;
  }if (!['pendiente', 'completado', 'en progreso'].includes(status.toLowerCase())) {
    return 6;
  }if(!teamMembers){
    return 7;
  }if (budget < 0) {
    return 8;
  }

  let myuuid = uuidv4();
  const newProject = {
    id: myuuid, name, description, startDate, endDate, status, teamMembers, budget
  };

  projects.push(newProject);

  return newProject;
}

function updateProject(id, name, description, startDate, endDate, status, teamMembers, budget) {
  const idProject = projects.find(project => project.id === id);

  if(idProject == -1){
      return null;
  }

  if(name === ""){
    return 1;
  }if (description === "") {
    return 2; 
  }if (startDate && !formatoCorrecto(startDate)) {
    return 3; 
  }if (endDate && !formatoCorrecto(endDate)) {
    return 4;  
  }if (startDate && endDate && startDate > endDate) {
    return 5;  
  }if (startDate && startDate > idProject.endDate) {
    return 6; 
  }if(status && !['pendiente', 'completado', 'en progreso'].includes(status.toLowerCase())){
    return 7;
  }if(teamMembers === ""){
    return 8;
  }if (budget !== undefined && budget < 0) {
    return 9;
  }

  if (name) idProject.name = name;
  if (description) idProject.description = description;
  if (startDate) idProject.startDate = startDate;
  if (endDate) idProject.endDate = endDate;
  if (status) idProject.status = status;
  if (teamMembers) idProject.teamMembers = teamMembers;
  if (budget !== undefined) idProject.budget = budget;

  return idProject;
}

function deleteProject(id) {
  const idProject = projects.findIndex(project => project.id === id);
  if(idProject == -1) return null;
  projects.splice(idProject, 1);
  return projects;
}

module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
};

function formatoCorrecto(fecha) {
  const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

  if (!formatoFecha.test(fecha)) {
      return false;
  }

  const date = new Date(fecha);
  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
      return false;
  }

  return fecha === date.toISOString().split('T')[0];
}