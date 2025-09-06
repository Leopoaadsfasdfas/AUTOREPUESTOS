const express = require('express');
const router = express.Router();
const rolMenuController = require('../controllers/rolMenuOpcionesController');

const verificarToken = require('../middlewares/verificarToken');

router.post('/consultar',verificarToken, rolMenuController.consultarRolmenu);   // ✅ GET usuario por ID (ESTA ES LA CLAVE)
// Consultar permisos de un rol
router.post('/roles', verificarToken, rolMenuController.obtenerPermisosRol);
// Consultar rol 
router.post('/rolobtener', verificarToken, rolMenuController.obtenerRol);

// Actualizar (todo en body)
router.post('/registrar', verificarToken, rolMenuController.registrarRolMenu);

// Actualizar (todo en body)
router.post('/eliminar', verificarToken, rolMenuController.eliminarRolMenu);

module.exports = router;
