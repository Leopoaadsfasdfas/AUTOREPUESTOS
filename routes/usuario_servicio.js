const express = require('express');
const router = express.Router();
const usuario_servicioController = require('../controllers/usuario_servicioController');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware

// Rutas
router.post('/',verificarToken, usuario_servicioController.obtenerServiciosUsuariosPorCorreo);         
router.post('/crear',verificarToken, usuario_servicioController.crearUsuarioServicioConCategoria);
router.post('/consultar',verificarToken, usuario_servicioController.obtener_info_usuario_servicio_por_correo);
router.post('/actualizar',verificarToken, usuario_servicioController.actualizar_servicio);

module.exports = router;