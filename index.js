const express = require('express');
require('dotenv').config();
const cors = require('cors');  // Importa el módulo cors
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const usuariospermisosController = require('./routes/usuariosPermisos'); // Aquí importas la ruta de imagen
const menus = require('./routes/menus'); // Aquí importas la ruta de imagen
const rolMenu = require('./routes/rolMenu'); // Aquí importas la ruta de imagen

const port = process.env.PORT || 3000; 
// Configurar CORS (si lo necesitas)
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Usar los routers para cada ruta
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/permisos', usuariospermisosController);
// Rutas
app.use('/api/menus', menus);
app.use('/api/rol_menu', rolMenu); // expone /api/roles/... y /api/permisos/usuario/...

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});