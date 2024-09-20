let tasks = [
    {
        id: 1,
        title:"Tarea1",
        description: "Descripción de la Tarea 1",
    },

    {
        id: 2,
        title:"Tarea2",
        description: "Descripción de la Tarea 2",
    },

    {
        id: 3,
        title:"Tarea3",
        description: "Descripción de la Tarea 3",
    }
];

function getAllTasks(){
    return tasks;
}

function createTask(title, description){

    if(!title || !description){
        return null;
    }

    const newTask = {
        id: tasks[tasks.length-1].id + 1,
        title, 
        description
    };

    tasks.push(newTask);
    return tasks;
}

function deleteTask(id){
    const index = tasks.findIndex(task => task.id === parseInt(id));

    if(index == -1){
        return null;
    }

    tasks.splice(index, 1);
    return tasks;
}

function updateTask(id, title, description){
    const idTask = tasks.findIndex(task => task.id === id);

    if(idTask == -1){
        return null;
    }

    if(title){
        tasks[idTask].title = title;
    }
    if(description){
        tasks[idTask].description = description
    }

    return tasks;
}

function getTask(id) {
    const task = tasks.find(task => task.id === parseInt(id)); 
    return task;
}

module.exports = {
    getAllTasks, createTask, deleteTask, updateTask, getTask
}