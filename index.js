require('dotenv').config();
const express = require('express');
const app = express();
const initWpp = require('./src/config/wppconnect');

initWpp();

app.use(express.json());

const conversaRoutes = require('./src/routes/conversaRoutes');
const mensagemRoutes = require('./src/routes/mensagemRoutes');
const registerEnterpriseRoute = require('./src/routes/registerEnterpriseRoute');
const registerUserRoute = require('./src/routes/registerUserRoute');

app.use('/api/conversa', conversaRoutes);
app.use('/api/mensagem', mensagemRoutes);
app.use('/api/empresa', registerEnterpriseRoute);
app.use('/api/user', registerUserRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
