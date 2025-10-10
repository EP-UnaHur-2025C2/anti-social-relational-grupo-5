'use strict';
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
    fechaComentario: DataTypes.DATE,
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visibilidad: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fkIdPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Post',
        key: 'idPost'
      }
    },
    fkNickName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: 'User',
        key: 'nickName'
      }
    }

  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};