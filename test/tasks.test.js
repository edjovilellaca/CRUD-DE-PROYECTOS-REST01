const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');
const app = require('../index');
const taskController = require('../Controllers/taskController');
const expect = chai.expect;

describe('tasks API', () => {

    describe('GET /tasks', () => {
        it('Debería devolver todos los proyectos con estatus 200 cuando hay proyectos', async () => {
            const tasks = [/* tus proyectos */];

            const res = await request(app).get('/tasks');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(5);
            expect(res.body).to.deep.equal(tasks);
        });

        it('Debería devolver 404 si no hay proyectos', async () => {
            const res = await request(app).get('/tasks');
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('No se encontraron proyectos');
        });
    });

    describe('GET /tasks/:id', () => {
        it('Debería devolver un proyecto por su ID', async () => {
            const project = {
                id: "5f0dba4a-e8d3-4a63-9cf1-741c53f6be72",
                name: "Nuevo sistema de gestión",
                description: "Implementar un sistema de recursos"
            };

            const res = await request(app).get(`/tasks/${project.id}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(project);
        });

        it('Debería devolver 404 si el proyecto no existe', async () => {
            const res = await request(app).get('/tasks/invalid-id');
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Proyecto no encontrado');
        });
    });

    describe('POST /tasks', () => {
        it('Debería crear un nuevo proyecto y devolverlo con estatus 201', async () => {
            const newProject = {
                name: "Nuevo proyecto",
                description: "Descripción del proyecto",
                startDate: "2024-09-01",
                endDate: "2025-02-01",
                status: "En progreso",
                teamMembers: ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
                budget: 5000
            };

            const res = await request(app).post('/tasks').send(newProject);
            expect(res.status).to.equal(201);
            expect(res.body).to.include(newProject);
        });

        it('Debería devolver 400 si falta algún campo obligatorio', async () => {
            const incompleteProject = { name: "Proyecto incompleto" };

            const res = await request(app).post('/tasks').send(incompleteProject);
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Faltan campos obligatorios');
        });
    });

    describe('PUT /tasks/:id', () => {
        it('Debería actualizar un proyecto existente y devolverlo', async () => {
            const updatedProject = {
                name: "Proyecto actualizado",
                description: "Descripción actualizada"
            };

            const res = await request(app).put('/tasks/5f0dba4a-e8d3-4a63-9cf1-741c53f6be72').send(updatedProject);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(updatedProject.name);
            expect(res.body.description).to.equal(updatedProject.description);
        });

        it('Debería devolver 404 si el proyecto a actualizar no existe', async () => {
            const res = await request(app).put('/tasks/invalid-id').send({
                name: "Proyecto inexistente"
            });
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Proyecto no encontrado');
        });
    });

    describe('DELETE /tasks/:id', () => {
        it('Debería eliminar un proyecto existente y devolver 204', async () => {
            const res = await request(app).delete('/tasks/5f0dba4a-e8d3-4a63-9cf1-741c53f6be72');
            expect(res.status).to.equal(204);
        });

        it('Debería devolver 404 si el proyecto a eliminar no existe', async () => {
            const res = await request(app).delete('/tasks/invalid-id');
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Proyecto no encontrado');
        });
    });
});
