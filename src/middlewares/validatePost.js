const Joi = require('joi');

const postIdSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});

const crearPostSchema = Joi.object({
  descripcion: Joi.string().trim().min(1).max(280).required(),
  nickName: Joi.string().alphanum().min(5).max(15).required()
});

const actualizarPostSchema = Joi.object({
  descripcion: Joi.string().trim().min(1).max(280).required()
});

const validarPostId = (req, res, next) => {
  const { error } = postIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({
      msg: "Error de validación en el ID del post",
      message: error.details[0].message
    });
  }
  next();
};

const validarCrearPost = (req, res, next) => {
  const { error } = crearPostSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      msg: "Error de validación al crear el post",
      message: error.details[0].message
    });
  }
  next();
};

const validarActualizarPost = (req, res, next) => {
  const { error } = actualizarPostSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      msg: "Error de validación al actualizar el post",
      message: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validarPostId,
  validarCrearPost,
  validarActualizarPost
};