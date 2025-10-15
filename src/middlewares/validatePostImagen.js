const Joi = require('joi');

const crearPostImagenSchema = Joi.object({
  url: Joi.string().uri().required(),
  idPost: Joi.number().integer().positive().required()
});

const validarCrearPostImagen = (req, res, next) => {
  const { error } = crearPostImagenSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Error de validación al asociar la imagen",
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  validarCrearPostImagen
};