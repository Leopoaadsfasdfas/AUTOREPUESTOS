const db = require('../db');

exports.buscarPorCategoria = async (req, res) => {
  const { texto, categoria } = req.body;
  try {
    const [rows] = await db.query('CALL BuscarSubcategoriasPorCategoria(?, ?)', [texto, categoria]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.buscarSubcategoria = async (req, res) => {
  const { texto } = req.body;

  try {
    const [rows] = await db.query('CALL buscar_subcategoria_por_nombre(?)', [texto]);
    res.json(rows[0]); // El resultado real está en rows[0]
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.crearSubcategoria = async (req, res) => {
  const { nombre, url_imagen } = req.body;

  try {
    const [rows] = await db.query('CALL CrearSubcategoria(?, ?)', [
      nombre,
      url_imagen
      
    ]);

    const resultado = rows[0][0];

    if (resultado?.estado === 'YA_EXISTE') {
      return res.status(409).json({ mensaje: 'La subcategoría ya existe en esa categoría.' });
    }

    if (resultado?.estado === 'CATEGORIA_NO_ENCONTRADA') {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
