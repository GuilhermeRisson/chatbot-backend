const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs');


exports.registerNew = async (req, res) => {
    const {nome, login ,password, empresa_id,numero} = req.body;

    if (!nome, !login, !password) {
        return res.status(400).json({
            mensagem: 'Os campos com * são obrigatórios!'
        });
    }

    try {

        const usuarioExistente = await Usuario.findOne({
            where: { nome: nome, empresa_id: empresa_id}
        });

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: 'Já existe um usuario registrado com este Nome.'
            });
        }
        
        const novoUsuario = await Usuario.create({
            nome,
            login,
            password,
            empresa_id,
            numero 
        });

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          });

        return res.status(201).json({
            mensagem: 'Novo usuario registrado com sucesso!',
            usuario: novoUsuario,
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: 'Ocorreu um erro ao registrar o usuario.',
            erro: error.message
        });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            status: 'error',
            mensagem: 'Email e senha são obrigatórios'
        });
    }

    try {
        const usuario = await Usuario.findOne({ 
            where: { login: email }
        });
        
        if (!usuario) {
            return res.status(401).json({
                status: 'error',
                mensagem: 'Email ou senha inválidos',
                campo: 'email'
            });
        }

        const senhaValida = await bcrypt.compare(password, usuario.password);
        
        if (!senhaValida) {
            return res.status(401).json({
                status: 'error',
                mensagem: 'Email ou senha inválidos',
                campo: 'password'
            });
        }

        const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        });

        return res.json({
            status: 'success',
            token,
            usuario
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        
        return res.status(500).json({
            status: 'error',
            mensagem: 'Erro ao realizar login',
            erro: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor'
        });
    }
};

// const autenticarUsuario = async (login, senha) => {
//     try {
//         const usuario = await Usuario.findOne({
//             where: { login }
//         });

//         if (!usuario) {
//             return { mensagem: 'Usuário não encontrado' };
//         }
        
//         const senhaValida = await bcrypt.compare(senha, usuario.password);

//         if (!senhaValida) {
//             return { mensagem: 'Senha incorreta' };
//         }

//         return { mensagem: 'Autenticação bem-sucedida', usuario };
//     } catch (error) {
//         console.error(error);
//         return { mensagem: 'Erro ao autenticar usuário', erro: error.message };
//     }
// };

