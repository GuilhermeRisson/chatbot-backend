const bcrypt = require('bcryptjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Empresa = require('./Empresa');

const Usuario = sequelize.define('Usuario', {
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
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true
    },
    data_cadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'ativo'
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    hooks: {
        beforeSave: async (usuario, options) => {
            if (usuario.password) {
                const salt = await bcrypt.genSalt(10)
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        }
    }
});

Usuario.belongsTo(Empresa, { foreignKey: 'empresa_id' });

module.exports = Usuario;
