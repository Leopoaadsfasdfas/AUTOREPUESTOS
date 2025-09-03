const db = require('../db');

exports.insertar_log_busqueda = async (req, res) => {
  const { p_accion,p_fecha_hora,p_lugar_busqueda,p_usuario_busco,p_usuario_de_busqueda,p_ip_origen,p_user_agent,p_resultado,p_observacion } = req.body; // Asegúrate de enviar el nombre en el body

  try {
    const [rows] = await db.query('CALL insertar_log_busqueda(?,?,?,?,?,?,?,?,?)', [p_accion,p_fecha_hora,p_lugar_busqueda,p_usuario_busco,p_usuario_de_busqueda,p_ip_origen,p_user_agent,p_resultado,p_observacion]);
    res.json(rows[0]); // Primer conjunto de resultados del CALL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.insertar_favorito = async (req, res) => {
  const {p_usuario_id, p_correo_usuario, p_item_id,p_tipo_item,p_fecha_agregado,p_comentario,p_lugar_favorito } = req.body;
//
  try {
    const [rows] = await db.query(
      'CALL insertar_favorito(?, ?, ?,?,?, ?,?)',
      [p_usuario_id, p_correo_usuario, p_item_id,p_tipo_item,p_fecha_agregado,p_comentario,p_lugar_favorito]
    );

   res.json(rows[0]); // Primer conjunto de resultados del CALL

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

