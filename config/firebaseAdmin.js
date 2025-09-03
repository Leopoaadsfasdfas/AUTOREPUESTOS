// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('../yosehacerlo-5ce9e-firebase-adminsdk-fbsvc-e43b347fc0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;