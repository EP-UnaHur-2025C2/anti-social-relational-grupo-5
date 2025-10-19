const { Router } = require('express');
const router = Router();

const userController = require('../controllers/userControllers');
const { obtenerPosteosDeUsuario } = require('../controllers/postControllers');
const { obtenerComentariosDeUsuario } = require('../controllers/commentControllers');

const { validarNickNameParams, validarCrearUsuario } = require('../middlewares/validateUser')

router.get('/', userController.obtenerUsuarios );
router.get('/:idNickName', validarNickNameParams, userController.obtenerUsuario);
router.post('/', validarCrearUsuario, userController.crearUsuario); //Validar los campos para crear el usuairo(nickName sobre todo)
router.put('/:idNickName', validarNickNameParams, userController.actualizarUsuario);
router.delete('/:idNickName', validarNickNameParams, userController.eliminarUsuario);

router.get('/:idNickName/posts', validarNickNameParams, obtenerPosteosDeUsuario );
router.get('/:idNickName/comments', validarNickNameParams, obtenerComentariosDeUsuario );
//Validar los idNickName
module.exports = router