const Usuario = require('../models/Usuario');
// const bcrypt = require('bcryptjs');


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

        return res.status(201).json({
            mensagem: 'Novo usuario registrado com sucesso!',
            usuario: novoUsuario
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: 'Ocorreu um erro ao registrar o usuario.',
            erro: error.message
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

