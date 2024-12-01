const Sprint = require('../models/Sprint');
const Project = require('../models/Project');

// Obtener todos los sprints
const getSprints = async (req, res) => {
    try {
        const sprints = await Sprint.find().populate('project', 'name');
        res.status(200).json({
            message: 'Sprints obtenidos exitosamente',
            data: sprints,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los sprints', error });
    }
};

// Obtener un sprint por ID
const getSprintById = async (req, res) => {
    try {
        const { id } = req.params;
        const sprint = await Sprint.findById(id).populate('project', 'name');
        if (!sprint) {
            return res.status(404).json({ message: 'Sprint no encontrado' });
        }
        res.status(200).json({
            message: 'Sprint obtenido exitosamente',
            data: sprint,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el sprint', error });
    }
};

// Crear un nuevo sprint
const addSprint = async (req, res) => {
    try {
        const { name, description, start, finish, project } = req.body;

        // Verificar si el proyecto existe
        const existingProject = await Project.findById(project);
        if (!existingProject) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        const sprint = new Sprint({
            name,
            description,
            start,
            finish,
            project,
        });

        const savedSprint = await sprint.save();
        res.status(201).json({
            message: 'Sprint creado exitosamente',
            data: savedSprint,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el sprint', error });
    }
};

// Actualizar un sprint
const updateSprint = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, start, finish, project } = req.body;

        const updatedSprint = await Sprint.findByIdAndUpdate(
            id,
            { name, description, start, finish, project },
            { new: true }
        );

        if (!updatedSprint) {
            return res.status(404).json({ message: 'Sprint no encontrado' });
        }

        res.status(200).json({
            message: 'Sprint actualizado exitosamente',
            data: updatedSprint,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el sprint', error });
    }
};

// Eliminar un sprint
const deleteSprint = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSprint = await Sprint.findByIdAndDelete(id);

        if (!deletedSprint) {
            return res.status(404).json({ message: 'Sprint no encontrado' });
        }

        res.status(200).json({
            message: 'Sprint eliminado exitosamente',
            data: deletedSprint,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el sprint', error });
    }
};

module.exports = {
    getSprints,
    getSprintById,
    addSprint,
    updateSprint,
    deleteSprint,
};
