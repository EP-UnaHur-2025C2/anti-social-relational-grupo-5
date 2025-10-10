const {User} = require('../../db/models')

//onst db = require('../../db/models')
//const serie = db.serie

const obtenerUsuarios = async(req,res)=>{
    try{
        const usuarios = await User.findAll()
        res.status(200).json(usuarios)
    }catch{
        res.status(500).json({mensaje: 'Error al obtener usuarios'})
    }
}

const obtenerUsuario = async(req,res)=>{
    try{
        const id = req.params.id    
        const usuario = await User.findByPk(id)
        if(!usuario){
            res.status(400).json({mensaje: 'Usuario no encontrado'})
        }
        res.status(200).json(usuario)
    }catch{
        res.status(500).json({mensaje: 'Error al obtener usuario'})
    }
}

const crearUsuario = async(req,res)=>{
    try{
        const {nickName, nombre, apellido}= req.body 
        const usuario = await User.create({
            nickName,
            nombre,
            apellido
        })
        res.status(201).json(usuario)
    }catch{
        res.status(500).json({mensaje: 'Error al obtener usuario'})
    }
}

module.exports = {
    obtenerUsuario,
    obtenerUsuarios,
    crearUsuario
}