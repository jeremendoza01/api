const express = require("express");
const router = express.Router();
const epicController = require("../controllers/epic");
const { checkToken } = require("../controllers/auth");

router.get("/project/:id", checkToken, epicController.getEpicsByProject); // Obtener epicas por proyecto
router.get("/:id", checkToken, epicController.getEpic); // Obtener una epica por ID
router.post("/", checkToken, epicController.addEpic); // Crear una épica
router.put("/:id", checkToken, epicController.editEpic); // Editar una epica (PUT)
router.delete("/:id", checkToken, epicController.deleteEpic); // Eliminar una epica
router.get('/:id/stories', checkToken, epicController.getStoriesByEpic); // obtener historias de la epica
module.exports = router;
