'use strict';
const { date } = require('joi');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'nickName'
      })
      Comment.belongsTo(models.Post, {
        foreignKey: 'idPost'
      })
    }
  }
  Comment.init({
    idComentario:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaComentario: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visibilidad: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'idPost'
      }
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'nickName'
      }
    }

  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments'
  });
  return Comment;
};