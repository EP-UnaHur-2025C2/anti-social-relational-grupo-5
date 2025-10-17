const { where } = require('sequelize');
const { Comment } = require('../../db/models');

const obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await Comment.findAll();
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener comentarios' })
  }
}

const obtenerComentario = async (req, res) => {
  try {
    const { idComment } = req.params;
    const comentario = await Comment.findByPk(idComment);
    if (!comentario) return res.status(400).json({ mensaje: 'Comentario no encontrado' });
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener comentario' });
  }
}

const crearComentario = async (req, res) => {
  try {
    const { contenido, idPost, nickName } = req.body;
    const comentario = await Comment.create({
      contenido,
      idPost,
      nickName
    });
    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear comentario' })
  }
}

const modificarComentario = async (req, res) => {
  try {
    const { idComment } = req.params;
    const { contenido } = req.body;
    const comentario = await Comment.findByPk(idComment);
    if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' });
    await Comment.update(
      {
        contenido
      },
      {
        where: {
          idComentario: comentario.idComentario
        }
      }
    );
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ message: "Error al modificar el comentario" });
  }
}

const eliminarComentario = async (req, res) => {
  try {
    const { idComment } = req.params;
    const comentario = await Comment.findByPk(idComment);
    if (!comentario) return res.status(400).json({ mensaje: 'Comentario no encontrado' });
    await Comment.destroy({
      where:{
        idComentario: comentario.idComentario
      }
    });
    res.status(204).json({mensaje: 'Comentario eliminado correctamente.'});
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar comentario.' });
  }
}

module.exports = {
  obtenerComentarios,
  obtenerComentario,
  crearComentario,
  modificarComentario,
  eliminarComentario
}