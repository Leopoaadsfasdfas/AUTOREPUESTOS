// routes/rolMenu.js
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

const rolMenuController = require('../controllers/rolMenuController');

// Consultar permisos de un rol (solo visibles con ?onlyViewable=1)
router.get('/roles/:rolId/permisos', verificarToken, rolMenuController.obtenerPermisosRol);

// Asignar/actualizar permiso por clave
router.post('/roles/:rolId/permisos/by-clave', verificarToken, rolMenuController.setPermisoByClave);

// Asignar/actualizar permiso por menu_id
router.post('/roles/:rolId/permisos', verificarToken, rolMenuController.setPermiso);

// Eliminar permiso por clave
router.delete('/roles/:rolId/permisos/by-clave/:clave', verificarToken, rolMenuController.eliminarPermisoByClave);

// Eliminar permiso por menu_id
router.delete('/roles/:rolId/permisos/:menuId', verificarToken, rolMenuController.eliminarPermiso);

// (Opcional) Menú permitido de un usuario
router.get('/permisos/usuario/:idUsuario', verificarToken, rolMenuController.menuPermitidoUsuario);

module.exports = router;
