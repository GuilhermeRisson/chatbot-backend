const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empresa = require('./Empresa');

const Configuracao = sequelize.define('Configuracao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Empresa,
            key: 'id'
        }
    },
    chave: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Relacionamento
Configuracao.belongsTo(Empresa, { foreignKey: 'empresa_id' });

module.exports = Configuracao;
