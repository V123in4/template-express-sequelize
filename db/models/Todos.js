const { Model } = require('sequelize');

class Todos extends Model {
  static associate(model) {
    this.belongsTo(model.Users, {
      as: 'users',
      foreignKey: 'user_id',
    });
  }
}

function model(sequelize, DataTypes) {
  Todos.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'user_id'
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Todos',
    tableName: 'todos',
    timestamps: false
  });

  return Todos;
}

module.exports = model;
