const db = require('../db');

exports.obtenerSubcategoriasPorCategoria = async (req, res) => {
  const { categoria } = req.body; // Asegúrate de enviar el nombre en el body

  try {
    const [rows] = await db.query('CALL ObtenerSubcategoriasPorNombreCategoria(?)', [categoria]);

    // Verificamos si no se encontró la categoría
    if (rows[0][0]?.estado === 'CATEGORIA_NO_ENCONTRADA') {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    res.json(rows[0]); // Primer conjunto de resultados del CALL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.crearRelacionCategoriaSubcategoria = async (req, res) => {
  const { categoria, subcategoria, url_imagen,id_usuario } = req.body;
//
  try {
    const [rows] = await db.query(
      'CALL CrearRelacionCategoriaSubcategoria(?, ?, ?,?)',
      [categoria, subcategoria, url_imagen,id_usuario]
    );

    const resultado = rows[0][0];

    if (resultado.estado === 'CATEGORIA_NO_ENCONTRADA') {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    // Ya sea que se haya creado o ya existía, devolvemos info con estado
    res.status(200).json({
      mensaje: resultado.estado === 'YA_RELACIONADO'
        ? 'La relación ya existía.'
        : 'Relación creada exitosamente.',
      ...resultado
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

