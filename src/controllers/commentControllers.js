const { where } = require('sequelize');
const { Comment, User } = require('../../db/models');

const obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await Comment.findAll();
    res.status(200).json(comentarios);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ mensaje: 'Error al obtener comentarios' });
  }
}

const obtenerComentario = async (req, res) => {
  try {
    const { idComment } = req.params;
    const comentario = await Comment.findByPk(idComment);
    if (!comentario) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.status(200).json(comentario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener comentario' });
  }
}

const crearComentario = async (req, res) => {
  try {
    const { contenido, idPost, nickName } = req.body;
    const comentario = await Comment.create({
      contenido,
      idPost,
      nickName,
      fechaComentario: new Date() 
    });
    res.status(201).json(comentario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear comentario' });
  }
}

const modificarComentario = async (req, res) => {
  try {
    const { idComment } = req.params;
    const { contenido } = req.body;
    const comentario = await Comment.findByPk(idComment);
    if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' });
    comentario.contenido = contenido;
    await comentario.save();
    res.status(200).json(comentario); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al modificar el comentario" });
  }
}

const eliminarComentario = async (req, res) => {
  try {
    const { idComment } = req.params;
    const comentario = await Comment.findByPk(idComment);
    if (!comentario) return res.status(404).json({ mensaje: 'Comentario no encontrado' }); 
    await comentario.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar comentario.' });
  }
}

const obtenerComentariosDeUsuario = async(req, res) => {
  try {
    const usuarioNickName = req.params.idNickName;
    const comentariosDeUsuario = await User.findByPk(usuarioNickName, {
      attributes: ['nickName', 'nombre', 'apellido'],
      include: [
        {
          model: Comment,
          attributes: ['idComentario','contenido', 'fechaComentario']
        }
      ]
    });

    if(!comentariosDeUsuario) return res.status(404).json({mensaje: `Usuario ${usuarioNickName} no encontrado`})
    res.status(200).json(comentariosDeUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      mensaje: `Error al obtener comentarios del usuario.`
    });    
  }
}

module.exports = {
  obtenerComentarios,
  obtenerComentario,
  crearComentario,
  modificarComentario,
  eliminarComentario,
  obtenerComentariosDeUsuario
}