const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware

// Rutas
// Ruta para buscar categorías por texto con LIKE
router.post('/categorias',verificarToken, categoriaController.buscarCategorias);
// Crear categorías
router.post('/categorias/crear',verificarToken, categoriaController.crearCategoria);
 
module.exports = router;