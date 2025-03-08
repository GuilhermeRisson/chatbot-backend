require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const initWpp = require('./src/config/wppconnect');

// initWpp();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001' // URL do seu frontend
}));

const conversaRoutes = require('./src/routes/conversaRoutes');
const mensagemRoutes = require('./src/routes/mensagemRoutes');
const registerEnterpriseRoute = require('./src/routes/registerEnterpriseRoute');
const registerUserRoute = require('./src/routes/registerUserRoute');
const whatsappRoutes = require('./src/routes/whatsapp.routes');

app.use('/api/conversa', conversaRoutes);
app.use('/api/mensagem', mensagemRoutes);
app.use('/api/empresa', registerEnterpriseRoute);
app.use('/api/user', registerUserRoute);
app.use('/api/whatsapp', whatsappRoutes);

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
