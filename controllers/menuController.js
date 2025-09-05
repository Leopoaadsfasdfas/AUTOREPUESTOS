// controllers/menusController.js
const db = require('../db');

/**
 * GET /api/menus
 * Opcional: ?id=123&activo=1
 * - id: si lo especificas, trae solo ese menú
 * - activo: 1|0 para filtrar (solo aplica si no hay id)
 */
exports.obtenerMenus = async (req, res) => {
  try {
    const p_id = req.query.id ? Number(req.query.id) : null;
    const p_activo = (req.query.activo === undefined) ? null : Number(req.query.activo);

    const [rows] = await db.query('CALL sp_menus_get(?, ?)', [p_id, p_activo]);
    // sp_menus_get retorna un SELECT → queda en rows[0]
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/menus
 * body: { clave, titulo, url, icono, padre_id, orden, activo }
 */
exports.crearMenu = async (req, res) => {
  try {
    const {
      clave,
      titulo,
      url = null,
      icono = null,
      padre_id = null,
      orden = 1,
      activo = 1
    } = req.body;

    if (!clave || !titulo) {
      return res.status(400).json({ error: 'clave y titulo son obligatorios' });
    }

    const [rows] = await db.query(
      'CALL sp_menus_insert(?, ?, ?, ?, ?, ?, ?)',
      [clave, titulo, url, icono, padre_id, orden, activo]
    );

    // sp_menus_insert → SELECT LAST_INSERT_ID() AS id_creado;
    const out = rows[0]?.[0] || {};
    return res.status(201).json({ id: out.id_creado, clave, titulo, url, icono, padre_id, orden, activo });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/menus/:id
 * body: campos a actualizar (los que vengan, si no vienen se conservan)
 */
exports.actualizarMenu = async (req, res) => {
  try {
    const {
      id = null,            // solo para buscar; NO se actualiza
      clave_buscar = null,  // solo para buscar si no hay id
      clave = null,         // NUEVA clave (opcional)
      titulo = null,
      url = null,
      icono = null,
      padre_id = null,      // manda null para limpiar
      orden = null,
      activo = null
    } = req.body;

    if ((id == null || Number.isNaN(Number(id))) &&
        (clave_buscar == null || String(clave_buscar).trim() === '')) {
      return res.status(400).json({ error: 'Debes enviar id o clave_buscar para localizar el menú' });
    }

    const p_id = id == null ? null : Number(id);

    const [rows] = await db.query(
      'CALL sp_menus_update(?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [p_id, clave_buscar, clave, titulo, url, icono, padre_id, orden, activo]
    );

    const out = rows?.[0]?.[0] || {};
    return res.json({
      ok: true,
      id_actualizado: out.id_actualizado ?? null,
      filas_afectadas: out.filas_afectadas ?? 0
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



/**
 * DELETE /api/menus/:id
 * Query: ?soft=1   (default: 1 → soft delete; 0 → delete duro)
 */
exports.eliminarMenu = async (req, res) => {
  try {
    const p_id = Number(req.params.id);
    if (!p_id) return res.status(400).json({ error: 'id inválido' });

    const p_soft = req.query.soft === '0' ? 0 : 1;

    const [rows] = await db.query('CALL sp_menus_delete(?, ?)', [p_id, p_soft]);
    // sp_menus_delete → SELECT ROW_COUNT() AS filas_afectadas;
    const out = rows[0]?.[0] || {};
    return res.json({ ok: true, filas_afectadas: out.filas_afectadas ?? 0, soft: Boolean(p_soft) });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/menus/:id/restore
 */
exports.restaurarMenu = async (req, res) => {
  try {
    const p_id = Number(req.params.id);
    if (!p_id) return res.status(400).json({ error: 'id inválido' });

    const [rows] = await db.query('CALL sp_menus_restore(?)', [p_id]);
    // sp_menus_restore → SELECT ROW_COUNT() AS filas_afectadas;
    const out = rows[0]?.[0] || {};
    return res.json({ ok: true, filas_afectadas: out.filas_afectadas ?? 0 });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
