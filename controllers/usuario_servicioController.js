const db = require('../db');

exports.obtenerServiciosUsuariosPorCorreo = async (req, res) => {
  const { email } = req.body; // Esperamos recibir el nombre en el cuerpo de la petición

  try {
    const [rows] = await db.query('CALL ObtenerServiciosUsuariosPorCorreo(?)', [email]);
    res.json(rows[0]); // Devuelve la lista de servicios filtrados por nombre
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crearUsuarioServicioConCategoria = async (req, res) => {
  const {
    correo,
    nombre_categoria,
    nombre_subcategoria,
    url_imagen1,
    url_imagen2,
    descripcion
  } = req.body;

  try {
    const [rows] = await db.query(
      'CALL CrearUsuarioServicioConCategoria(?, ?, ?, ?, ?, ?)',
      [correo, nombre_categoria, nombre_subcategoria, url_imagen1, url_imagen2, descripcion]
    );

    res.json({ message: 'Usuario servicio creado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.obtener_info_usuario_servicio_por_correo = async (req, res) => {
  const { email } = req.body; // Esperamos recibir el nombre en el cuerpo de la petición

  try {
    const [rows] = await db.query('CALL obtener_info_usuario_servicio_por_correo(?)', [email]);
    res.json(rows[0]); // Devuelve la lista de servicios filtrados por nombre
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizar_servicio = async (req, res) => {
  const { p_id_usu_serv_edit ,p_titulo ,p_descripcion,p_url_imagen  } = req.body; // Esperamos recibir el nombre en el cuerpo de la petición

  try {
    const [rows] = await db.query('CALL actualizar_servicio(?,?,?,?)', [p_id_usu_serv_edit,p_titulo,p_descripcion,p_url_imagen]);
    res.json(rows[0]); // Devuelve la lista de servicios filtrados por nombre
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};