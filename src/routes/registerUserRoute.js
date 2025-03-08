const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const registerUserController = require('../controllers/UserController');

// ROTA ->  CONTROLADOR -> FUNCÃO
router.post('/register-new-user', registerUserController.registerNew);
router.post('/login', registerUserController.login);

router.use(authMiddleware);

module.exports = router;
