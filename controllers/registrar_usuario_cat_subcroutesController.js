const db = require('../db');

exports.crearususubcat = async (req, res) => {
  const { p_id_usuario, p_categoria,p_subcategoria,p_urlimagen,p_descripcion } = req.body;

  try {
    const [rows] = await db.query('CALL RegistrarUsuarioConCategoria(?, ?, ?, ?, ?)', 
      [p_id_usuario, p_categoria,p_subcategoria,p_urlimagen,p_descripcion]);

    // Devuelve la categoría recién creada
    const categoriaCreada = rows[0][0]; // Primer elemento del primer conjunto de resultados
    res.json(categoriaCreada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.eliminarUsuSubCat = async (req, res) => {
  const { p_correo_usuario, p_id_usu_serv, p_id_cat_sub } = req.body;

  try {
    // Llamamos al procedimiento almacenado que elimina
    const [rows] = await db.query('CALL eliminar_categoria_usuario(?, ?, ?)', 
      [p_correo_usuario, p_id_usu_serv, p_id_cat_sub]);

    // Si deseas devolver la URL de imagen eliminada
    const urlEliminada = rows[0]?.[0]?.url_eliminada;


    res.json({ 
      mensaje: 'Eliminación exitosa',
      urlEliminada
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
