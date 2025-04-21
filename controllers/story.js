const Story = require('../models/Story'); 
const Epic = require('../models/Epic'); 
const User = require('../models/User');
const Task = require('../models/task')
const mongoose = require('mongoose');


// Crear una nueva historia
const addStory = async (req, res) => {
    try {
        const { name, description, epic, owner, assignedTo, points, due, started, finished, status, icon } = req.body;

        // Verificar si la épica existe
        const existingEpic = await Epic.findById(epic);
        if (!existingEpic) {
            return res.status(404).json({ message: "Épica no encontrada" });
        }

        // Crear la nueva historia
        const newStory = new Story({
            name,
            description,
            epic,
            owner,
            assignedTo,
            points,
            due,
            started,
            finished,
            status,
            icon,
        });

        const savedStory = await newStory.save();
        res.status(201).json({ message: "Historia creada con éxito", data: savedStory });
    } catch (error) {
        console.error("Error al crear la historia:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todas las historias
const getStories = async (req, res) => {
    try {
        const stories = await Story.find()
            .populate('epic', 'name')
            .populate('owner', 'username email')
            .populate('assignedTo', 'username email');
            res.status(200).json({ data: stories });
    } catch (error) {
        console.error("Error al obtener las historias:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener una historia por su ID
const getStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await Story.findById(id)
            .populate('epic', 'name')
            .populate('owner', 'username email')
            .populate('assignedTo', 'username email');

        if (!story) {
            return res.status(404).json({ message: "Historia no encontrada" });
        }

        res.status(200).json({ data: story });
    } catch (error) {
        console.error("Error al obtener la historia:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar una historia
const updateStory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedStory = await Story.findByIdAndUpdate(id, updates, { new: true })
            .populate('epic', 'name')
            .populate('owner', 'username email')
            .populate('assignedTo', 'username email');

        if (!updatedStory) {
            return res.status(404).json({ message: "Historia no encontrada" });
        }

        res.status(200).json({ message: "Historia actualizada con éxito", data: updatedStory });
    } catch (error) {
        console.error("Error al actualizar la historia:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar una historia
const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStory = await Story.findByIdAndDelete(id);

        if (!deletedStory) {
            return res.status(404).json({ message: "Historia no encontrada" });
        }

        res.status(200).json({ message: "Historia eliminada con éxito" });
    } catch (error) {
        console.error("Error al eliminar la historia:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener tareas de una historia
const getTasksByStory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de historia inválido.' });
        }

        const tasks = await Task.find({ story: id });
        res.status(200).json({ data: tasks });
    } catch (error) {
        console.error('Error al obtener las tareas:', error.message);
        res.status(500).json({ message: 'Error al obtener las tareas.' });
    }
};




module.exports = {
    addStory,
    getStories,
    getStoryById,
    updateStory,
    deleteStory,
    getTasksByStory
};
