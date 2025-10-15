const Joi = require('joi');


const crearComentarioSchema = Joi.object({
  contenido: Joi.string().trim().min(1).max(150).required(),
  nickName: Joi.string().alphanum().min(5).max(15).required(),
  idPost: Joi.number().integer().positive().required()
});


const validarCrearComentario = (req, res, next) => {
  const { error } = crearComentarioSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Error de validación al crear el comentario",
      message: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validarCrearComentario
};