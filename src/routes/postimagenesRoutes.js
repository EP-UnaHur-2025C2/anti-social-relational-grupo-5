const { Router } = require('express');
const router = Router();

const postimagenesController = require('../controllers/postimagenesControllers');

router.get('/', postimagenesController.obtenerPostsimagenes),
router.get('/:id', postimagenesController.obtenerPostimagen);
router.post('/', postimagenesController.crearPostimagen);
router.put('/:id', postimagenesController.actualizarPostimagen);
router.delete('/:id', postimagenesController.eliminarPostimagen);

module.exports = router