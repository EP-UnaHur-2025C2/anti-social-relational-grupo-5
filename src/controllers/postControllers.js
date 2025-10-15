const { Post } = require('../../db/models')


const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.status(200).json(posts)
  } catch {
    res.status(500).json({ mensaje: 'Error al obtener posteos' })
  }
}

const obtenerPost = async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findByPk(postId)
    if (!post) {
      res.status(400).json({ mensaje: 'Posteo no encontrado' })
    }
    res.status(200).json(post)
  } catch {
    res.status(500).json({ mensaje: 'Error al obtener posteo' })
  }
}

const crearPost = async (req, res) => {
  try {
    const { descripcion, nickName } = req.body
    const post = await Post.create({
      descripcion,
      nickName
    })
    res.status(201).json(post)
  } catch {
    res.status(500).json({ mensaje: 'Error al crear posteo' })
  }
}

const actualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Posteo no encontrado' });
    await Post.update(
      {
        descripcion
      },
      {
        where: {
          idPost: post.idPost
        }
      }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al sctualizar el posteo" })
  }
}

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Posteo no encontrado' });
    await Post.destroy({
      where: {
        idPost: post.idPost
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el posteo" })
  }
}

module.exports = {
  obtenerPosts,
  obtenerPost,
  crearPost,
  actualizarPost,
  eliminarPost
}