const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware

// Rutas
router.get('/',verificarToken, usuariosController.obtenerUsuarios);          // GET todos los usuarios
router.post('/',verificarToken, usuariosController.crearUsuario);            // POST crear usuario
router.post('/:id',verificarToken, usuariosController.obtenerUsuarioPorId);   // ✅ GET usuario por ID (ESTA ES LA CLAVE)
router.post('/buscar/perfiles',verificarToken, usuariosController.buscarusuarioUbicacion);   // ✅ GET usuario por ID (ESTA ES LA CLAVE)

module.exports = router;