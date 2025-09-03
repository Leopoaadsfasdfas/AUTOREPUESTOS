const db = require('../db');

exports.buscarCategorias = async (req, res) => {
  const { texto } = req.body;

  try {
    const [rows] = await db.query('CALL buscar_categoria_por_nombre(?)', [texto]);
    res.json(rows[0]); // El resultado real está en rows[0]
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.crearCategoria = async (req, res) => {
  const { nombre, url_imagen } = req.body;

  try {
    const [rows] = await db.query('CALL CrearCategoria(?, ?)', [nombre, url_imagen]);

    // Devuelve la categoría recién creada
    const categoriaCreada = rows[0][0]; // Primer elemento del primer conjunto de resultados
    res.json(categoriaCreada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
