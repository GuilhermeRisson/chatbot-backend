const Empresa = require('../models/Empresa');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs');
const { UniqueConstraintError, ValidationError } = require('sequelize');

exports.registerNew = async (req, res) => {
    const { nome, cnpj_cpf, email, telefone, password } = req.body;

    if (!nome || !cnpj_cpf || !email || !telefone || !password) {
        return res.status(400).json({
            status: 'error',
            mensagem: 'Todos os campos são obrigatórios!'
        });
    }

    try {
        // Verifica CNPJ/CPF duplicado
        const empresaExistente = await Empresa.findOne({
            where: { cnpj_cpf: cnpj_cpf }
        });

        if (empresaExistente) {
            return res.status(400).json({
                status: 'error',
                mensagem: 'Já existe uma empresa registrada com este CNPJ/CPF.',
                campo: 'cnpj_cpf'
            });
        }

        // Verifica email duplicado
        const usuarioExistenteEmail = await Usuario.findOne({
            where: { login: email }
        });

        if (usuarioExistenteEmail) {
            return res.status(400).json({
                status: 'error',
                mensagem: 'Este email já está em uso.',
                campo: 'email'
            });
        }

        // Verifica telefone duplicado
        const usuarioExistenteTelefone = await Usuario.findOne({
            where: { numero: telefone }
        });

        if (usuarioExistenteTelefone) {
            return res.status(400).json({
                status: 'error',
                mensagem: 'Este número de telefone já está em uso.',
                campo: 'telefone'
            });
        }
        
        const novaEmpresa = await Empresa.create({
            nome,
            cnpj_cpf,
            email,
            telefone,
        });

        const novoUsuario = await Usuario.create({
            nome: nome,
            login: email,
            password: password,
            empresa_id: novaEmpresa.id,
            numero: telefone 
        });

        const token = jwt.sign({ id: novoUsuario.id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        });

        return res.status(201).json({
            status: 'success',
            mensagem: 'Empresa registrada com sucesso!',
            empresa: novaEmpresa,
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.login
            },
            token
        });

    } catch (error) {
        console.error('Erro ao registrar empresa:', error);

        if (error instanceof UniqueConstraintError) {
            const campo = error.fields[0];
            let mensagem = 'Este campo já está em uso.';
            
            // Mensagens específicas para cada tipo de campo único
            if (campo === 'cnpj_cpf') {
                mensagem = 'Este CNPJ/CPF já está em uso.';
            } else if (campo === 'login') {
                mensagem = 'Este email já está em uso.';
            } else if (campo === 'numero') {
                mensagem = 'Este número de telefone já está em uso.';
            }

            return res.status(400).json({
                status: 'error',
                mensagem,
                campo: campo === 'login' ? 'email' : campo === 'numero' ? 'telefone' : campo
            });
        }

        if (error instanceof ValidationError) {
            // Erro de validação do Sequelize
            return res.status(400).json({
                status: 'error',
                mensagem: 'Erro de validação dos dados.',
                erros: error.errors.map(err => ({
                    campo: err.path,
                    mensagem: err.message
                }))
            });
        }

        // Erro genérico
        return res.status(500).json({
            status: 'error',
            mensagem: 'Ocorreu um erro ao registrar a empresa.',
            erro: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor'
        });
    }
};
