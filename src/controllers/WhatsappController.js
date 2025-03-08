const WhatsappSession = require('../models/WhatsappSession');
const { initWpp } = require('../config/wppconnect');

class WhatsappController {
  async initSession(req, res) {
    try {
      const { empresa_id } = req.body;

      if (!empresa_id) {
        return res.status(400).json({ error: 'empresa_id é obrigatório' });
      }

      let session = await WhatsappSession.findOne({
        where: { 
          empresa_id,
          session_name: `chatbot_${empresa_id}`
        }
      });

      if (!session) {
        session = await WhatsappSession.create({
          empresa_id,
          session_name: `chatbot_${empresa_id}`,
          status: 'INITIALIZING'
        });
      }

      let responseSent = false;

      const client = await initWpp({
        sessionName: `chatbot_${empresa_id}`,
        onQRUpdated: async (qrCode) => {
          await session.update({
            qr_code: qrCode,
            status: 'WAITING_FOR_SCAN'
          });
          if (!responseSent) {
            responseSent = true;
            res.json({ qrCode });
          }
        },
        onConnectionSuccess: async () => {
          await session.update({
            qr_code: null,
            status: 'CONNECTED'
          });
        }
      });

      return res.json(session);
    } catch (error) {
      console.error('Erro ao inicializar sessão:', error);
      return res.status(500).json({ error: 'Erro ao inicializar sessão do WhatsApp' });
    }
  }

  async getStatus(req, res) {
    try {
      const { empresa_id } = req.params;

      if (!empresa_id) {
        return res.status(400).json({ error: 'empresa_id é obrigatório' });
      }

      const session = await WhatsappSession.findOne({
        where: { 
          empresa_id,
          session_name: `chatbot_${empresa_id}`
        },
        include: [{
          association: 'empresa',
          attributes: ['nome', 'cnpj_cpf']
        }]
      });

      if (!session) {
        return res.status(404).json({ error: 'Sessão não encontrada' });
      }

      return res.json(session);
    } catch (error) {
      console.error('Erro ao buscar status:', error);
      return res.status(500).json({ error: 'Erro ao buscar status da sessão' });
    }
  }

  async getQRCode(req, res) {
    try {
      const { empresa_id } = req.params;

      if (!empresa_id) {
        return res.status(400).json({ error: 'empresa_id é obrigatório' });
      }

      const session = await WhatsappSession.findOne({
        where: { 
          empresa_id,
          session_name: `chatbot_${empresa_id}`
        }
      });

      if (!session || !session.qr_code) {
        return res.status(404).json({ error: 'QR Code não disponível' });
      }

      return res.json({ qrCode: session.qr_code });
    } catch (error) {
      console.error('Erro ao buscar QR code:', error);
      return res.status(500).json({ error: 'Erro ao buscar QR code' });
    }
  }
}

module.exports = new WhatsappController(); 