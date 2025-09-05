// routes/rolMenu.js
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

const rolMenuController = require('../controllers/rolMenuController');
router.post('/',verificarToken, usuariospermisosController.consultarRolmenu);   // ✅ GET usuario por ID (ESTA ES LA CLAVE)
// Consultar permisos de un rol
router.post('/roles', verificarToken, rolMenuController.obtenerPermisosRol);
// Consultar rol 
router.post('/rolobtener', verificarToken, rolMenuController.obtenerRol);

// Actualizar (todo en body)
router.post('/registrar', verificarToken, rolMenuController.registrarRolMenu);
// Actualizar (todo en body)
router.post('/actualizar', verificarToken, rolMenuController.actualizarRolMenu);

// Actualizar (todo en body)
router.post('/eliminar', verificarToken, rolMenuController.eliminarRolMenu);

module.exports = router;
