const express = require('express');
const bodyParser = require('body-parser');

const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/projects',taskRoutes);

const PORT =  3000;

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Servidor corriendo en el puerto '+ PORT);
});

module.exports = app;