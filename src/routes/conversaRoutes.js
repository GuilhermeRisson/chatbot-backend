const express = require('express');
const router = express.Router();
const conversaController = require('../controllers/conversaController');

router.get('/conversas', conversaController.listarConversas);

module.exports = router;
