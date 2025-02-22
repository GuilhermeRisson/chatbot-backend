const mensagemService = require('../services/mensagemService');

exports.listarMensagens = (req, res) => {
  const numero = req.params.numero;
  const mensagens = mensagemService.getMensagens(numero);
  mensagens.then(data => res.json(data))
           .catch(err => res.status(500).json({ error: err.message }));
};

exports.enviarMensagem = (req, res) => {
  const { numero, mensagem } = req.body;
  mensagemService.enviarMensagem(numero, mensagem)
    .then(() => res.json({ status: 'Mensagem enviada!' }))
    .catch(err => res.status(500).json({ error: err.message }));
};
