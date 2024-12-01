const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const { checkToken } = require("../controllers/auth");

router.post('/tasks', checkToken, taskController.addTask);
router.get('/tasks', checkToken, taskController.getTasks);
router.get('/tasks/:id', checkToken, taskController.getTaskById);
router.put('/tasks/:id', checkToken, taskController.updateTask);
router.delete('/tasks/:id', checkToken, taskController.deleteTask);

module.exports = router;
