const admin = require('../config/firebaseAdmin');

const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.usuario = decodedToken; // Guardamos la info del usuario autenticado
    next(); // Continuamos con la ruta
  } catch (error) {
    console.error('Error al verificar token Firebase:', error);
    return res.status(403).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verificarToken;