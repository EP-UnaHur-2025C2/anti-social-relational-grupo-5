const { where } = require('sequelize')
const { User } = require('../../db/models')


const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findAll()
        res.status(200).json(usuarios)
    } catch {
        res.status(500).json({ mensaje: 'Error al obtener usuarios' })
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const idNickName = req.params.idNickName
        const usuario = await User.findByPk(idNickName)
        if (!usuario) {
            res.status(400).json({ mensaje: 'Usuario no encontrado' })
        }
        res.status(200).json(usuario)
    } catch {
        res.status(500).json({ mensaje: 'Error al obtener usuario' })
    }
}

const crearUsuario = async (req, res) => {
    try {
        const { nickName, nombre, apellido } = req.body
        const usuario = await User.create({
            nickName,
            nombre,
            apellido
        })
        res.status(201).json(usuario)
    } catch {
        res.status(500).json({ mensaje: 'Error al obtener usuario' })
    }
}

const actualizarUsuario = async (req, res) => {
    try {
        const { idNickName } = req.params;
        const { nickName, nombre, apellido } = req.body;
        const usuario = await User.findByPk(idNickName);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        await User.update(
            { 
                nickName, 
                nombre, 
                apellido 
            },
            {
                where: {
                    nickName: usuario.nickName
                }
            }
            );
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error al sctualizar el usuario" })
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const { idNickName } = req.params;
        const usuario = await User.findByPk(idNickName);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        await User.destroy({
            where: {
                nickName: usuario.nickName
            }
        });
        res.status(204).send();
    } catch (error) {

        res.status(500).json({ message: "Error al eliminar el usuario", error: {error} })
    }
}

module.exports = {
    obtenerUsuario,
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}