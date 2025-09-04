// controllers/rolMenuController.js
const db = require('../db');

/**
 * GET /api/roles/:rolId/permisos
 * Opcional: ?onlyViewable=1
 */
exports.obtenerPermisosRol = async (req, res) => {
  try {
    const rolId = Number(req.params.rolId);
    if (!rolId) return res.status(400).json({ error: 'rolId inválido' });

    const onlyViewable = req.query.onlyViewable === '1' ? 1 : null;

    const [rows] = await db.query('CALL sp_rol_menu_get(?, ?)', [rolId, onlyViewable]);
    // SELECT ... → rows[0]
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/roles/:rolId/permisos/by-clave
 * body: { clave, can_view }
 */
exports.setPermisoByClave = async (req, res) => {
  try {
    const rolId = Number(req.params.rolId);
    if (!rolId) return res.status(400).json({ error: 'rolId inválido' });

    const { clave, can_view = 1 } = req.body;
    if (!clave) return res.status(400).json({ error: 'clave es obligatoria' });

    const [rows] = await db.query('CALL sp_rol_menu_set_by_clave(?, ?, ?)', [rolId, clave, Number(can_view)]);
    const out = rows[0]?.[0] || {};
    return res.json({ ok: true, filas_afectadas: out.filas_afectadas ?? 0, clave, can_view: Number(can_view) });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/roles/:rolId/permisos
 * body: { menu_id, can_view }
 */
exports.setPermiso = async (req, res) => {
  try {
    const rolId = Number(req.params.rolId);
    if (!rolId) return res.status(400).json({ error: 'rolId inválido' });

    const { menu_id, can_view = 1 } = req.body;
    if (!menu_id) return res.status(400).json({ error: 'menu_id es obligatorio' });

    const [rows] = await db.query('CALL sp_rol_menu_set(?, ?, ?)', [rolId, Number(menu_id), Number(can_view)]);
    const out = rows[0]?.[0] || {};
    return res.json({ ok: true, filas_afectadas: out.filas_afectadas ?? 0, menu_id: Number(menu_id), can_view: Number(can_view) });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/roles/:rolId/permisos/by-clave/:clave
 */
exports.eliminarPermisoByClave = async (req, res) => {
  try {
    const rolId = Number(req.params.rolId);
    const { clave } = req.params;
    if (!rolId) return res.status(400).json({ error: 'rolId inválido' });
    if (!clave) return res.status(400).json({ error: 'clave es obligatoria' });

    const [rows] = await db.query('CALL sp_rol_menu_delete_by_clave(?, ?)', [rolId, clave]);
    const out = rows[0]?.[0] || {};
    return res.json({ ok: true, filas_afectadas: out.filas_afectadas ?? 0, clave });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/roles/:rolId/permisos/:menuId
 */
exports.eliminarPermiso = async (req, res) => {
  try {
    const rolId = Number(req.params.rolId);
    const menuId = Number(req.params.menuId);
    if (!rolId) return res.status(400).json({ error: 'rolId inválido' });
    if (!menuId) return res.status(400).json({ error: 'menuId inválido' });

    const [rows] = await db.query('CALL sp_rol_menu_delete(?, ?)', [rolId, menuId]);
    const out = rows[0]?.[0] || {};
    return res.json({ ok: true, filas_afectadas: out.filas_afectadas ?? 0, menuId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * (Opcional) GET /api/permisos/usuario/:idUsuario
 * Usa el SP que devuelve el árbol permitido para un usuario
 */
exports.menuPermitidoUsuario = async (req, res) => {
  try {
    const idUsuario = Number(req.params.idUsuario);
    if (!idUsuario) return res.status(400).json({ error: 'idUsuario inválido' });

    const [rows] = await db.query('CALL sp_menu_usuario_por_id(?)', [idUsuario]);
    const data = rows[0] || [];
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
