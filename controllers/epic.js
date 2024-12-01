const Epic = require('../models/Epic');
const mongoose = require('mongoose');
const Project = require('../models/Project');

// Obtener todas las épicas de un proyecto
const getEpicsByProject = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de proyecto inválido.' });
        }

        const epics = await Epic.find({ project: id }).populate('project');
        res.status(200).json(epics);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las épicas.', error: error.message });
    }
};

// Obtener una épica por ID
const getEpic = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de épica inválido.' });
        }

        const epic = await Epic.findById(id).populate('project');

        if (!epic) {
            return res.status(404).json({ message: 'Épica no encontrada.' });
        }

        res.status(200).json(epic);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la épica.', error: error.message });
    }
};

// Agregar una nueva épica
async function addEpic(req, res) {
    try {
        const { project, name, description, icon } = req.body;

        // Verificar si el proyecto existe
        const existingProject = await Project.findById(project);
        if (!existingProject) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        // Crear la nueva épica
        const newEpic = new Epic({ project, name, description, icon });

        // Guardar la épica
        const savedEpic = await newEpic.save();

        // Enviar respuesta con la épica guardada
        res.status(201).json(savedEpic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la épica.' });
    }
}

// Editar una épica
const editEpic = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de épica inválido.' });
        }

        const updatedEpic = await Epic.findByIdAndUpdate(id, updates, { new: true }).populate('project');

        if (!updatedEpic) {
            return res.status(404).json({ message: 'Épica no encontrada.' });
        }

        res.status(200).json({ message: 'Épica actualizada exitosamente.', updatedEpic });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la épica.', error: error.message });
    }
};

// Eliminar una épica
const deleteEpic = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de épica inválido.' });
        }

        const deletedEpic = await Epic.findByIdAndDelete(id);

        if (!deletedEpic) {
            return res.status(404).json({ message: 'Épica no encontrada.' });
        }

        res.status(200).json({ message: 'Épica eliminada exitosamente.', deletedEpic });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la épica.', error: error.message });
    }
};

module.exports = {
    getEpicsByProject,
    getEpic,
    addEpic,
    editEpic,
    deleteEpic
};
