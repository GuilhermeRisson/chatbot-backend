const wppconnect = require('@wppconnect-team/wppconnect');

let client;

const initWpp = () => {
  if (!client) {
    wppconnect.create({
      session: 'chatbot',
      puppeteerOptions: {
        headless: false
      }
    }).then((cli) => {
      client = cli;
      console.log('🚀 Bot conectado com sucesso!');
    }).catch((error) => {
      console.error('Erro ao iniciar o bot:', error);
    });
  }
  return client;
};

module.exports = initWpp;
