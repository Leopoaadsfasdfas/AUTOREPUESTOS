const db = require('../db');
exports.crearHorario= async (req, res) => {
  const { id_usuario, dia_abre,dia_cierre,hora_inicio,hora_fin } = req.body;

  try {
    const [rows] = await db.query('CALL InsertarHorarioUsuario(?, ?, ?, ?, ?)', [id_usuario, dia_abre,dia_cierre,hora_inicio,hora_fin]);

    // Devuelve la categoría recién creada
    const categoriaCreada = rows[0][0]; // Primer elemento del primer conjunto de resultados
    res.json(categoriaCreada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.buscarHorario = async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await db.query('CALL ObtenerHorarioPorEmail(?)', [id]);
    res.json(rows[0]); // El resultado real está en rows[0]
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.actualizarHorario= async (req, res) => {
  const { id_usuario,id_horario, dia_abre,dia_cierre,hora_inicio,hora_fin } = req.body;

  try {
    const [rows] = await db.query('CALL ActualizarHorarioUsuario(?, ?, ?, ?, ?, ?)', [id_usuario,id_horario, dia_abre,dia_cierre,hora_inicio,hora_fin]);

    // Devuelve la categoría recién creada
    const categoriaCreada = rows[0][0]; // Primer elemento del primer conjunto de resultados
    res.json(categoriaCreada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.eliminacionHorario= async (req, res) => {
  const {id_horario} = req.body;

  try {
    const [rows] = await db.query('CALL eliminar_horario_usuario(?)', [id_horario]);

    // Devuelve la categoría recién creada
    const categoriaCreada = rows[0][0]; // Primer elemento del primer conjunto de resultados
    res.json(categoriaCreada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};