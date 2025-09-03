const express = require('express');
const router = express.Router();
const perfil_usuario = require('../controllers/perfil_usuarioController');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware

// Rutas protegidas con verificación de token
router.post('/',verificarToken, perfil_usuario.obtenerPerfilPorCorreo);
router.post('/crear',verificarToken, perfil_usuario.crearPerfil);
router.post('/modificar',verificarToken, perfil_usuario.actualizarPerfil);

module.exports = router;