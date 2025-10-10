const { Router } = require('express');
const router = Router();

const userController = require('../controllers/userControllers');

router.get('/', userController.obtenerUsuarios );
router.get('/:nickName', userController.obtenerUsuario);
router.post('/', userController.crearUsuario);
// router.put('/', );
// router.delete('/', );

module.exports = router