const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Empresa = require('./Empresa');

const whatsapp_sessions = sequelize.define('whatsapp_sessions', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  empresa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Empresas',
          key: 'id'
      }
  },
  session_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  status: {
      type: DataTypes.STRING,
      defaultValue: 'DISCONNECTED'
  },
  qr_code: {
      type: DataTypes.TEXT,
      allowNull: true
  }
}, {
  tableName: 'whatsapp_sessions',  // Explicitamente define o nome da tabela
  timestamps: true,  // Habilita o controle de timestamps
  createdAt: 'created_at',  // Mapear a coluna 'created_at' para o campo 'createdAt' no modelo
  updatedAt: 'updated_at'   // Mapear a coluna 'updated_at' para o campo 'updatedAt' no modelo
});

module.exports = whatsapp_sessions;
