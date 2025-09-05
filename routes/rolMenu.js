// routes/rolMenu.js
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

const rolMenuController = require('../controllers/rolMenuController');

// Consultar permisos de un rol
router.post('/roles', verificarToken, rolMenuController.obtenerPermisosRol);

// Asignar/actualizar permiso por clave
router.post('/', verificarToken, rolMenuController.setPermisoByClave);

// Asignar/actualizar permiso por menu_id
router.put('/', verificarToken, rolMenuController.setPermiso);

// Eliminar permiso por clave (solo body)
router.delete('/', verificarToken, rolMenuController.eliminarPermisoByClave);

// Eliminar permiso por menu_id (solo body)
router.delete('/', verificarToken, rolMenuController.eliminarPermiso);

// (Opcional) Menú permitido de un usuario
router.get('/usuario', verificarToken, rolMenuController.menuPermitidoUsuario);

module.exports = router;
