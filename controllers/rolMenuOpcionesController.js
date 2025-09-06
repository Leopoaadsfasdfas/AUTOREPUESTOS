// controllers/rolMenuController.js
const db = require('../db');


//Consulta Rol
exports.obtenerRol = async (req, res) => {
  const { codigo } = req.body;
  try {
    const [rows] = await db.query('CALL sp_roles_get(?)', [codigo]);

    // Verificamos si no se encontró la categoría
    if (rows[0][0]?.estado === 'ROL_NO_ENCONTRADO') {
      return res.status(404).json({ mensaje: 'Rol No encontrado.' });
    }

    res.json(rows[0]); // Primer conjunto de resultados del CALL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};
/**
 * GET /api/rol-menu
 * Query: ?rolId=123&onlyViewable=1
 * - rolId: obligatorio
 * - onlyViewable: 1 para filtrar solo visibles (opcional)
 */
exports.obtenerPermisosRol = async (req, res) => {
  const { codigo } = req.body;
  try {
    const [rows] = await db.query('CALL sp_rol_menu_get(?)', [codigo]);

    // Verificamos si no se encontró la categoría
    if (rows[0][0]?.estado === 'ROL_MENÚ') {
      return res.status(404).json({ mensaje: 'Rol MENÚ No encontrado.' });
    }

    res.json(rows[0]); // Primer conjunto de resultados del CALL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

exports.registrarRolMenu = async (req, res) => {
  const {
    p_rol_id,
    p_menu_opcion_id,
    p_updated_at,
    p_created_at,
    p_can_update,
    p_can_read,
    p_can_delete,
    p_can_create } = req.body;
  try {
    const [rows] = await db.query('CALL sp_rol_menu_opciones_insert(?,?,?,?,?,?,?,?)',
      [p_rol_id,
        p_menu_opcion_id,
        p_updated_at,
        p_created_at,
        p_can_update,
        p_can_read,
        p_can_delete,
        p_can_create]);

    // Verificamos si no se encontró la categoría
    if (rows[0][0]?.estado === 'ROL_MENÚ') {
      return res.status(404).json({ mensaje: 'mensaje.' });
    }

    res.json(rows[0]); // Primer conjunto de resultados del CALL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};


exports.eliminarRolMenu = async (req, res) => {
  const { p_rol_id,p_menu_opcion_id} = req.body;
  try {
    const [rows] = await db.query('CALL sp_rol_menu_opciones_delete(?,?)', [id_rol,id_opcion]);

    // Verificamos si no se encontró la categoría
    if (rows[0][0]?.estado === 'ROL_MENÚ') {
      return res.status(404).json({ mensaje: 'mensaje.' });
    }

    res.json(rows[0]); // Primer conjunto de resultados del CALL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

exports.consultarRolmenu = async (req, res) => {
  const { id_usuario_e } = req.body;
  try {
    const [rows] = await db.query('CALL sp_menu_opciones_rol(?)', [id_usuario_e]);

    // Verificamos si no se encontró la categoría
    if (rows[0][0]?.estado === 'ROL_MENÚ') {
      return res.status(404).json({ mensaje: 'mensaje.' });
    }

    res.json(rows[0]); // Primer conjunto de resultados del CALL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};