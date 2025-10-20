const { Post, User, Tag, Comment, Sequelize } = require("../../db/models");
const { Op } = Sequelize;

const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener posteos." });
  }
};

const obtenerPost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Lee el .env o usa 6 meses por defecto
    const mesesMaximos = parseInt(process.env.COMMENT_EXPIRATION_MONTHS, 10) || 6;

    // Calcula la fecha limite
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - mesesMaximos);

    // Modifica la consulta para que incluya Tags Y Comentarios filtrados
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Tag, 
        },
        {
          model: Comment,
          where: {
            // filtra por fecha
            fechaComentario: {
              [Op.gte]: fechaLimite 
            },
          },
          required: false, 
        },
      ],
    });

    if (!post) {
      res.status(400).json({ mensaje: "Posteo no encontrado." });
    }
    res.status(200).json(post);
  } catch (error) { 
    console.error(error); 
    res.status(500).json({ mensaje: "Error al obtener posteo.", error: error.message });
  }
};

const crearPost = async (req, res) => {
  try {
    const { descripcion, nickName } = req.body;
    const post = await Post.create({
      descripcion,
      nickName,
    });
    res.status(201).json(post);
  } catch {
    res.status(500).json({ mensaje: "Error al crear posteo." });
  }
};

const actualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    const post = await Post.findByPk(id);
    if (!post)
      return res.status(404).json({ message: "Posteo no encontrado." });
    await Post.update(
      {
        descripcion,
      },
      {
        where: {
          idPost: post.idPost,
        },
      }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el posteo." });
  }
};

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post)
      return res.status(404).json({ mensaje: "Posteo no encontrado." });
    await Post.destroy({
      where: {
        idPost: post.idPost,
      },
    });
    res.status(204).json({ message: "Post eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el posteo." });
  }
};

const obtenerPosteosDeUsuario = async (req, res) => {
  try {
    const usuarioNickName = req.params.idNickName;
    const usuario = await User.findByPk(usuarioNickName, {
      attributes: ["nickName", "nombre", "apellido"],
      include: [
        {
          model: Post,
          attributes: ["idPost", "fechaPublicacion", "descripcion"],
        },
      ],
    });
    if (!usuario)
      return res.status(404).json({ mensaje: `usuario: ${usuarioNickName} no encontrado` });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener posteos del usuario.` });
  }
};

const asociarTags = async (req, res) => {
  try {
    const { id } = req.params;
    const { idTag } = req.body;

    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ mensaje: "Post no encontrado" });

    await post.setTags(idTag);
    const postConTags = await Post.findByPk(id, { include: Tag });
    res.status(200).json(postConTags);
  } catch (error) {
    res.status(500).json({ message: "Error al asociar tags"});
  }
};

const quitarTagDelPost = async (req, res) => {
  try {
    const { id, idTag } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ mensaje: 'Post no encontrado' });

    await post.removeTag(idTag); 
    const postConTags = await Post.findByPk(id, { include: Tag });
    res.status(200).json(postConTags);
  } catch (error) {
    res.status(500).json({ message: 'Error al quitar tag del post'});
  }
};

module.exports = {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost,
  obtenerPosteosDeUsuario,
  asociarTags,
  quitarTagDelPost
};
