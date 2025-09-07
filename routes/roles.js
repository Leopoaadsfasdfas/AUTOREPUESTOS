// routes/menus.js
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

const menusController = require('../controllers/RolController');


// Crear
router.post('/', verificarToken, menusController.crearRoles);

// Actualizar (todo en body)
router.put('/', verificarToken, menusController.actualizarRoles);

// Borrar (soft por defecto; ?soft=0 para delete duro)
router.delete('/', verificarToken, menusController.eliminarRoles);

module.exports = router;
