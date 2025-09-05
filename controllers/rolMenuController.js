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
    const [rows] = await db.query('CALL sp_rol_menu_get(?)', [codigo ]);

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
    const { rol,menu,view } = req.body;
 try {
    const [rows] = await db.query('CALL sp_rol_menu_insert(?,?,?)', [ rol,menu,view  ]);

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
    const { rol,menu,view } = req.body;
 try {
    const [rows] = await db.query('CALL sp_rol_menu_delete(?,?,?)', [ rol,menu,view  ]);

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
  const { id_usuario_e } = req.body; // "347"
  try {
    const [rows] = await db.query('CALL sp_menu_rol(?)', [id_usuario_e]);

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