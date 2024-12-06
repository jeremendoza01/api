const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const auth = require('./routes/auth');
const projectRoutes = require('./routes/project');
const epic = require('./routes/epic');
const storyRoutes = require('./routes/story');
const taskRoutes = require('./routes/task')
const userRoutes = require('./routes/user');
dotenv.config();

const connectDB = require('./db')

const app = express();

//conexion con la BDD
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Permitir solicitudes desde el front
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth']
}));



// 6748e83e58269cee2e8f803b

// Rutas
app.use('/api', auth); // Ruta para autenticación
app.use('/api/projects', projectRoutes); // Ruta para proyectos
app.use('/api/epics', epic); // Rutas de épicas
app.use('/api/stories', storyRoutes); // Ruta para historias
app.use('/api', taskRoutes)
app.use('/api/users', userRoutes);


console.log("Servidor iniciado correctamente.");

// Servidor
const PORT = 5000;

// console.log("Antes de la inicialización del servidor");
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// console.log("Después de la inicialización del servidor");
