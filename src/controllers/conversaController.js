const conversaService = require('../services/conversaService');

exports.listarConversas = (req, res) => {
  const conversas = conversaService.getConversas();
  conversas.then(data => res.json(data))
           .catch(err => res.status(500).json({ error: err.message }));
};
