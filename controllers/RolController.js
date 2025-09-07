// controllers/menusController.js
const db = require('../db');

/**
 * GET /api/menus
 * Opcional: ?id=123&activo=1
 * - id: si lo especificas, trae solo ese menú
 * - activo: 1|0 para filtrar (solo aplica si no hay id)
 */

exports.crearRoles = async (req, res) => {
  try {
    const {
    p_id,
    nombre
    } = req.body;

    if (!clave || !titulo) {
      return res.status(400).json({ error: 'clave y titulo son obligatorios' });
    }

    const [rows] = await db.query(
      'CALL sp_roles_insert(?, ?)',
      [p_id,nombre]
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
exports.actualizarRoles = async (req, res) => {
  try {
    const {
      p_id,        // obligatorio, no se actualiza
     p_nombre
    } = req.body;

   
    // Llamada al procedimiento almacenado simple
    const [rows] = await db.query(
      "CALL sp_roles_update(?,?)",
      [p_id, clave ,p_nombre]
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
exports.eliminarRoles = async (req, res) => {
  try {
    const p_id = Number(req.body.id);

    if (!p_id) {
      return res.status(400).json({ error: 'id inválido' });
    }

    const [rows] = await db.query('CALL sp_roles_delete(?)', [p_id]);
    const out = rows?.[0]?.[0] || {};

    res.json({
      ok: true,
      filas_afectadas: out.filas_afectadas ?? 0
    });
  } catch (err) {
    const msg = err?.sqlMessage || err?.message || 'Error interno';

    if (msg.includes('no es posible eliminar posee submenus')) {
      return res.status(409).json({ error: 'no es posible eliminar posee submenus' });
    }
    if (msg.includes('Menu no existe')) {
      return res.status(404).json({ error: 'Menu no existe' });
    }

    res.status(500).json({ error: msg });
  }
};

