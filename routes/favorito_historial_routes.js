const express = require('express');
const router = express.Router();
const historial_favoritoController = require('../controllers/favorito_historialController');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware

// Rutas
// Ruta para insertarlog_busqueda_historial
router.post('/log_busqueda',verificarToken, historial_favoritoController.insertar_log_busqueda);
// Crear categorías
router.post('/historial_busqueda',verificarToken, historial_favoritoController.insertar_favorito);
 
module.exports = router;