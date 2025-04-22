const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const { checkToken } = require("../controllers/auth");

router.post('/tasks', checkToken, taskController.addTask); //add task  
router.get('/tasks', checkToken, taskController.getTasks);  //get tasks
router.get('/tasks/:id', checkToken, taskController.getTaskById); //get task for id
router.put('/tasks/:id', checkToken, taskController.updateTask); // update task
router.delete('/tasks/:id', checkToken, taskController.deleteTask); //delete task

module.exports = router;
