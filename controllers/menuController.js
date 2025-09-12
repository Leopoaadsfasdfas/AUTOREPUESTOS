// controllers/menusController.js
const db = require('../db');

/**
 * GET /api/menus
 * Opcional: ?id=123&activo=1
 * - id: si lo especificas, trae solo ese menú
 * - activo: 1|0 para filtrar (solo aplica si no hay id)
 */

   

exports.obtenerMenus = async (req, res) => {
    const { p_activo } = req.body;

 try {
    const [rows] = await db.query('CALL sp_menus_get(?)', [ p_activo  ]);

    // Verificamos si no se encontró la categoría
    if (rows[0][0]?.estado === 'ROL_MENÚ') { 
      return res.status(404).json({ mensaje: 'mensaje.' });
    }

    res.json(rows[0]); // Primer conjunto de resultados del CALL
  } catch (err) {
    res.status(500).json({ error: err.message });
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
      id,        // obligatorio, no se actualiza
      clave,
      titulo,
      url,
      icono,
      padre_id,
      orden,
      activo
    } = req.body;

    // Validar que se envió el id
    if (id === undefined || id === null || isNaN(Number(id))) {
      return res.status(400).json({ error: "Debes enviar un id válido para actualizar el menú" });
    }

    const p_id = Number(id);

    // Llamada al procedimiento almacenado simple
    const [rows] = await db.query(
      "CALL sp_menus_update_simple(?, ?, ?, ?, ?, ?, ?, ?)",
      [p_id, clave || null, titulo || null, url || null, icono || null, padre_id, orden, activo]
    );

    const out = rows?.[0]?.[0] || {};

    return res.json({
      ok: true,
      filas_afectadas: out.filas_afectadas ?? 0
    });
  } catch (err) {
    console.error("Error en actualizarMenu:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};




/**
 * DELETE /api/menus/:id
 * Query: ?soft=1   (default: 1 → soft delete; 0 → delete duro)
 */
exports.eliminarMenu = async (req, res) => {
  try {
    const {p_id
    } = req.body;

    const [rows] = await db.query(
      'CALL sp_menus_delete(?)',
      [p_id]
    );

    const out = rows[0]?.[0] || {};
    return res.status(201).json({ p_id});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
