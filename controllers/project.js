const mongoose = require('mongoose');
const Project = require('../models/Project');

const controllerProject = {
    // Obtener todos los proyectos
    async getProjects(req, res) {
        try {
            const projects = await Project.find().populate('owner members', 'name email');
            res.status(200).json({ data: projects });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los proyectos.' });
        }
    },

    // Obtener un proyecto por ID
    async getProject(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'ID de proyecto no válido.' });
            }

            const project = await Project.findById(id).populate('owner members', 'name email');
            if (!project) {
                return res.status(404).json({ message: 'Proyecto no encontrado.' });
            }

            res.status(200).json({ data: project });


        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el proyecto.' });
        }
    },

    // Agregar un proyecto
    async addProject(req, res) {
        try {
            // console.log("Entrando a addProject...");
            const { name, members, description, icon, owner } = req.body;
    
            if (!name || !owner) {
                return res.status(400).json({ message: 'El nombre y el propietario son obligatorios.' });
            }
    
            if (members && !members.every(id => mongoose.Types.ObjectId.isValid(id))) {
                return res.status(400).json({ message: 'Uno o más IDs de miembros no son válidos.' });
            }
    
            const newProject = new Project({ name, members, description, icon, owner });
            // console.log("proyecto creado:", newProject);
            const savedProject = await newProject.save();
            // console.log("Proyecto guardado:", savedProject);  // Verifica que el proyecto se guarda correctamente
            
            res.status(200).json({ data: project });

        } catch (error) {
            console.error("Error al guardar el proyecto:", error);  // Detalle del error
            res.status(500).json({ message: 'Error al crear el proyecto.' });
        }
    },

    // Editar un proyecto
    async editProject(req, res) {
        try {
            const { id } = req.params;
            const { name, members, description, icon, owner } = req.body;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'ID de proyecto no válido.' });
            }

            const updatedProject = await Project.findByIdAndUpdate(
                id,
                { name, members, description, icon, owner },
                { new: true, runValidators: true }
            );

            if (!updatedProject) {
                return res.status(404).json({ message: 'Proyecto no encontrado.' });
            }

            res.status(200).json(updatedProject);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al editar el proyecto.' });
        }
    },

    // Eliminar un proyecto
    async deleteProject(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'ID de proyecto no válido.' });
            }

            const deletedProject = await Project.findByIdAndDelete(id);
            if (!deletedProject) {
                return res.status(404).json({ message: 'Proyecto no encontrado.' });
            }

            res.status(200).json({ message: 'Proyecto eliminado con éxito.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el proyecto.' });
        }
    },
};

module.exports = controllerProject;
