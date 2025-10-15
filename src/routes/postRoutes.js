const { Router } = require('express');
const router = Router();

const postController = require('../controllers/postControllers');

const { validarPostId, validarCrearPost, validarActualizarPost } = require('../middlewares/validatePost');

router.get('/', postController.obtenerPosts);
router.get('/:id', validarPostId, postController.obtenerPost);
router.post('/', validarCrearPost, postController.crearPost);
router.put('/:id', validarPostId, validarActualizarPost, postController.actualizarPost);
router.delete('/:id', validarPostId, postController.eliminarPost);


module.exports = router;