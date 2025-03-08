const wppconnect = require('@wppconnect-team/wppconnect');

const clients = new Map();

const initWpp = async ({ sessionName, onQRUpdated, onConnectionSuccess }) => {
  if (!clients.has(sessionName)) {
    try {
      const client = await wppconnect.create({
        session: sessionName,
        catchQR: (base64Qr) => {
          if (onQRUpdated) {
            onQRUpdated(base64Qr);
          }
        },
        statusFind: (statusSession) => {
          if (statusSession === 'phoneConnected' && onConnectionSuccess) {
            onConnectionSuccess();
          }
        },
        puppeteerOptions: {
          headless: true
        }
      });

      clients.set(sessionName, client);
      console.log(`🚀 Bot conectado com sucesso para a sessão ${sessionName}!`);
      return client;
    } catch (error) {
      console.error('Erro ao iniciar o bot:', error);
      throw error;
    }
  }
  return clients.get(sessionName);
};

module.exports = { initWpp };
