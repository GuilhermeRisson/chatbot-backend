const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Empresa = require('./Empresa');

const Interacao = sequelize.define('Interacao', {
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
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    tipo_interacao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resposta: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_interacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Relacionamentos
Interacao.belongsTo(Empresa, { foreignKey: 'empresa_id' });
Interacao.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Interacao;
