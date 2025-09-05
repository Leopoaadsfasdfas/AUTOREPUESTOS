// routes/rolMenu.js
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

const rolMenuController = require('../controllers/rolMenuController');

// Consultar permisos de un rol
router.post('/roles', verificarToken, rolMenuController.obtenerPermisosRol);
// Consultar rol 
router.post('/rolobtener', verificarToken, rolMenuController.obtenerRol);

// Actualizar (todo en body)
router.post('/registrar', verificarToken, rolMenuController.registrarRolMenú);

module.exports = router;
