const Epic = require('../models/Epic');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Story = require('../models/Story')

// Obtener todas las epicas de un proyecto
const getEpicsByProject = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de proyecto inválido.' });
        }

        const epics = await Epic.find({ project: id }).populate('project');
        res.status(200).json({ data: epics });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las épicas.', error: error.message });
    }
};

// Obtener una epica por ID
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

        res.status(200).json({ data: epic });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la épica.', error: error.message });
    }
};

// Agregar una nueva epica
async function addEpic(req, res) {
    try {
        const { project, name, description, icon } = req.body;

        // Verificar si el proyecto existe
        const existingProject = await Project.findById(project);
        if (!existingProject) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        // Crear nueva epica
        const newEpic = new Epic({ project, name, description, icon });

        // Guardar epica
        const savedEpic = await newEpic.save();

        // Enviar respuesta con la epica 
        res.status(201).json(savedEpic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la épica.' });
    }
}

// Editar una epica
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

// Eliminar una epica
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

// Obtener historias de una epica
const getStoriesByEpic = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID de la épica es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de épica no válido.' });
        }

        // Buscar historias asociadas a la épica
        const stories = await Story.find({ epic: id })
            .populate('epic', 'name') // Si necesitas los datos de la épica
            .populate('assignedTo', 'username email') // Si necesitas los datos de los usuarios asignados

        res.status(200).json({ data: stories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las historias de la épica.', error: error.message });
    }
};

module.exports = {
    getEpicsByProject,
    getEpic,
    addEpic,
    editEpic,
    deleteEpic,
    getStoriesByEpic
};
