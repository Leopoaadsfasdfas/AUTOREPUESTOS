const db = require('../db');

exports.permisos = async (req, res) => {
  const { id_usuario_e} = req.body;
  try {
    const [rows] = await db.query('CALL sp_menu_usuario(?)', [
      id_usuario_e
    ]);

    // Devuelve la misma información enviada, incluido el 'id' generado automáticamente
    const permisos = rows[0][0]; // El primer elemento del resultado del CALL
    res.json(permisos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
