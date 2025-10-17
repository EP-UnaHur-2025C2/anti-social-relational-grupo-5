const { Router } = require('express');
const router = Router();

const tagController = require('../controllers/tagControllers');

router.get('/', tagController.obtenerTags);
router.get('/:id', tagController.obtenerTag);
router.post('/', tagController.crearTag);
router.put('/:id', tagController.actualizarTag);
router.delete('/:id', tagController.eliminarTag);


module.exports = router;