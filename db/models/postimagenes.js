'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postImagenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      postImagenes.belongsTo(models.Post, {
        foreignKey: 'idPost',
      })
    }
  }
  postImagenes.init({
    idImagen:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idPost:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:
      {
        model: 'Post',
        key: 'idPost'
      }
    }
  }, {
    sequelize,
    modelName: 'postImagenes',
    tableName: 'postImagenes'
  });
  return postImagenes;
};