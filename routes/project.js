const express = require("express");
const router = express.Router();
const controllerProject = require("../controllers/project"); // Verifica que el archivo y el nombre sean correctos
const epic = require("../controllers/epic");
const { checkToken } = require("../controllers/auth");

router.get("/", checkToken, controllerProject.getProjects); // Asegúrate de que project.getProjects esté definido
router.get("/:id", checkToken, controllerProject.getProject); // Asegúrate de que project.getProject esté definido
router.get("/:id/epics", checkToken, epic.getEpicsByProject); // Verifica epic.getEpicsByProject
router.post("/", checkToken, controllerProject.addProject); // Verifica project.addProject
// router.post("/", controllerProject.addProject);  // Temporalmente, sin checkToken

router.put("/:id", controllerProject.editProject); // Verifica project.editProject
router.delete("/:id", controllerProject.deleteProject); // Verifica project.deleteProject

module.exports = router;
