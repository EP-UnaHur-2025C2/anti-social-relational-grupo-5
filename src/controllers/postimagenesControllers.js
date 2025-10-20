const { postImagenes } = require('../../db/models')


const obtenerPostsimagenes = async (req, res) => {
  try {
    const Imagen = await postImagenes.findAll()
    res.status(200).json(Imagen)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener imagen' })
  }
}

const obtenerPostimagen = async (req, res) => {
  try {
    const ImagenId = req.params.id
    const Imagen = await postImagenes.findByPk(ImagenId)
    if (!Imagen) {
      res.status(400).json({ mensaje: 'Imagen no encontrada' })
    }
    res.status(200).json(Imagen)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener imagen' })
  }
}

const crearPostimagen = async (req, res) => {
  try {
    const { url, idPost } = req.body
    const imagen = await postImagenes.create({
      url,
      idPost
    })
    res.status(201).json(imagen)
  } catch(error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear imagen' })
  }
}

const actualizarPostimagen = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;
    const imagen = await postImagenes.findByPk(id);
    if (!imagen) return res.status(404).json({ message: 'Imagen no encontrada' });
    await Post.update(
      {
        url
      },
      {
        where: {
          idImagen: postImagenes.idImagen
        }
      }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al sctualizar la imagen" })
  }
}

const eliminarPostimagen = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await postImagenes.findByPk(id);
    if (!imagen) return res.status(404).json({ error: 'Imagen no encontrada' });
    await postImagenes.destroy({
      where: {
        idPost: postImagenes.idPost
      }
    });
    res.status(204).json({ mensaje: "Imagen eliminada correctamente"});
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen" })
  }
}

module.exports = {
  obtenerPostsimagenes,
  obtenerPostimagen,
  crearPostimagen,
  actualizarPostimagen,
  eliminarPostimagen
}