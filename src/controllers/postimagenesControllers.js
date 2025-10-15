const { PostImagenes } = require('../../db/models')


const obtenerPostsimagenes = async (req, res) => {
  try {
    const Imagen = await PostImagenes.findAll()
    res.status(200).json(Imagen)
  } catch {
    res.status(500).json({ mensaje: 'Error al obtener imagen' })
  }
}

const obtenerPostimagen = async (req, res) => {
  try {
    const ImagenId = req.params.id
    const Imagen = await PostImagenes.findByPk(ImagenId)
    if (!Imagen) {
      res.status(400).json({ mensaje: 'Imagen no encontrado' })
    }
    res.status(200).json(Imagen)
  } catch {
    res.status(500).json({ mensaje: 'Error al obtener imagen' })
  }
}

const crearPostimagen = async (req, res) => {
  try {
    const { url, idPost } = req.body
    const imagen = await PostImagenes.create({
      url,
      idPost
    })
    res.status(201).json(PostImagenes)
  } catch {
    res.status(500).json({ mensaje: 'Error al crear imagen' })
  }
}

const actualizarPostimagen = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;
    const imagen = await PostImagenes.findByPk(id);
    if (!imagen) return res.status(404).json({ message: 'Imagen no encontrado' });
    await Post.update(
      {
        url
      },
      {
        where: {
          idImagen: PostImagenes.idImagen
        }
      }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al sctualizar el imagen" })
  }
}

const eliminarPostimagen = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await PostImagenes.findByPk(id);
    if (!imagen) return res.status(404).json({ error: 'Imagen no encontrado' });
    await PostImagenes.destroy({
      where: {
        idPost: PostImagenes.idPost
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el imagen" })
  }
}

module.exports = {
  obtenerPostsimagenes,
  obtenerPostimagen,
  crearPostimagen,
  actualizarPostimagen,
  eliminarPostimagen
}