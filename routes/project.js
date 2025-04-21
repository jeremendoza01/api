const express = require("express");
const router = express.Router();
const controllerProject = require("../controllers/project"); 
const epic = require("../controllers/epic");
const { checkToken } = require("../controllers/auth");

router.get("/", checkToken, controllerProject.getProjects); //get projects
router.get("/:id", checkToken, controllerProject.getProject); // get project for id
router.get("/:id/epics", checkToken, epic.getEpicsByProject); //get epics for project
router.post("/", checkToken, controllerProject.addProject);  //add project

// router.put("/:id", controllerProject.editProject); //edit project 
// router.delete("/:id", controllerProject.deleteProject); //delete

module.exports = router;
