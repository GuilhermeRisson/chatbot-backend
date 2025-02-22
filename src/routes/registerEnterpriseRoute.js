const express = require('express');
const router = express.Router();
const registerEnterpriseController = require('../controllers/EnterpriseController');

// ROTA ->  CONTROLADOR -> FUNCÃO
router.post('/register-new-enterprise', registerEnterpriseController.registerNew);

module.exports = router;
