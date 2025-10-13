const { Router } = require('express');
const router = Router();

const userController = require('../controllers/userControllers');

router.get('/', userController.obtenerUsuarios );
router.get('/:idNickName', userController.obtenerUsuario);
router.post('/', userController.crearUsuario); //Validar los campos para crear el usuairo(nickName sobre todo)
router.put('/:idNickName', userController.actualizarUsuario);
router.delete('/:idNickName', userController.eliminarUsuario);
//Validar los idNickName
module.exports = router