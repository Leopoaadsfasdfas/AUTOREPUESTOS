const db = require('../db');

exports.obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('CALL ObtenerUsuarios()');
    res.json(rows[0]); // Porque CALL devuelve un array de arrays
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.crearUsuario = async (req, res) => {
  const { nombre, email, tipo, login } = req.body;
  try {
    const [rows] = await db.query('CALL CrearUsuario(?, ?, ?, ?)', [
      nombre,
      email,
      tipo,
      login
    ]);

    // Devuelve la misma información enviada, incluido el 'id' generado automáticamente
    const usuarioRegistrado = rows[0][0]; // El primer elemento del resultado del CALL
    res.json(usuarioRegistrado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;  // Correo del usuario, que ahora es un parámetro de la URL
  const { tipo_login, ubicacion, user_agent,fecha } = req.body;  // Estos valores deben venir del cuerpo de la solicitud

  try {
    // Llamar al procedimiento almacenado pasando los parámetros requeridos
    const [rows] = await db.query('CALL obtener_usuario(?, ?, ?, ?,?)', [
      id,                          // Correo del usuario (id)
      tipo_login,                  // Tipo de login (por ejemplo, 'email', 'facebook', etc.)
      ubicacion,                  // IP del cliente
      user_agent,                  // User Agent del cliente
      new Date(fecha)              // Fecha y hora de la consulta (actual)
    ]);

    const usuario = rows[0][0];  // Acceder al primer registro retornado

    if (!usuario) {
      // Devolver valores vacíos o predeterminados si el usuario no se encuentra
      return res.status(200).json({
        nombre: null,
        email: null,
        tipo: null,
        login: null,
      });
    }

    res.json(usuario);  // Retornar los datos del usuario
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Obtener usuario por ubicación
exports.buscarusuarioUbicacion = async (req, res) => {
  const { p_latitud_min,p_latitud_max,p_longitud_min,p_longitud_max,p_categoria } = req.body;

  try {
    const [rows] = await db.query('CALL BuscarUsuariosPorUbicacion(?,?,?,?,?)', [p_latitud_min,p_latitud_max,p_longitud_min,p_longitud_max,p_categoria]);
    res.json(rows[0]); // El resultado real está en rows[0]
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};