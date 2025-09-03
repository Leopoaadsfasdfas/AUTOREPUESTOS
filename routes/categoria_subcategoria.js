const express = require('express');
const router = express.Router();
const categoria_subcategoria = require('../controllers/categoria_subcategoriaController');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware

// Rutas
router.post('/',verificarToken, categoria_subcategoria.obtenerSubcategoriasPorCategoria);          // GET todos los usuarios
router.post('/crear',verificarToken, categoria_subcategoria.crearRelacionCategoriaSubcategoria);            // POST crear usuario

module.exports = router;