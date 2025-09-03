require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// ► Configuración Cloudinary desde .env
cloudinary.config({
  cloud_name : process.env.CLOUD_NAME,
  api_key    : process.env.CLOUD_API_KEY,
  api_secret : process.env.CLOUD_API_SECRET,
});

/* ─────────────────────────────
   Subir imagen NUEVA
───────────────────────────── */
exports.subirImagenACoudinary = (imagenBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id    : `yo_se_hacerlo_${Date.now()}`, // prefijo + timestamp
      },
      (err, result) => {
        if (err)   return reject(err);
        resolve(result.secure_url);                  // URL segura
      },
    ).end(imagenBuffer);
  });
};

/* ─────────────────────────────
   Reemplazar / actualizar imagen
   (mantiene el mismo public_id)
───────────────────────────── */
exports.actualizarImagenCloudinary = (imagenBuffer, public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id,          // mismo ID a sobrescribir
        overwrite : true,
        invalidate: true,   // purga la caché CDN para que el URL muestre la nueva imagen
      },
      (err, result) => {
        if (err)   return reject(err);
        resolve(result.secure_url);                  // URL (idéntica)
      },
    ).end(imagenBuffer);
  });
};
// Eliminar imagen en Cloudinary por public_id
exports.eliminarImagenCloudinary = (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, { invalidate: true }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};