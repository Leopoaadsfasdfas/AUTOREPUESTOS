const express = require('express');
const router = express.Router();
const subcategoriaController = require('../controllers/subcategoriaControlle');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware

// Rutas
// Buscar subcategorías por categoría + nombre similar
router.post('/buscarporcategoria',verificarToken, subcategoriaController.buscarPorCategoria);
router.post('/buscarpornombre',verificarToken, subcategoriaController.buscarSubcategoria);
router.post('/crear',verificarToken, subcategoriaController.crearSubcategoria);

module.exports = router;