const express = require('express');
const multer = require('multer');
const {
  subirImagenACoudinary,
  actualizarImagenCloudinary,
  eliminarImagenCloudinary,
} = require('../controllers/imagenCloudController');
const verificarToken = require('../middlewares/verificarToken'); // ✅ Middleware JWT

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/* ───── POST /api/imagen  → subir nueva ───── */
router.post('/', verificarToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No se envió imagen' });

    const url = await subirImagenACoudinary(req.file.buffer);
    res.json({ msg: 'Imagen subida', url_imagen: url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* ───── PUT /api/imagen  → reemplazar existente ───── */
router.put('/', verificarToken, upload.single('image'), async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: 'public_id requerido' });
    if (!req.file) return res.status(400).json({ msg: 'No se envió imagen' });

    const url = await actualizarImagenCloudinary(req.file.buffer, public_id);
    res.json({ msg: 'Imagen actualizada', url_imagen: url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* ───── DELETE /api/imagen  → eliminar imagen ───── */
router.delete('/', verificarToken, async (req, res) => {
  try {
    const public_id = req.query.public_id;
    if (!public_id) return res.status(400).json({ msg: 'public_id requerido' });

    const result = await eliminarImagenCloudinary(public_id);
    res.json({ msg: 'Imagen eliminada', resultado: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
