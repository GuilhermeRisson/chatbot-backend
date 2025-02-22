const Empresa = require('../models/Empresa');


exports.registerNew = async (req, res) => {
    const { nome, cnpj_cpf, email, telefone } = req.body;

    if (!nome || !cnpj_cpf || !email || !telefone) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios!'
        });
    }

    try {
        const empresaExistente = await Empresa.findOne({
            where: { cnpj_cpf: cnpj_cpf }
        });

        if (empresaExistente) {
            return res.status(400).json({
                mensagem: 'Já existe uma empresa registrada com este CNPJ.'
            });
        }
        
        const novaEmpresa = await Empresa.create({
            nome,
            cnpj_cpf,
            email,
            telefone,
        });

        return res.status(201).json({
            mensagem: 'Empresa registrada com sucesso!',
            empresa: novaEmpresa
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: 'Ocorreu um erro ao registrar a empresa.',
            erro: error.message
        });
    }
};
