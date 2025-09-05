const express = require('express');
const router = express.Router();
const usuariospermisosController = require('../controllers/usuariospermisoMenúController');

const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware

//router.post('/buscar/perfiles',verificarToken, usuariosController.buscarusuarioUbicacion);   // ✅ GET usuario por ID (ESTA ES LA CLAVE)
router.post('/',verificarToken, usuariospermisosController.permisos);   // ✅ GET usuario por ID (ESTA ES LA CLAVE)
router.post('/asignacionusuario',verificarToken, usuariospermisosController.usuarioRolinsert);   // ✅ GET usuario por ID (ESTA ES LA CLAVE)

module.exports = router;