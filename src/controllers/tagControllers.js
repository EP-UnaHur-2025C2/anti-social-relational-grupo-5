const { Tag } = require('../../db/models');

const obtenerTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los tags' });
    }
};


const obtenerTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ mensaje: 'Tag no encontrado' });
        }
        res.status(200).json(tag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el tag' });
    }
};


const crearTag = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ mensaje: 'El nombre del tag es requerido.' });
        }

        const [tag, creado] = await Tag.findOrCreate({
            where: { nombre: nombre.trim() }
        });

        if (creado) {
            return res.status(201).json({ mensaje: 'Tag creado exitosamente.', tag });
        } else {
            return res.status(200).json({ mensaje: 'Este tag ya existe.', tag });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

const actualizarTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ mensaje: 'Tag no encontrado para actualizar' });
        }

        tag.nombre = nombre;
        await tag.save();

        res.status(200).json({ mensaje: 'Tag actualizado correctamente', tag });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el tag' });
    }
};


const eliminarTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ mensaje: 'Tag no encontrado para eliminar' });
        }

        await tag.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el tag' });
    }
};


module.exports = {
    obtenerTags,
    obtenerTag,
    crearTag,
    actualizarTag,
    eliminarTag
};