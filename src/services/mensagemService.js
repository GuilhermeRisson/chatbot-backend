const initWpp = require('../config/wppconnect');

exports.getMensagens = async (numero) => {
  const client = initWpp();
  return await client.getAllMessagesInChat(numero);
};

exports.enviarMensagem = async (numero, mensagem) => {
  const client = initWpp();
  await client.sendText(numero, mensagem);
};
