const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Empresa = require('./Empresa');

const Mensagem = sequelize.define('Mensagem', {
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
    tipo: {
        type: DataTypes.ENUM('entrada', 'saída'),
        allowNull: false
    },
    conteudo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_envio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Relacionamentos
Mensagem.belongsTo(Empresa, { foreignKey: 'empresa_id' });
Mensagem.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Mensagem;
