// routes/menus.js
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

const menusController = require('../controllers/menuController');

// Listar / obtener uno (query ?id= &activo=)
router.post('/all', verificarToken, menusController.obtenerMenus);

// Crear
router.post('/', verificarToken, menusController.crearMenu);

// Actualizar (todo en body)
router.put('/', verificarToken, menusController.actualizarMenu);

// Borrar (soft por defecto; ?soft=0 para delete duro)
router.delete('/', verificarToken, menusController.eliminarMenu);

module.exports = router;
