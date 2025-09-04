// routes/menus.js
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');

const menusController = require('../controllers/menuController');

// Listar / obtener uno (query ?id= &activo=)
router.get('/', verificarToken, menusController.obtenerMenus);

// Crear
router.post('/', verificarToken, menusController.crearMenu);

// Actualizar
router.put('/:id', verificarToken, menusController.actualizarMenu);

// Borrar (soft por defecto; ?soft=0 para delete duro)
router.delete('/:id', verificarToken, menusController.eliminarMenu);

// Restaurar (activo=1)
router.post('/:id/restore', verificarToken, menusController.restaurarMenu);

module.exports = router;
