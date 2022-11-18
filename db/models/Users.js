const { Model } = require('sequelize');

class Users extends Model {
  static associate(models) {
    this.hasMany(models.Todos, {
      as: 'todos',
      foreignKey: 'user_id'
    })
  }
}

function model(sequelize, DataTypes) {
  Users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false
  });

  return Users;
}

module.exports = model;
