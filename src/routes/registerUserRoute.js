const express = require('express');
const router = express.Router();
const registerUserController = require('../controllers/UserController');

// ROTA ->  CONTROLADOR -> FUNCÃO
router.post('/register-new-user', registerUserController.registerNew);

module.exports = router;
