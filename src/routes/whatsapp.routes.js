const express = require('express');
const WhatsappController = require('../controllers/WhatsappController');

const router = express.Router();

router.post('/sessions/init', WhatsappController.initSession);
router.get('/sessions/status/:empresa_id', WhatsappController.getStatus);
router.get('/sessions/qrcode/:empresa_id', WhatsappController.getQRCode);

module.exports = router; 