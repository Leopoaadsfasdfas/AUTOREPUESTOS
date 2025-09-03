// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('../autorepuesto-2d74b-firebase-adminsdk-fbsvc-037975d0e5.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;