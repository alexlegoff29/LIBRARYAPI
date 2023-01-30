var admin = require("firebase-admin");

var serviceAccount = require("../../ressources/private-key/library-api-e626d-firebase-adminsdk-yl7a9-1269304cc1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

module.exports = firestore;