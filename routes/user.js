const express = require('express');
const router = express.Router();
const { checkToken } = require("../controllers/auth");
const userController = require('../controllers/user');

router.get('/:id', checkToken, userController.getUserById); //get user  
router.put('/:id', checkToken, userController.updateUser); //update user

module.exports = router;