const express = require('express');
const router = express.Router();
const mensagemController = require('../controllers/mensagemController');

router.get('/mensagens/:numero', mensagemController.listarMensagens);
router.post('/mensagem', mensagemController.enviarMensagem);

module.exports = router;
