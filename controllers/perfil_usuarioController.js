const db = require('../db');

exports.obtenerPerfilPorCorreo = async (req, res) => {
  const { correo } = req.body;

  try {
    const [rows] = await db.query(
      'CALL ObtenerPerfilCompletoPorCorreo(?)',
      [correo]
    );

    const perfil = rows[0][0]; // La primera fila del primer conjunto de resultados

    if (!perfil) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado.' });
    }

    res.json({
      mensaje: 'Perfil encontrado correctamente.',
      perfil
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearPerfil = async (req, res) => {
  const { p_correo_usuario, p_campo_yo_se_hacer, p_nombre_empresa,
    p_categoria, p_subcategoria, p_telefono,
    p_direccion, p_ubicacion, p_url_imagen_ubicacion,p_url_imagen_perfil} = req.body;

  try {
    // Ejecuta el procedimiento almacenado para crear el perfil
    const [rows] = await db.query('CALL Crear_PerfilFinal(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      p_correo_usuario,
      p_categoria,
      p_subcategoria,
      p_ubicacion,
      p_url_imagen_ubicacion,
      p_direccion,
      p_telefono,
      p_nombre_empresa,
      p_campo_yo_se_hacer,
      p_url_imagen_perfil
    ]);

    // Si el perfil se crea correctamente, devuelve la información registrada
    const perfilCreado = rows[0][0]; // El primer elemento del resultado del CALL
    res.json(perfilCreado);
  } catch (err) {
    // Si hay un error, envía un mensaje de error
    res.status(500).json({ error: err.message });
  }
};
exports.actualizarPerfil = async (req, res) => {
  const {
    p_correo,
    p_ubicacion,
    p_url_imagen_ubicacion,
    p_descripcion_direccion,
    p_imagen_perfil, // Asegúrate de que esté en formato binario/base64 si es enviado desde el frontend
    p_telefono,
    p_whatsapp,
    p_facebook_url,
    p_instagram_url,
    p_nombre_negocio,
    p_nombre_usuario,
    p_campo_yo_se_hacer,
    p_categoria
  } = req.body;

  try {
    // Ejecutar el procedimiento almacenado para actualizar el perfil
    const [rows] = await db.query('CALL ActualizarPerfilUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)', [
      p_correo,
      p_ubicacion,
      p_url_imagen_ubicacion,
      p_descripcion_direccion,
      p_imagen_perfil,
      p_telefono,
      p_whatsapp,
      p_facebook_url,
      p_instagram_url,
      p_nombre_negocio,
      p_nombre_usuario,
      p_campo_yo_se_hacer,
      p_categoria
    ]);

    const perfilActualizado = rows[0][0]; // Primer resultado
    res.json(perfilActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
