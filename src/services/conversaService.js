const initWpp = require('../config/wppconnect');

exports.getConversas = async () => {
  const client = initWpp();
  return await client.getAllChats();
};
