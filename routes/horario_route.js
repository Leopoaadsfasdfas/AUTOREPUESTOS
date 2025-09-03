const express = require('express');
const router = express.Router();
const horario = require('../controllers/horarioController');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware

// Rutas
// Ruta para buscar categorías por texto con  LIKE
router.post('/',verificarToken, horario.crearHorario);
router.post('/consulta',verificarToken, horario.buscarHorario);
router.post('/modificar',verificarToken, horario.actualizarHorario);
router.post('/eliminar',verificarToken, horario.eliminacionHorario);

// Crear categoría
//router.get('/pm', horario.horario_pm);

module.exports = router;