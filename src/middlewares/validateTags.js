const Joi = require('joi');

const crearTagSchema = Joi.object({
  nombre: Joi.string().trim().min(2).max(25).required()
});

const validarCrearTag = (req, res, next) => {
  const { error } = crearTagSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: "Error de validación al crear el tag",
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  validarCrearTag
};