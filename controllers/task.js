const Task = require('../models/task');
const Story = require('../models/Story');

const addTask = async (req, res) => {
    const { name, description, story, due } = req.body;

    try {
        // Validar que la story exista
        const existingStory = await Story.findById(story);
        if (!existingStory) {
            return res.status(404).json({ message: 'La historia asociada no existe.' });
        }

        // Crear la nueva task
        const newTask = new Task({
            name,
            description,
            story,
            due,
        });

        await newTask.save();

        res.status(201).json({
            message: 'Tarea creada exitosamente',
            task: newTask,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear la tarea',
            error: error.message,
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('story', 'name');
        res.status(200).json({ data: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener las tareas',
            error: error.message,
        });
    }
};

const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id).populate('story', 'name');
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        res.status(200).json({ data: task });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener la tarea',
            error: error.message,
        });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, description, story, due, done } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { name, description, story, due, done },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        res.status(200).json({
            message: 'Tarea actualizada exitosamente',
            task,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al actualizar la tarea',
            error: error.message,
        });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        res.status(200).json({
            message: 'Tarea eliminada exitosamente',
            task,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar la tarea',
            error: error.message,
        });
    }
};

module.exports = {
    addTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
