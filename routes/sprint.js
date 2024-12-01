const express = require('express');
const { 
    getSprints, 
    getSprintById, 
    addSprint, 
    updateSprint, 
    deleteSprint 
} = require('../controllers/sprint');

const { checkToken } = require("../controllers/auth");

const router = express.Router();

// Obtener todos los sprints
router.get('/',checkToken, getSprints);

// Obtener un sprint por ID
router.get('/:id',checkToken,  getSprintById);

// Crear un nuevo sprint
router.post('/', checkToken, addSprint);

// Actualizar un sprint existente
router.put('/:id', checkToken,  updateSprint);

// Eliminar un sprint
router.delete('/:id', checkToken, deleteSprint);

module.exports = router;
