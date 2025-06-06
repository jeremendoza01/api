const express = require('express');
const { addStory, getStories, getStoryById, updateStory, deleteStory, getTasksByStory } = require('../controllers/story');
const { checkToken } = require("../controllers/auth");
const router = express.Router();

// Rutas para historias
router.post('/', checkToken, addStory); // Crear una nueva historia
router.get('/', checkToken, getStories); // Obtener todas las historias
router.get('/:id', checkToken, getStoryById); // Obtener una historia por ID
router.get('/:id/tasks', checkToken, getTasksByStory); // obtener tareas de una historia

// router.put('/:id', checkToken, updateStory); // Actualizar una historia
// router.delete('/:id', checkToken, deleteStory); // Eliminar una historia

module.exports = router;
