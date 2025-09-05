const db = require('../db');

exports.permisos = async (req, res) => {
  const { id_usuario_e } = req.body; // "347"
  try {
    const [rows] = await db.query('CALL sp_menu_usuario(?)', [id_usuario_e]);

    // rows[0] es el ARRAY de filas devuelto por el SELECT del SP
    const permisos = rows[0];

    // si quieres, valida que realmente sea un array
    if (Array.isArray(permisos)) {
      return res.json(permisos);
    } else {
      // fallback por si el driver te cambia el shape
      return res.json(rows);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.usuarioRolinsert = async (req, res) => {
  const { usuario,rol } = req.body; // "347"
  try {
    const [rows] = await db.query('CALL sp_usuario_rol_insert(?,?)', [usuario,rol]);

    // rows[0] es el ARRAY de filas devuelto por el SELECT del SP
    const permisos = rows[0];

    // si quieres, valida que realmente sea un array
    if (Array.isArray(permisos)) {
      return res.json(permisos);
    } else {
      // fallback por si el driver te cambia el shape
      return res.json(rows);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateusuario = async (req, res) => {
  const { usuario,rol } = req.body; // "347"
  try {
    const [rows] = await db.query('CALL sp_usuario_rol_update_by_usuario(?,?)', [usuario,rol]);

    // rows[0] es el ARRAY de filas devuelto por el SELECT del SP
    const permisos = rows[0];

    // si quieres, valida que realmente sea un array
    if (Array.isArray(permisos)) {
      return res.json(permisos);
    } else {
      // fallback por si el driver te cambia el shape
      return res.json(rows);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleterolusuario = async (req, res) => {
  const { usuario,rol } = req.body; // "347"
  try {
    const [rows] = await db.query('CALL sp_usuario_rol_delete_by_usuario(?,?)', [usuario,rol]);

    // rows[0] es el ARRAY de filas devuelto por el SELECT del SP
    const permisos = rows[0];

    // si quieres, valida que realmente sea un array
    if (Array.isArray(permisos)) {
      return res.json(permisos);
    } else {
      // fallback por si el driver te cambia el shape
      return res.json(rows);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};