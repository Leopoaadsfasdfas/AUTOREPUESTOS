// controllers/rolMenuController.js
const db = require('../db');


//Consulta Rol
exports.obtenerRol = async (req, res) => {
    const { codigo } = req.body;
 try {
    const [rows] = await db.query('CALL sp_roles_get(?)', [codigo]);

    // Verificamos si no se encontró la categoría
    if (rows[0][0]?.estado === 'ROL_NO_ENCONTRADO') {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
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
  try {
    const { rolId, onlyViewable } = req.body;

    if (!rolId || isNaN(Number(rolId))) {
      return res.status(400).json({ error: 'rolId inválido' });
    }

    const p_rolId = Number(rolId);
    const p_onlyViewable =
      onlyViewable === undefined || onlyViewable === null
        ? null
        : Number(onlyViewable) === 1
        ? 1
        : null;

    const [rows] = await db.query('CALL sp_rol_menu_get(?, ?)', [p_rolId, p_onlyViewable]);
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/**
 * POST /api/rol-menu/by-clave
 * body: { rolId, clave, can_view }
 */
exports.setPermisoByClave = async (req, res) => {
  try {
    const { rolId, clave, can_view = 1 } = req.body;

    if (!rolId || isNaN(Number(rolId))) {
      return res.status(400).json({ error: 'rolId inválido' });
    }
    if (!clave) {
      return res.status(400).json({ error: 'clave es obligatoria' });
    }

    const [rows] = await db.query(
      'CALL sp_rol_menu_set_by_clave(?, ?, ?)',
      [Number(rolId), clave, Number(can_view)]
    );

    const out = rows[0]?.[0] || {};
    return res.json({
      ok: true,
      filas_afectadas: out.filas_afectadas ?? 0,
      clave,
      can_view: Number(can_view)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/rol-menu
 * body: { rolId, menu_id, can_view }
 */
exports.setPermiso = async (req, res) => {
  try {
    const { rolId, menu_id, can_view = 1 } = req.body;

    if (!rolId || isNaN(Number(rolId))) {
      return res.status(400).json({ error: 'rolId inválido' });
    }
    if (!menu_id || isNaN(Number(menu_id))) {
      return res.status(400).json({ error: 'menu_id es obligatorio' });
    }

    const [rows] = await db.query(
      'CALL sp_rol_menu_set(?, ?, ?)',
      [Number(rolId), Number(menu_id), Number(can_view)]
    );

    const out = rows[0]?.[0] || {};
    return res.json({
      ok: true,
      filas_afectadas: out.filas_afectadas ?? 0,
      menu_id: Number(menu_id),
      can_view: Number(can_view)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/rol-menu/by-clave
 * body: { rolId, clave }
 */
exports.eliminarPermisoByClave = async (req, res) => {
  try {
    const { rolId, clave } = req.body;

    if (!rolId || isNaN(Number(rolId))) {
      return res.status(400).json({ error: 'rolId inválido' });
    }
    if (!clave) {
      return res.status(400).json({ error: 'clave es obligatoria' });
    }

    const [rows] = await db.query(
      'CALL sp_rol_menu_delete_by_clave(?, ?)',
      [Number(rolId), clave]
    );

    const out = rows[0]?.[0] || {};
    return res.json({
      ok: true,
      filas_afectadas: out.filas_afectadas ?? 0,
      clave
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/rol-menu
 * body: { rolId, menu_id }
 */
exports.eliminarPermiso = async (req, res) => {
  try {
    const { rolId, menu_id } = req.body;

    if (!rolId || isNaN(Number(rolId))) {
      return res.status(400).json({ error: 'rolId inválido' });
    }
    if (!menu_id || isNaN(Number(menu_id))) {
      return res.status(400).json({ error: 'menu_id inválido' });
    }

    const [rows] = await db.query(
      'CALL sp_rol_menu_delete(?, ?)',
      [Number(rolId), Number(menu_id)]
    );

    const out = rows[0]?.[0] || {};
    return res.json({
      ok: true,
      filas_afectadas: out.filas_afectadas ?? 0,
      menu_id: Number(menu_id)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/rol-menu/usuario
 * Query: ?idUsuario=123
 */
exports.menuPermitidoUsuario = async (req, res) => {
  try {
    const idUsuario = Number(req.query.idUsuario);
    if (!idUsuario) return res.status(400).json({ error: 'idUsuario inválido' });

    const [rows] = await db.query('CALL sp_menu_usuario_por_id(?)', [idUsuario]);
    return res.json(rows[0] || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
