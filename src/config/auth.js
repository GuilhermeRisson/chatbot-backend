module.exports = {
    secret: process.env.JWT_SECRET || 'sua_chave_secreta_padrao',
    expiresIn: '24' // Token expira em 1 dia
}; 