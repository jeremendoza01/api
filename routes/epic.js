const express = require("express");
const router = express.Router();
const epicController = require("../controllers/epic");
const { checkToken } = require("../controllers/auth");

router.get("/project/:id", checkToken, epicController.getEpicsByProject); // Obtener épicas por proyecto
router.get("/:id", checkToken, epicController.getEpic); // Obtener una épica por ID
router.post("/", checkToken, epicController.addEpic); // Crear una épica
router.put("/:id", checkToken, epicController.editEpic); // Editar una épica (PUT)
router.delete("/:id", checkToken, epicController.deleteEpic); // Eliminar una épica
// router.get('/epics/:id/stories', checkToken, epicController.getEpicStories);
router.get('/:id/stories', checkToken, epicController.getStoriesByEpic); // Nueva ruta para obtener historias de la épica
module.exports = router;
