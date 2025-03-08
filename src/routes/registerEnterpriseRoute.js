const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const registerEnterpriseController = require('../controllers/enterpriseController');

// ROTA ->  CONTROLADOR -> FUNCÃO
router.post('/register-new-enterprise', registerEnterpriseController.registerNew);

router.use(authMiddleware);

module.exports = router;
