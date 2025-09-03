const express = require('express');
const router = express.Router();
const regisususubcatController = require('../controllers/registrar_usuario_cat_subcroutesController');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Importa tu middleware


// Crear usuariosubcat
router.post('/ususubcat/crear',verificarToken, regisususubcatController.crearususubcat);
// POST para eliminar
router.post('/ususubcat/eliminar',verificarToken, regisususubcatController.eliminarUsuSubCat);
module.exports = router;