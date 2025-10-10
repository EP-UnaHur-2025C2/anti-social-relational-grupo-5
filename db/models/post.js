'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'nickName'
      })
      Post.hasMany(models.Comment)
      Post.hasMany(models.postImagenes)
      Post.belongsToMany(models.Tag, {
        through: 'Asigna'
      })
    }
  }
  Post.init({
    idPost: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaPublicacion: DataTypes.DATE,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};