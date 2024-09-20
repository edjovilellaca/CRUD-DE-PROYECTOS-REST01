const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./Routes/taskRoutes');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

module.exports = app;