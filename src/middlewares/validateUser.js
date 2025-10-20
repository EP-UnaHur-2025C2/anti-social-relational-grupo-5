const Joi = require('joi')
//Esquemas
const nickNameSchema = Joi.object({
  idNickName: Joi.string().alphanum().trim(false).min(5).max(15)
})

const crearUsuarioSchema = Joi.object({
  nickName: Joi.string().alphanum().trim(false).min(5).max(15),
  nombre: Joi.string().trim(false).required(),
  apellido: Joi.string().trim(false).required()
})

const crearPostUsuarioSchema = Joi.object({
  descripcion: Joi.string().min(5).max(250).required(),
  tagName: Joi.string().min(1).max(20).trim(),
  url: Joi.string()
})

//Validaciones
const validarNickNameParams = (req, res, next) => {
  const { error } = nickNameSchema.validate(req.params);
  if(error){
    return res.status(400).json({
      msg: "Error de validacion", 
      message: error.details[0].message})
  };
  next();
}

const validarCrearUsuario = (req, res, next) => {
  const { error, value } = crearUsuarioSchema.validate(req.body);
  if(error){
    return res.status(400).json({msg: "Error de validacion", message: error.details[0].message})
  }
  next();
}

const validarCrearUserPost = (req, res, next) => {
  const { error, value } = crearPostUsuarioSchema.validate(req.body);
  if(error){
    return res.status(400).json({msg: "Error de validacion", message: error.details[0].message})
  }
  req.body = value
  next();
}



module.exports = {
  validarNickNameParams,
  validarCrearUsuario,
  validarCrearUserPost
}

