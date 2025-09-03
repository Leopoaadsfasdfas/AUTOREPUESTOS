const express = require('express');
require('dotenv').config();
const cors = require('cors');  // Importa el módulo cors
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const categoriasRoutes = require('./routes/categoria');
const subcategoriaRoutes = require('./routes/subcategoria');
const categoria_subcategoria = require('./routes/categoria_subcategoria');
const usuario_servicio = require('./routes/usuario_servicio');
const perfil_usuario = require('./routes/perfil_usuario');
const crearussubcat = require('./routes/registrar_usuario_cat_subcroutes');
const subirimagen = require('./routes/imagenCloud'); // Aquí importas la ruta de imagen
const horario = require('./routes/horario_route'); // Aquí importas la ruta de imagen
const historial_favorito = require('./routes/favorito_historial_routes'); // Aquí importas la ruta de imagen

const port = process.env.PORT || 3000; 
// Configurar CORS (si lo necesitas)
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Usar los routers para cada ruta
app.use('/api/usuarios', usuariosRoutes);
app.use('/api', categoriasRoutes); // Ahora tu ruta final será /api/categorias
app.use('/api/subcategoria', subcategoriaRoutes);
app.use('/api/categoria_subcategoria', categoria_subcategoria);
app.use('/api/usuario_servicio', usuario_servicio);
app.use('/api/perfil_usuario', perfil_usuario);
app.use('/api/', crearussubcat);
// Usar las rutas para manejar las imágenes
app.use('/api/imagen', subirimagen);// POST y PUT
app.use('/api/horario', horario);
app.use('/api/hi_fav', historial_favorito);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});