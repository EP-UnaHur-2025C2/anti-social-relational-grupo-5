const { Router } = require('express');
const router = Router();

const commentController = require('../controllers/commentControllers');

//importar validaciones

router.get('/', commentController.obtenerComentarios);
router.get('/:idComment', commentController.obtenerComentario);
router.post('/', commentController.crearComentario); 
router.put('/:idComment', commentController.modificarComentario);
router.delete('/:idComment', commentController.eliminarComentario);

module.exports = router