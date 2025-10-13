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

module.exports = {
  validarNickNameParams,
  validarCrearUsuario
}

